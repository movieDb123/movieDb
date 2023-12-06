import mongoose from "mongoose";

// show_id,title,rating,duration,release_year

// show_id,type,title,director,cast,country,date_added,release_year,rating,duration,listed_in,description

const CompleteShowSchema = new mongoose.Schema({

    show_id: String,
    title: String,
    type: String,
    director: String,
    cast: [String],
    country: String,
    date_added: String,
    release_year: String,
    rating: String,
    duration: String,
    listed_in: [String],
    description: String,
})

export default mongoose.models.CompleteShow || mongoose.model('CompleteShow', CompleteShowSchema)
