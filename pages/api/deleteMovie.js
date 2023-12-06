import dbConnect from '@/utils/db';
import CompleteShow from '@/Models/CompleteShow';



import User from '@/Models/User';
import { getSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt'
const secret = '0af2ef152c8a52b057af3eb9092f5aa0';


export default async function handler(req, res) {
    await dbConnect();


    const token = await getToken({ req, secret })
  const session = await getSession({ req })

  if (!token || !token.sub) {
    res.status(401);
    return res.end();
  }
  const currentUser = await User.findOne({ id: token.sub }).exec();

  if (currentUser.role == "Admin") {

      
      await CompleteShow.deleteOne({show_id: req.query.id}).exec();
      
      res.send('done');
      res.end();
    }

    else res.status(401).end()


   
}