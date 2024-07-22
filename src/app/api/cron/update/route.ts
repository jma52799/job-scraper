import { NextResponse } from "next/server";
import { scrapeJobs } from "@/lib/server-utils";

const baseUrls = [
    "https://www.indeed.com/jobs?q=Software&start={}"
]

export async function GET(request: Request) {
    const scrapedURLs: any[] = [];

    try {
        const scrapedData = await scrapeJobs('https://www.indeed.com/jobs?q=software+engineer&l=New+York%2C+NY&sc=0kf%3Aattr%28DSQF7%29%3B&radius=50');
        //const scrapedData = await scrapeIndeedPostings(baseUrls[0].replace('{}', '0'));
        scrapedURLs.push(...scrapedData);
        /*
        for (const url of baseUrls) {
            for (let i = 0; i <= 10; i += 10) {
                const scrapedData = await scrapeIndeedPostings(url.replace('{}', i.toString()));

                scrapedURLs.push(...scrapedData);
            }
        }

        
        */

    } catch (error: any) {
        throw new Error(`Failed to update db: ${error.message}`);
    }

    return NextResponse.json({ 
        message: "Ok",
        data: scrapedURLs
    });
}