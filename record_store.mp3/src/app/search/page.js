'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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
          `https://itunes.apple.com/search?term=${formattedTerm}&entity=song`,
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

          </li>
        ))}
      </ul>
    </div>
  );
}