import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import toast from "react-hot-toast";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || '';
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);
        const userId = decodedToken.id;
        return userId;
    } catch (error: any) {
        toast.error(error.message);
        return NextResponse.json({
            error: error.message,
            status: 500
        });
    }
}