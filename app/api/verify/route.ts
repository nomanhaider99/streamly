import db from "@/lib/db";
import UserModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await db();
    try {
        const { email } = await request.json();

        // Ensure the email is provided
        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }

        // Update the `isVerified` field to true for the specified email
        const updatedUser = await UserModel.findOneAndUpdate(
            { email }, // Find user by email
            { $set: { isVerified: true } }, // Update isVerified field
            { new: true, runValidators: true } // Return the updated document and run schema validation
        );

        // Handle case where user is not found
        if (!updatedUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "User verified successfully", data: updatedUser });
    } catch (error: any) {
        console.error("Error updating user:", error); // Log the error
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
