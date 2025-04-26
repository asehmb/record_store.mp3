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
