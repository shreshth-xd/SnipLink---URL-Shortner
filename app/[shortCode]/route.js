import pool from "@/lib/db";
import { redirect }
from "next/navigation";

export async function GET( req, { params } ){

    const {shortCode} = await params;
    const referrer = req.headers.get("referer");
    const ip = req.headers.get("x-forwarded-for");

    // Retrieving the original URL
    const result =
        await pool.query(
            `
            SELECT id, original_url
            FROM urls
            WHERE short_code=$1
            `,
            [shortCode]
        );

    if(!result.rows.length){
        return Response.json(
            {
                error:"Not found"
            },
            {
                status:404
            }
        );
    }

    const url = result.rows[0];
    
    // Instead of hitting our Postgres DB to update the click count or to insert the click entry into analytics
    // we shall be passing this as a job down to our analytics queue which will be processed asynchronously by a worker.
    await analyticsQueue.add(
        "track-click",
        {
            urlId: url.id,
            referrer: referrer,
            ip: ip
        }
    );

    
    redirect(
        url.original_url
    );
}