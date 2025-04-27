

async function getTrack(trackId) {
  const res = await fetch(`https://itunes.apple.com/lookup?id=${trackId}&limit=1`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

async function getReviewData(trackId) {
  const res = await fetch(`${process.env.API_HOST}/api/reviews/${trackId}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}


// review is a reviewSchema from models/review.js
async function sendReviewData(trackId, review) {
  const res = await fetch(`${process.env.API_HOST}/api/reviews/${trackId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(review),
  });
  if (!res.ok) {
    throw new Error('Failed to send review data');
  }
  return res.json();
}

export default async function Page({
  params, 
}: {
  params: { trackId: string };
}) {
  const { trackId } = params;   
  const id = trackId.split('-')[0];
  console.log('trackId', trackId)
  const [trackData, reviewData] = await Promise.all([
    getTrack(id),
    getReviewData(id),
    console.log('trackId', trackId),
  ]);
  console.log('trackData', trackData)
  console.log('reviewData', reviewData)
    
  return (
    <main className="">
        <div className="">
        <h1 className="text-4xl font-bold">Reviews</h1>
        <p className="mt-4 text-lg">Coming soon...</p>
        </div>
        <div className="">
        <h2>Track Details</h2>
        <p>Track ID: {trackData.results[0].trackName}</p>
        </div>
    </main>
  );
}


// example of search with crocodile tearz
/*trackData {
  resultCount: 1,
  results: [
    {
      wrapperType: 'track',
      kind: 'song',
      artistId: 73705833,
      collectionId: 1739698034,
      trackId: 1739698036,
      artistName: 'J. Cole',
      collectionName: 'Might Delete Later',
      trackName: 'Crocodile Tearz',
      collectionCensoredName: 'Might Delete Later',
      trackCensoredName: 'Crocodile Tearz',
      artistViewUrl: 'https://music.apple.com/us/artist/j-cole/73705833?uo=4',
      collectionViewUrl: 'https://music.apple.com/us/album/crocodile-tearz/1739698034?i=1739698036&uo=4',
      trackViewUrl: 'https://music.apple.com/us/album/crocodile-tearz/1739698034?i=1739698036&uo=4',
      previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/05/8a/4b/058a4b2e-3063-90af-f31b-76cf377b7f38/mzaf_10166677553363023352.plus.aac.p.m4a',
      artworkUrl30: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/e5/91/e9/e591e93a-969f-6b82-9dc5-874edc3d22ba/24UMGIM38890.rgb.jpg/30x30bb.jpg',
      artworkUrl60: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/e5/91/e9/e591e93a-969f-6b82-9dc5-874edc3d22ba/24UMGIM38890.rgb.jpg/60x60bb.jpg',
      artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/e5/91/e9/e591e93a-969f-6b82-9dc5-874edc3d22ba/24UMGIM38890.rgb.jpg/100x100bb.jpg',
      collectionPrice: 9.99,
      trackPrice: 1.29,
      releaseDate: '2024-04-05T12:00:00Z',
      collectionExplicitness: 'explicit',
      trackExplicitness: 'explicit',
      discCount: 1,
      discNumber: 1,
      trackCount: 12,
      trackNumber: 2,
      trackTimeMillis: 229187,
      country: 'USA',
      currency: 'USD',
      primaryGenreName: 'Hip-Hop/Rap',
      contentAdvisoryRating: 'Explicit',
      isStreamable: true
    }
  ]
} */