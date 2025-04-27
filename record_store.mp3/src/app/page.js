import Image from "next/image";
import styles from "./page.module.css";
import dbConnect from "@/database/connectDb";
import reviewSchema from "@/models/review";
import mongoose from 'mongoose';
import Link from 'next/link'
import SearchBar from "@/components/SearchBar/page";


export default async function Home() {

  const res = await fetch(
    'https://itunes.apple.com/search?term=Money+Trees&entity=song',
    { cache: 'no-store' }
  );

  const data = await res.json();
  const songs = data.results;
  const searchTerm = 'Search..';

  return (
    <main className="p-6">
      <h1>Money Trees:</h1>
      <SearchBar/>
      <ul>

      </ul>
    </main>
  );
}
