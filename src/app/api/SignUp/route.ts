import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, password, userType, company, name } = await req.json();

    // Get the registration ID from cookie
    const cookieStore = await cookies();
    const registrationId = cookieStore.get('registration_id')?.value;
    
    if (!registrationId) {
      return NextResponse.json(
        { error: "Phone verification required" }, 
        { status: 400 }
      );
    }

    // Find the temporary user
    const existingUser = await User.findById(registrationId);
    if (!existingUser) {
      return NextResponse.json(
        { error: "Registration session expired" }, 
        { status: 400 }
      );
    }

    // Check if email is already used
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return NextResponse.json(
        { error: "Email already registered" }, 
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update existing user with remaining details
    existingUser.email = email;
    existingUser.password = hashedPassword;
    existingUser.name = userType === 'employer' ? company : name;
    existingUser.company = userType === 'employer' ? company : undefined;
    existingUser.registrationStep = 'completed';

    await existingUser.save();
    
    // Clear the registration cookie using the same cookieStore instance
    cookieStore.delete('registration_id');

    return NextResponse.json({ 
      message: "Registration completed successfully",
      redirectTo: "/" 
    }, { status: 200 });
    
  } catch (error) {
    console.error('Registration completion error:', error);
    return NextResponse.json({ 
      error: "Something went wrong" 
    }, { status: 500 });
  }
}
