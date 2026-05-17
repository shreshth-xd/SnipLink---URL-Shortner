import pool from "@/lib/db";
import { redirect }
from "next/navigation";

export async function GET(
    req,
    { params }
){

    const {
        shortCode
    } = await params;

    const result =
        await pool.query(
            `
            SELECT original_url
            FROM urls
            WHERE short_code=$1
            `,
            [shortCode]
        );

    if(
        !result.rows.length
    ){

        return Response.json(
            {
                error:"Not found"
            },
            {
                status:404
            }
        );

    }

    redirect(
        result.rows[0]
        .original_url
    );
}