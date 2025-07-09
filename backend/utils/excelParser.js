const xlsx = require('xlsx');
const AppError = require('./appError');

const parseExcelFile = async (buffer) => {
  try {
    const workbook = xlsx.read(buffer);
    const sheets = [];

    workbook.SheetNames.forEach((sheetName) => {
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

      if (jsonData.length > 0) {
        const headers = jsonData[0];
        const sampleData = jsonData.slice(1, 6).map((row) => {
          const obj = {};
          headers.forEach((header, index) => {
            obj[header] = row[index];
          });
          return obj;
        });

        sheets.push({
          name: sheetName,
          columns: headers,
          sampleData: sampleData
        });
      }
    });

    return sheets;
  } catch (err) {
    throw new AppError('Error parsing Excel file: ' + err.message, 400);
  }
};

module.exports = { parseExcelFile };