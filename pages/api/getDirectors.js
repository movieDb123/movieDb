import dbConnect from '@/utils/db';
import Director from '@/Models/Director';

export default async function handler(req, res) {
    await dbConnect();

    const directors = await Director.find({}).exec();
    res.send(directors);

}