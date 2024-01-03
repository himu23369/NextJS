import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";

// Connect the user to the database
connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findById({_id:userId}).select("-password");
        return NextResponse.json({
            message: "User found successfully",
            success: true,
            userData: user
        })
    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            status: 500
        })
    }
}