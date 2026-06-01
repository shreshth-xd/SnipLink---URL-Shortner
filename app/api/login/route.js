import { NextResponse } from "next/server";
import pool from "@/lib/db";
import argon2 from "argon2";
import {generateToken, verifyToken} from "@/lib/jwt";
import {getCurrentUser} from "@/lib/auth";

export async function POST(req){

    try{
        // Retrieving email and password from the request body
        const {email, password} = await req.json();
    
        // Find user
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );
    
        // User exists?
        if (result.rows.length === 0) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }
    
        const user = result.rows[0];
    
        // Verify password
        const valid = await argon2.verify(user.password_hash,password);
    
        if(!valid){
            return NextResponse.json({message: "Invalid credentials"}, {status: 401});
        }
    
        const currUser = await getCurrentUser();
        if(!currUser){
            const token = generateToken(user);
            const response = NextResponse.json({
                message: "Login successful"
            });
    
            response.cookies.set(
                "token",
                token,
                {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 60 * 60 * 24 * 7,
                    path: "/"
                }
            );
    
            return response;
        }

        return NextResponse.json({message: "Already logged in"}, {status: 200});


        
    }catch(error){
        console.log("Login error:", error);
        return NextResponse.json({message: "Internal server error"}, {status: 500});
    }
}