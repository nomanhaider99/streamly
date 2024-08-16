import db from "@/lib/db";
import UserModel from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await db(); // Connect to the database

    try {
        const { email, description, image } = await request.json();

        if (!email || !description) {
            return NextResponse.json({ error: "Email and description are required." }, { status: 400 });
        }

        // Find the user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found." }, { status: 404 });
        }

        // Create a new post
        const newPost = {
            image: image || "", // Default to an empty string if image is not provided
            description,
            createdAt: Date.now()
        };

        // Add the new post to the user's posts array
        user.posts.push(newPost);

        // Save the updated user document
        await user.save();

        return NextResponse.json({ message: "Post created successfully.", post: newPost }, { status: 201 });
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json({ error: "Failed to create post." }, { status: 500 });
    }
}
