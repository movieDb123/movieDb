import dbConnect from '@/utils/db';
import Cast from '@/Models/Cast';
import Director from '@/Models/Director';
import Genre from '@/Models/Genre';
import Show_Cast from '@/Models/Show_Cast';
import Show_Director from '@/Models/Show_Director';
import Show_Genre from '@/Models/Show_Genre';
import Show from '@/Models/Show';
import User from '@/Models/User';


export default async function handler(req, res) {
    await dbConnect();



        console.log('movies without any filter')
        const data = await Show.aggregate([
        
            {
                $lookup: {
                    from: 'show_genres',
                    localField: 'show_id',
                    foreignField: 'show_id',
                    as: 'genres',
                }
            },
            {
                $lookup: {
                    from: 'genres',
                    localField: 'genres.genre_id',
                    foreignField: 'genre_id',
                    as: 'genres'
    
                }
            },
            {
                $lookup: {
                    from: 'show_casts',
                    localField: 'show_id',
                    foreignField: 'show_id',
                    as: 'casts',
                }
            },
            {
                $lookup: {
                    from: 'casts',
                    localField: 'casts.cast_id',
                    foreignField: 'cast_id',
                    as: 'casts'
    
                }
            },        
            {
                $limit: 500
            },    
        ]).exec()
    
    
        
    
        res.send(data);
        return   

}