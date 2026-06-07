import pool from "@/lib/db";
import {nanoid} from "nanoid";
import { NextResponse } from "next/server";
import {getCurrentUser} from "@/lib/auth";
import { checkRateLimit } from "@/lib/rateLimiter";

export async function POST(req){
    try{
        
        const user = await getCurrentUser();
        const userId = user?.userId ?? null;

        // Attaching a Redis rate limiter for a user, guest or logged-in alike, using Redis rate limiting helper
        let key;
        let limit;

        if (user) {
            key =`rate_limit:user:${user.userId}`;
            limit = 45;
        } else {
            const ip =
                req.headers.get(
                "x-forwarded-for"
                )?.split(",")[0]?.trim()
                || "unknown";

            key =
                `rate_limit:ip:${ip}`;
            limit = 20;
        }

        // To reject the user if they have exceeded their hourly rate limits
        const rateLimitResult = await checkRateLimit(key,limit);
        if (!rateLimitResult.allowed) {
            return Response.json(
                {
                    error:"Rate limit exceeded. Please try again later.",
                },
                {
                    status: 429,
                }
            );
        }
        
        const body = await req.json();
        const {originalUrl} = body;

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