import dbConnect from '@/utils/db';
import CompleteShow from '@/Models/CompleteShow';


export default async function handler(req, res) {
    await dbConnect();

    console.log('getting show')
    console.log('sfksjk');
    console.log(req.body);

    const show = await CompleteShow.findOne({show_id: req.body.id}).exec();
    res.send(show);
    
    
}