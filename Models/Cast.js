import mongoose from "mongoose";

// show_id,title,rating,duration,release_year

const CastSchema = new mongoose.Schema({

    cast_id: String,
    cast_name: String,
})

export default mongoose.models.Cast || mongoose.model('Cast', CastSchema)
