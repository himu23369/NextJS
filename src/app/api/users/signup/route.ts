import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"

export async function POST(request: NextRequest) {
    try {
        // console.log("Request ------------------------>  ",request.nextUrl);
        // console.log("Request ------------------------>  ",request.nextUrl.pathname);
        const reqBody = await request.json();
        const { username, password, email } = reqBody; 

        console.log(reqBody)

        //check user exists
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User already exists" },
                { status: 400 })
        }

        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt)

        //create user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        const savedUser = await newUser.save()
        console.log(savedUser)

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 })
    }
}


connect();