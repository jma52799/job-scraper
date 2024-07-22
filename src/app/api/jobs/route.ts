import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Job from "@/lib/models/job.model";

export async function GET(request: Request) {
    try {
        await connectToDatabase();

        const url = new URL(request.url);
        const resultsParam = url.searchParams.get("results");
        const results = resultsParam ? parseInt(resultsParam) : null;

        const jobs = results ? await Job.find({}).limit(results) : await Job.find({});

        // Check if the number of jobs fetched is less than the requested number
        if (results && jobs.length < results) {
            return NextResponse.json({ message: `Less than ${results} entries exist in the database, showing all entries instead`, data: jobs });
        }

        return NextResponse.json({ message: "Ok", data: jobs });
    } catch (error: any) {
        throw new Error(`Failed to get jobs from db: ${error.message}`);
    }
}