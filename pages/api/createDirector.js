import dbConnect from '@/utils/db';
import Director from '@/Models/Director';
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
    const currentUser = await User.findOne({id:token.sub}).exec();

    if(currentUser.role == "Admin"){


      

    const {info} = req.body

    const data = await Director.aggregate([
        {
          $addFields: {
            parsedDirectorId: { $toInt: "$director_id" } // Convert director_id to integer
          }
        },
        {
          $sort: { parsedDirectorId: -1 } // Sort in descending order based on parsedDirectorId
        },
        {
          $limit: 1 // Get only the first document (which has the largest parsedDirectorId)
        }
      ])
      .exec();

      const newDirectorid = data[0].parsedDirectorId + 1;

      console.log(info.director_name)

      let director = new Director({
        
    director_id: newDirectorid,
    director_name:info.director_name ,
      })

      await director.save();
      res.send('done')

    }

    else res.status(401).end()
}