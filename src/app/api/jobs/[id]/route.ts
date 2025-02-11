import connectDB from "@/lib/db";
import {Job }from "@/models/Job";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function PATCH(
    request: Request,
    context : { params: { id: string } }      
) {
    try {
        const { id } = context.params;
        const { status } = await request.json();

        await connectDB();
        
        const updatedJob = await Job.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedJob) {
            return NextResponse.json(
                { error: 'Job not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedJob);
    } catch (error) {
        console.error('Error updating job:', error);
        return NextResponse.json(
            { error: 'Failed to update job' },
            { status: 500 }
        );
    }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const job = await Job.findById(params.id).populate('postedBy', 'email');
    
    if (!job) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error('Error fetching job:', error);
    return NextResponse.json(
      { error: "Failed to fetch job details" },
      { status: 500 }
    );
  }
} 