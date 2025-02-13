import connectDB from "@/lib/db";
import { Job } from "@/models/Job";
import { NextRequest, NextResponse } from "next/server";

// Fix: Use RouteContext to define param types correctly
export async function PATCH(
    request: NextRequest,
     context: { params: Promise< { id: string } >}  // ✅ Ensure params is correctly typed
) {
    try {
        const { id } = await context.params;  // ✅ Extract `id` correctly
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
    req: Request, 
    context :{ params : Promise<{ id: string }> }  // ✅ Correctly destructure params
) {
    try {
        const { id } = await context.params;
        await connectDB(); // Ensure the DB is connected

        const job = await Job.findById(id).populate("postedBy", "email");

        if (!job) {
            return NextResponse.json({ error: "Job not found" }, { status: 404 });
        }

        return NextResponse.json(job, { status: 200 });
    } catch (error) {
        console.error("Error fetching job:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}