

async function getTrack(trackId) {
  const res = await fetch(`https://itunes.apple.com/search?term=${trackId}&limit=1`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Page({
  params, // No Promise wrapper needed (Next.js handles it)
}: {
  params: { trackId: string };
}) {
  const { trackId } = params;   
  const id = trackId.split('-')[0];
  console.log('trackId', trackId)
  const [trackData] = await Promise.all([
    // getReviewData(trackId),
    getTrack(id),
    console.log('trackId', trackId),
  ]);
  console.log('trackData', trackData)
    
  return (
    <main className="">
        <div className="">
        <h1 className="text-4xl font-bold">Reviews</h1>
        <p className="mt-4 text-lg">Coming soon...</p>
        </div>
        <div className="">
        <h2>Track Details</h2>
        <p>Track ID: {trackData.results[0].trackCount}</p>
        </div>
    </main>
  );
}