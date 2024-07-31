import { NextResponse } from "next/server";
import { scrapeJobs } from "@/lib/server-utils";
import { NO_CACHE_HEADERS } from "@/lib/constants";

const baseUrls = [
    "https://www.indeed.com/jobs?q=Software&start={}"
]

export async function GET(request: Request) {
    const scrapedURLs: any[] = [];

    try {
        const scrapedData = await scrapeJobs('https://www.indeed.com/jobs?q=software+engineer&l=New+York%2C+NY&sc=0kf%3Aattr%28DSQF7%29%3B&radius=50');
        scrapedURLs.push(...scrapedData);


    } catch (error: any) {
        throw new Error(`Failed to update db: ${error.message}`);
    }

    return NextResponse.json(
        { 
            message: "Ok",
            data: scrapedURLs
        },
        { headers: NO_CACHE_HEADERS }
    );
}