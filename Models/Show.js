import mongoose from "mongoose";

// show_id,title,rating,duration,release_year

const ShowSchema = new mongoose.Schema({

    show_id: String,
    title: String,
    rating: String,
    release_year: String,

})

export default mongoose.models.Show || mongoose.model('Show', ShowSchema)
