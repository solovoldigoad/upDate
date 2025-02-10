import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/db';
import User  from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );

    // Remove password from response
    const userWithoutPassword = {
      _id: user._id,
      email: user.email,
      name: user.name,
      userType: user.userType,
      ...(user.company && { company: user.company }),
    };

    // Return success with redirect path
    return NextResponse.json({ 
      message: "Login successful",
      user: userWithoutPassword,
      token,
      redirectTo: "/" // Always redirect to home page after login
    }, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
