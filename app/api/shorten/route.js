import { NextResponse } from "next/server";
import pool from "@/lib/db";
import {getCurrentUser} from "@/lib/auth";
import {nanoid} from "nanoid";

export async function POST(req){
    try{
        
        const user = await getCurrentUser();
        const userId = user?.userId ?? null;
    
        const body =
            await req.json();
        

        const {
            originalUrl,
        } = body;
        
        const shortCode = nanoid(7);

        if (!originalUrl) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Backend level check on whether the sent original_url is actually an url or not (we don't want "cat" to pass as an url)
        try {
            new URL(originalUrl);
        } catch {
            return NextResponse.json(
                { error: "Invalid URL" },
                { status: 400 }
            );
        }

        
        await pool.query(
            `
            INSERT INTO urls(
                original_url,
                short_code,
                user_id
            )
            VALUES ($1,$2,$3)
            `,
            [
                originalUrl,
                shortCode,
                userId
            ]
        );
    
        return NextResponse.json({
            success:true,
            shortCode
        });
    }catch (error) {
        console.error("Shorten error:", error);

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }


}