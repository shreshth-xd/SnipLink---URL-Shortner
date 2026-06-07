import pool from "@/lib/db";
import { redirect }
from "next/navigation";

export async function GET( req, { params } ){

    const {shortCode} = await params;

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
    
    await pool.query(
        `
        UPDATE urls
        SET clicks = clicks + 1
        WHERE short_code = $1
        `,
        [shortCode]
    );

    
    redirect(
        url.original_url
    );
}