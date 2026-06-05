import pool from "@/lib/db";
import { redirect }
from "next/navigation";

export async function GET( req, { params } ){

    const {
        shortCode
    } = await params;

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
        AND id = $2
        `,
        [shortCode, url.id]
    );


  // Insert analytics event
    await pool.query(
        `
        INSERT INTO click_events (
        url_id
        )
        VALUES ($1)
        `,
        [url.id]
    );

    
    redirect(
        url.original_url
    );
}