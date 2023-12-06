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



    const { info } = req.body

    const largestShowIdDocument = await CompleteShow.aggregate([
      {
        $project: {
          show_id: 1,
          numericPart: { $toInt: { $substr: ["$show_id", 1, -1] } } // Extract and convert the numeric part to integer
        }
      },
      {
        $sort: { numericPart: -1 } // Sort by the numeric part in descending order
      },
      {
        $limit: 1
      }
    ]).exec();
    let show_id_number = parseInt(largestShowIdDocument[0].numericPart) + 1
    let show_id = 's' + show_id_number


    const show = CompleteShow({
      duration: info.duration ? info.duration : null,
      title: info.title ? info.title : null,
      release_year: info.release_year ? parseInt(info.release_year) : null,
      rating: info.rating ? info.rating : null,
      type: info.type ? info.typ : null,
      director: info.director ? info.director.director_name : null,
      listed_in: info.genres ? info.genres : null,
      show_id: show_id
    })
    await show.save();
    console.log(show);
    res.send('done')
  }
  else res.status(401).end()

}