import XLSX from 'xlsx'
import dbConnect from '../utils/db.js';
import Show from '../Models/Show.js'
import Director from '../Models/Director.js';
import Show_Director from '../Models/Show_Director.js';
async function runCode(){

    await dbConnect();

    console.log('start');
    
    // Replace 'your-excel-file.xlsx' with the actual name of your Excel file
    
    const fileName = 'showdirector.csv'
    const workbook = XLSX.readFile('./excelFiles/' + fileName);
    const sheetName = workbook.SheetNames[0];
    const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    
    for (const elem of excelData) {
        console.log(elem);
        const show = await Show.findOne({ 'show_id': elem.show_id }).exec();
        const director = await Director.findOne({ 'director_id': elem.director_id }).exec();

        const show_genre = new Show_Director({
            show_id: show._id,
            director_id: director._id
        })
        console.log(show_genre)
        await show_genre.save();
    }
}

runCode();