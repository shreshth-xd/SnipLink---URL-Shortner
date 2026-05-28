import { NextResponse } from "next/server";
import pool from "@/lib/db";
import argon2 from "argon2";

export async function POST(req) {

    const body = await req.json();

    const username = body.username?.trim();
    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    // Missing fields
    if (!username || !email || !password) {
        return NextResponse.json(
            { error: "Missing required fields" },
            { status: 400 }
        );
    }

    // Username validation
    if (username.length < 3) {
        return NextResponse.json(
            { error: "Username must be at least 3 characters long" },
            { status: 400 }
        );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return NextResponse.json(
            { error: "Invalid email address" },
            { status: 400 }
        );
    }

    // Password validation
    if (password.length < 8) {
        return NextResponse.json(
            { error: "Password must be at least 8 characters long" },
            { status: 400 }
        );
    }

    if (!/\d/.test(password)) {
        return NextResponse.json(
            { error: "Password must contain at least one number" },
            { status: 400 }
        );
    }

    if (!/[A-Z]/.test(password)) {
        return NextResponse.json(
            { error: "Password must contain at least one uppercase letter" },
            { status: 400 }
        );
    }

    try {

        const hashedPassword =
            await argon2.hash(password);

        const result = await pool.query(
            `INSERT INTO users
            (username, email, password_hash)
            VALUES ($1, $2, $3)
            RETURNING id`,
            [username, email, hashedPassword]
        );

        return NextResponse.json(
            {
                message: "User created successfully",
                userId: result.rows[0].id
            },
            { status: 201 }
        );

    } catch (error) {

        // PostgreSQL UNIQUE violation
        if (error.code === "23505") {

            return NextResponse.json(
                { error: "User already exists" },
                { status: 409 }
            );
        }

        console.error("Error creating user:", error);

        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}