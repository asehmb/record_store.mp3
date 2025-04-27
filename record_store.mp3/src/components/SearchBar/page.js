'use client';
import styles from "./searchbar.module.css"
import { useState } from 'react';
import Link from 'next/link';

export default function SearchBar( ) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <input
        type="text"
        placeholder="Search song..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Link href={{pathname: `/search`,
                    query: { searchTerm }}}>
        Go to Song Page
      </Link>
    </div>
  );
}