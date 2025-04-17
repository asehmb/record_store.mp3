import Image from "next/image";
import styles from "./page.module.css";
import dbConnect from "./database/connectDb";
import mongoose from 'mongoose';



export default async function Home() {

  await dbConnect();

  const reviewSchema = new mongoose.Schema({
    name: String,
    song: String,
    artist: String,
    album: String,
    email: String,
    review: String,
    rating: Number,
  });

  const Review = mongoose.model("Review", reviewSchema);

  const review = new Review({
    name: "AJ",
    song: "where's the conffetti?",
    artist: "jev.",
    album: "the color grey.",
    email: "asehmbi11@gmail.com",
    review: "this shi fire",
    rating: 5,
  });

  await review.save();
  console.log("Review saved:", review);
  const reviews = await Review.find();


  return (
    <div className={styles.site}>

    </div>
  );
}
