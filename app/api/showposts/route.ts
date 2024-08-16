import db from '@/lib/db';
import userModel from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  await db();
  
  try {
    const posts = await userModel.aggregate([
      { $unwind: "$posts" },
      {
        $project: {
          _id: 0,
          firstName: 1,
          lastName: 1,
          email: 1,
          createdAt: "$posts.createdAt",
          description: "$posts.description",
          image: "$posts.image"
        }
      }
    ]);

    return NextResponse.json(posts, { status: 200 });
  } catch (error: any) {
    console.error('Error in API route:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
