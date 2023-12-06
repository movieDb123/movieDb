import mongoose from "mongoose";

// show_id,title,rating,duration,release_year

const Show_Genre_Schema = new mongoose.Schema({

    show_id: {type: String ,ref: 'Show'},
    genre_id: {type: String, ref: 'Genre'},
})

export default mongoose.models.Show_Genre || mongoose.model('Show_Genre', Show_Genre_Schema)
