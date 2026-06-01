import { NextResponse } from "next/server";
import pool from "@/lib/db";
import {getCurrentUser} from "@/lib/auth";

export async function POST(req){
    try{
        
        const user = await getCurrentUser();
        const userId = user?.userId ?? null;
    
        const body =
            await req.json();
    
            
        const {
            originalUrl,
            shortCode
        } = body;
    

        if (!originalUrl || !shortCode) {
            return NextResponse.json(
                { error: "Missing required fields" },
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
            success:true
        });
    }catch (error) {
        console.error("Shorten error:", error);

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }


}