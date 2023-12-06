import mongoose from "mongoose";

// show_id,title,rating,duration,release_year

const GenreSchema = new mongoose.Schema({

    genre_id: String,
    genre_name: String,
})

export default mongoose.models.Genre || mongoose.model('Genre', GenreSchema)
