import dbConnect from '@/utils/db';
import Cast from '@/Models/Cast';

export default async function handler(req, res) {
    await dbConnect();

    const casts = await Cast.find({}).limit(200).exec();
    res.send(casts);

}