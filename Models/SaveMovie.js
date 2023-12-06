import mongoose from "mongoose";

// show_id,title,rating,duration,release_year

const SaveMovieSchema = new mongoose.Schema({

    user: mongoose.Schema.Types.ObjectId,
    show_id: String,
    status: {type: Number, default: 0}
})

export default mongoose.models.SaveMovie || mongoose.model('SaveMovie', SaveMovieSchema)
