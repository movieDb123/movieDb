import dbConnect from '@/utils/db';
import { getSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt'
import User from '@/Models/User';
import SaveMovie from '@/Models/SaveMovie';
import mongoose from 'mongoose';

const secret = '0af2ef152c8a52b057af3eb9092f5aa0';




export default async function handler (req,res){
    await dbConnect();


    const token = await getToken({ req, secret })
    const session = await getSession({ req })

    if (!token || !token.sub) {
        res.status(401);
        return res.end();
    }
    const currentUser = await User.findOne({id:token.sub}).exec();

    
    const response = await SaveMovie.find({user: currentUser._id}).exec();

    const movieIds = response.map(savedMovie => savedMovie.show_id);


    res.send(movieIds);
       
}