import dbConnect from '@/utils/db';
import Genre from '@/Models/Genre';


export default async function handler(req, res) {
    await dbConnect();

    const genres = await Genre.find({}).exec();
    res.send(genres);

}