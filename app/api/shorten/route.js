import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req){

    const body =
        await req.json();

    const {
        originalUrl,
        shortCode
    } = body;

    await pool.query(
        `
        INSERT INTO urls(
            original_url,
            short_code
        )
        VALUES ($1,$2)
        `,
        [
            originalUrl,
            shortCode
        ]
    );

    return NextResponse.json({
        success:true
    });
}