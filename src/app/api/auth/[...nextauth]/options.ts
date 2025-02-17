import { NextAuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import connectDB from '@/lib/db';
import UserModel from '@/models/User';
import bcrypt from 'bcryptjs'

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "your-email@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        
        await connectDB();
        try {
          const user = await UserModel.findOne({email: credentials.email});
          if(!user) {
            throw new Error("email don't exist register first");
          }
          const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
          return isPasswordCorrect ? user : null;
        } catch {
          return null;
        }
      }
    })
  ],

  callbacks: {
    async signIn({user, account, profile}) {
      await connectDB();
      
      if(account?.provider === 'google'){
        try {
          // Get the image URL from the Google profile
          const imageUrl = (profile as { picture?: string })?.picture || profile?.image || user?.image;
          
          // First check if user exists by email
          let existingUser = await UserModel.findOne({ email: profile?.email });
          
          if(!existingUser) {
            // If no user with this email, check if there's a user with just phone number
            existingUser = await UserModel.findOneAndUpdate(
              { 
                email: { $exists: false }, 
                registrationStep: 'phone-verified' 
              },
              {
                email: profile?.email,
                name: profile?.name,
                image: imageUrl, // Use the correct image URL
                registrationStep: 'completed'
              },
              { new: true }
            );
          } else if (!existingUser.image) {
            // Update existing user's image if it's not set
            existingUser.image = imageUrl;
            await existingUser.save();
          }

          if(existingUser) {
            if (existingUser.phoneNumber && existingUser.registrationStep === 'completed') {
              return true;
            }
            return `/SignUp/phoneNumber?email=${profile?.email}&name=${profile?.name}&image=${imageUrl}`;
          } else {
            return `/SignUp/phoneNumber?email=${profile?.email}&name=${profile?.name}&image=${imageUrl}`;
          }
        } catch (error: Error | unknown) {
          console.error('Error in social sign in:', error);
          return false;
        }
      }
      return true;
    },
    async jwt({token , user}) {
      if(user){
        token._id = user._id?.toString()
        token.username = user.username?.toString()
        token.image = user.image?.toString()
        token.phoneNumber = user.phoneNumber 
      }
      return token
    },
    async session({session,token  }){
      if(token){
        session.user._id = token._id 
        session.user.username = token.username
        session.user.email = token.email
        session.user.image = token.image
        session.user.phoneNumber = token.phoneNumber || null
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // If the URL is the phone number verification page, allow it
      if (url.includes('/SignUp/phoneNumber')) {
        return url;
      }
      // For all other cases, including successful Google sign-in
      return `${baseUrl}/`; // Explicitly redirect to home page
    }
  },
  session: {
    strategy: 'jwt', // Use JSON Web Tokens for session
  },
  secret: process.env.NEXTAUTH_SECRET,
};