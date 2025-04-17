import dbConnect from "@/database/connectDb";
import Review from "@/models/review";
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  const reviews = await Review.find({});
  return NextResponse.json(reviews);
}

export async function POST(req) {
    await dbConnect();
    const body = await req.json();
  
    try {
      const review = await Review.create(body);
      return NextResponse.json(review, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }