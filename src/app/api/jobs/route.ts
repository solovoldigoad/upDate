import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Job } from '@/models/Job';
import User from '@/models/User';
import connectDB from "@/lib/db";


export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const session = await getServerSession(options);
        
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const { title, description, company, location, salary, requirements, applicants } = await req.json();
        
        // Find user by email from session
        const user = await User.findOne({ email: session.user.email });
        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
        if (user.userType !== 'employer') return NextResponse.json({ error: 'Only employers can post jobs' }, { status: 403 });

        const newJob = new Job({
            title,
            description,
            company,
            location,
            salary,
            postedBy: user._id,
            requirements,
            postedDate: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
            applicants: applicants || 0,
            status: 'pending'  // Add default status
        });

        await newJob.save();
        return NextResponse.json({ message: 'Job posted successfully', job: newJob }, { status: 201 });
    } catch {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB();
        const session = await getServerSession(options);
        
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const jobs = await Job.find({})
            .populate('postedBy', 'email')
            .sort({ postedDate: -1 });

        const jobsWithSessionEmail = {
            jobs,
            sessionUserEmail: session.user.email
        };

        return NextResponse.json(jobsWithSessionEmail);
    } catch {
        return NextResponse.json(
            { error: 'Failed to fetch jobs' },
            { status: 500 }
        );
    }
}



