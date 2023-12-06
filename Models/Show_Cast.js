import mongoose from "mongoose";

// show_id,title,rating,duration,release_year

const Show_Cast_Schema = new mongoose.Schema({

    show_id: {type: String ,ref: 'Show'},
    cast_id: {type: String, ref: 'Cast'},
})

export default mongoose.models.Show_Cast || mongoose.model('Show_Cast', Show_Cast_Schema)
