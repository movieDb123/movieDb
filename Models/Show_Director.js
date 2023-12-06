import mongoose from "mongoose";

// show_id,title,rating,duration,release_year

const Show_Director_Schema = new mongoose.Schema({

    show_id: {type: String ,ref: 'Show'},
    director_id: {type: String, ref: 'Director'},
})

export default mongoose.models.Show_Director || mongoose.model('Show_Director', Show_Director_Schema)
