import mongoose from 'mongoose';


const reviewSchema = new mongoose.Schema({
    name: String,
    song: String,
    artist: String,
    album: String,
    email: String,
    review: String,
    rating: Number,
    trackId: {
      type: String,
      required: true,
      index: true, //makes it the index to speed up
    },
       
  });

export default mongoose.models.Review || mongoose.model('Review', reviewSchema);