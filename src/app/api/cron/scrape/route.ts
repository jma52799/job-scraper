"use server";

import { connectToDatabase } from "@/lib/mongoose";
import { scrapeJobs } from "@/lib/server-utils";
import Job from  "@/lib/models/job.model";
import { NextResponse } from "next/server";
import { baseURL } from "@/lib/constants";

export async function GET() {
    try {
        connectToDatabase();
        
        const scrapedJobs = await scrapeJobs(baseURL);

        if (!scrapedJobs) return;

        for (const job of scrapedJobs) {
            try {
                //Check if job already exists in db using applyLink to prevent duplicate jobs entries
                const existingJob = await Job.findOne({ jobPostUrl: job.jobPostUrl });
                if (!existingJob) {
                    const newJob = new Job(job);
                    await newJob.save();
                }
            } catch (error: any) {
                throw new Error(`Failed to store job to db: ${error.message}`);
            } 
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
    
    return NextResponse.json({ message: "Scrape Successed" });
}