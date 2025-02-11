import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import connectDB from "@/lib/db";
import cloudinary from "@/utils/cloudinary";

export async function POST(
  request: NextRequest,
) {
  try {
    await connectDB();
    const session = await getServerSession(options);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const resume = formData.get("resume") as File;

    if (!resume) {
      return NextResponse.json({ error: "Resume is required" }, { status: 400 });
    }

    try {
      // Upload resume to Cloudinary
      const buffer = await resume.arrayBuffer();
      const base64File = Buffer.from(buffer).toString("base64");
      const dataUri = `data:${resume.type};base64,${base64File}`;

      const uploadResponse = await cloudinary.uploader.upload(dataUri, {
        resource_type: "raw",
        folder: "resumes",
      });


      return NextResponse.json(
        { 
          message: "Application submitted successfully",
          redirect: '/',
          resumeUrl: uploadResponse.secure_url
        },
        { status: 200 }
      );
    } catch (uploadError) {
      console.error('Upload Error:', uploadError);
      return NextResponse.json(
        { error: "Failed to upload resume" },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error submitting application:', error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
} 