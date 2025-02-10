import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { phoneNumber, userType, email, name, image } = await req.json();

    if (!phoneNumber || !userType) {
      return NextResponse.json(
        { message: "Phone Number and usertype are required" }, 
        { status: 400 }
      );
    }

    // Check if phone number exists
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return NextResponse.json({ 
        exists: true,
        message: "Phone number already exists" 
      }, { status: 200 });
    }

    // If we have email (from social sign-in), try to find and update existing user
    if (email) {
      const existingEmailUser = await User.findOne({ email });
      if (existingEmailUser) {
        existingEmailUser.phoneNumber = phoneNumber;
        existingEmailUser.userType = userType;
        existingEmailUser.registrationStep = 'completed';
        if (image && !existingEmailUser.image) {
          existingEmailUser.image = image;
        }
        await existingEmailUser.save();
        
        return NextResponse.json(
          { message: "User updated successfully" }, 
          { status: 200 }
        );
      }
    }

    // If no existing user, create new one
    const tempUser = new User({
      phoneNumber,
      userType,
      email: email || undefined,
      name: name || undefined,
      image: image || undefined,
      registrationStep: email ? 'completed' : 'phone-verified'
    });
    await tempUser.save();

    const response = NextResponse.json(
      { message: "Phone number verified successfully" }, 
      { status: 200 }
    );

    // Only set registration cookie if not a social sign-up
    if (!email) {
      response.cookies.set('registration_id', tempUser._id.toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600
      });
    }

    return response;
  } catch (error) {
    console.error('Phone verification error:', error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}