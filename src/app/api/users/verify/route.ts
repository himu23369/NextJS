import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();
 
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        })
        if (!user) {
            return NextResponse.json({
                status: "failed",
                message: "Invalid or expired token",
                error: "Invalid Token"
            })
        }
        console.log(user);
        console.log("hi")

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        console.log("hi2")

        return NextResponse.json({
            status: "success",
            message: "User verified successfully",
            data: user
        })

    } catch (error: any) {
        console.log(error.message)
    }
}