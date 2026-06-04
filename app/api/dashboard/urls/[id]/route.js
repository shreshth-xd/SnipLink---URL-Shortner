import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function DELETE(
    req,
    { params }
) {

    try {

        const user =
            await getCurrentUser();

        if (!user) {

            return NextResponse.json(
                {
                    error: "Unauthorized"
                },
                {
                    status: 401
                }
            );
        }

        const { id } =
            await params;

        const result =
            await pool.query(
                `
                UPDATE urls
                SET deleted_at = NOW()
                WHERE id = $1
                AND user_id = $2
                RETURNING id
                `,
                [
                    id,
                    user.userId
                ]
            );

        if (!result.rows.length) {

            return NextResponse.json(
                {
                    error: "URL not found"
                },
                {
                    status: 404
                }
            );
        }

        return NextResponse.json({
            success: true
        });

    } catch (error) {

        console.error(
            "Delete URL error:",
            error
        );

        return NextResponse.json(
            {
                error: "Internal server error"
            },
            {
                status: 500
            }
        );
    }
}