import dbConnect from '@/utils/db';
import CompleteShow from '@/Models/CompleteShow';


export default async function handler(req, res) {
    await dbConnect();


    
   const {casts, genres, directors, page, movieSearch} = req.body;


 
console.log('getting shows with filters');
console.log(req.body)
// Build the query
const query = {};

const conditions = [];

if (directors.length > 0) {
  conditions.push({ director: { $in: directors } });
}

if (genres.length > 0) {
  conditions.push({ listed_in: { $in: genres } });
}

if (casts.length > 0) {
  conditions.push({ cast: { $in: casts } });
}

if (movieSearch) {
  conditions.push({ title: { $regex: new RegExp(movieSearch, 'i') } });
}

if (conditions.length > 0) {
  query.$and = conditions;
}



// Execute the query
const data = await CompleteShow.find(query)
.limit(12)
.skip(page * 10)
.exec();


const count = await CompleteShow.countDocuments(query);

const response = {totalMovies: count, movies: [...data]}
console.log(response);
res.send(response);
}