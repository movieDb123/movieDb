import mongoose from "mongoose";

// show_id,title,rating,duration,release_year

const DirectorSchema = new mongoose.Schema({

    director_id: String,
    director_name: String,
})

export default mongoose.models.Director || mongoose.model('Director', DirectorSchema)
