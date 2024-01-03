import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout success",
            success: true
        })
        // Delete the "token" cookie
        response.cookies.delete("token");

        return response;
    } catch (error: any) {
        return NextResponse.json(
            {
                error: error.message,
                status: 500
            },
        )
    }
}