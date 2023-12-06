// import XLSX from 'xlsx';
// import fs from 'fs/promises';

// async function runCode() {
//   console.log('start');
  
//   const fileName = 'CompleteShow.csv';
//   const workbook = XLSX.readFile('./excelFiles/' + fileName);
//   const sheetName = workbook.SheetNames[0];
//   const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
//     defval: null, // Set default value to null for empty cells
//   });

//   const jsonData = JSON.stringify(excelData, null, 2);

//   console.log(jsonData.length);

//   await fs.writeFile('./jsonFiles/CompleteShow.json', jsonData);

//   console.log('done');
// }

// runCode();

import XLSX from 'xlsx';
import fs from 'fs/promises';

async function runCode() {
  console.log('start');

  const fileName = 'CompleteShow.csv';
  const workbook = XLSX.readFile('./excelFiles/' + fileName);
  const sheetName = workbook.SheetNames[0];
  const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
    defval: null,
  });

  // Iterate over each row and split problematic fields into arrays
  const transformedData = excelData.map(row => {
    // Split 'cast' field into an array
    if (row.cast && typeof row.cast === 'string') {
      row.cast = row.cast.split(',').map(item => item.trim());
    }

    // Split 'listed_in' field into an array
    if (row.listed_in && typeof row.listed_in === 'string') {
      row.listed_in = row.listed_in.split(',').map(item => item.trim());
    }

    return row;
  });

  const jsonData = JSON.stringify(transformedData, null, 2);

  console.log(jsonData.length);

  await fs.writeFile('./jsonFiles/CompleteShow.json', jsonData);

  console.log('done');
}

runCode();
