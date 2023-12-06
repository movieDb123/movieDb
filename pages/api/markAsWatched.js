import dbConnect from '@/utils/db';
import { getSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt'
import User from '@/Models/User';
import SaveMovie from '@/Models/SaveMovie';
const secret = '0af2ef152c8a52b057af3eb9092f5aa0';




export default async function handler (req,res){
    await dbConnect();

    console.log('mark movie')

    const token = await getToken({ req, secret })
    const session = await getSession({ req })

    if (!token || !token.sub) {
        res.status(401);
        return res.end();
    }
    const currentUser = await User.findOne({id:token.sub}).exec();

    const checkMovie = await SaveMovie.updateOne({user: currentUser._id, show_id: req.query.id}, { $set: { status: 1 } }).exec();
    res.send('done')
    res.end();
    return;
    
}