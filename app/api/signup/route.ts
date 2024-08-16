import db from "@/lib/db";
import userModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/emails/email";



export async function POST(request: NextRequest) {
    await db();
    try {
        const { firstName, lastName, email, password } = await request.json();
        const link = `http://localhost:3000/verification?email=${encodeURIComponent(email)}`
        // Check if user already exists
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return NextResponse.json({ message: "User already exists!" }, { status: 400 });
        }

        // Hash the password
        const hashedPassword = await bcryptjs.hash(password, 12);

        // Create a new user
        const user = await userModel.create({ firstName, lastName, email, password: hashedPassword });

        // Send email (optional)
        sendEmail(email, link);

        // Return success response
        return NextResponse.json({
            message: "User created successfully, kindly check your email",
            data: user,
        });
    } catch (error: any) {
        // Log the error for debugging
        console.error("Error in API route:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
