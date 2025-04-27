import dbConnect from "@/database/connectDb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { trackId } = params;

    // if someone tries to get to api without an trackid but shouldnt appear in my flawless code
    // but just in case
    if (!trackId) {
      return NextResponse.json(
        { error: "Track ID is required" },
        { status: 400 }
      );
    }

    console.log(`Fetching reviews for track ID: ${trackId}`);

    await dbConnect();

    // Get the Review model
    const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);


    // Find all reviews for this trackId
    const reviews = await Review.find({ trackId }).exec();

    console.log(`Found ${reviews.length} reviews`);

    return NextResponse.json({
      status: "success",
      count: reviews.length,
      data: reviews
    });

  } catch (error) {
    console.error("Error in reviews endpoint:", error);
    
    return NextResponse.json(
      { 
        status: "error",
        message: "Failed to process request",
        error: error.message 
      },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  try {
    const { trackId } = params;

    // if someone tries to get to api without an trackid but shouldnt appear in my flawless code
    // but just in case
    if (!trackId) {
      return NextResponse.json(
        { error: "Track ID is required" },
        { status: 400 }
      );
    }

    console.log(`Adding review for track ID: ${trackId}`);

    await dbConnect();

    const body = await request.json();

    // check if account already sent a review
    const existingReview = await Review.findOne({ trackId: trackId, email: body.email }).exec();

    if (existingReview) {
      return NextResponse.json({ error: "You have already reviewed this track." }, { status: 400 });
    }

    // Get the Review model
    const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);
    // Create a new review
    const newReview = new Review({
      name: body.name,
      song: body.song,
      artist: body.artist,
      album: body.album,
      email: body.email,
      review: body.review,
      rating: body.rating,
      trackId: trackId,
    });
    // Save the review to the database
    await newReview.save();

    return NextResponse.json({
      status: "success",
      message: "Review added successfully",
      data: newReview,
    });
  } catch (error) {
    console.error("Error in reviews endpoint:", error);
    return NextResponse.json(
      { 
        status: "error",
        message: "Failed to process request",
        error: error.message 
      },
      { status: 500 }
    );
  }
}
// wsg ganger this how you add a review
    // const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

    // const testReview = new Review({
    //   name: "AJ",
    //   song: "Crocodile Tearz",
    //   artist: "JERMAINE_LAMAR_COLE",
    //   album: "MDL",
    //   email: "asehmbi11@gmail.com",
    //   review: "this shi fire",
    //   rating: 5,
    //   trackId: trackId,
    // });
    // await testReview.save();

    // Find all reviews for this trackId
