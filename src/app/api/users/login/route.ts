import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { password, email } = reqBody;
        console.log(reqBody);

        const user = await User.findOne({ email });

        //Checking if the user exists 
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 })
        };
         
        //Password check
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid Password" }, { status: 400 })
        };

        //Token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        //Creating a Token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1h"});

        const response = NextResponse.json({
            message: "Login Successfully",
            success: true
        }) 
        
        response.cookies.set("token", token,{
            httpOnly: true,
        })

        return response;

    } catch (error: any) {
    return NextResponse.json({
        error: error.message,
        status: 500
    })
}}
