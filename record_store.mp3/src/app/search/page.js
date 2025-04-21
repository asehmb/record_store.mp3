'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

/*
 * we could also search like we did in the pokedex, and have a div in the top right with results
  * https://itunes.apple.com/search?term=${formattedTerm}&entity=song&limit=10
  * this way we can limit it to 10 results
  * but like then we also gotta get the albums which isn't working rekgardless
  * might be able to add it into the entity tag tho
  * https://performance-partners.apple.com/search-api
*/


export default function SearchPage() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('searchTerm') || '';

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSongs = async () => {
      if (!searchTerm) {
        setSongs([]);
        return;
      }

      setLoading(true);
      try {
        console.log('Search Term:', searchTerm);
        const formattedTerm = encodeURIComponent(searchTerm);
        console.log('Formatted Term:', formattedTerm);
        const res = await fetch(
          `https://itunes.apple.com/search?term=${formattedTerm}&entity=song&media=music`,
          { cache: 'no-store' }
        );
        const data = await res.json();
        setSongs(data.results || []);
      } catch (error) {
        console.error('Error fetching songs:', error);
        setSongs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [searchTerm]);


  function slugify(text) {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/[\s\-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Search Results for "{searchTerm}"</h1>

      {loading && <p>Loading...</p>}

      {!loading && songs.length === 0 && (
        <p>No results found.</p>
      )}

      <ul>
        {songs.map((song) => (
          <li key={song.trackId} style={{ marginBottom: '1rem' }}>{song.trackName} by {song.artistName}
            <Link href={{pathname: `reviews/${slugify(song.trackName)}-${slugify(song.artistName)}`
                          }} >
            {song.trackName} by {song.artistName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}