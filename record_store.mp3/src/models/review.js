import mongoose from 'mongoose';


const reviewSchema = new mongoose.Schema({
    name: String,
    song: String,
    artist: String,
    album: String,
    email: String,
    review: String,
    rating: Number,
    trackId: Number, // from iTunes API
    
  });

export default mongoose.models.Review || mongoose.model('Review', reviewSchema);