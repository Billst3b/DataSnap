const { GoogleSpreadsheet } = require('google-spreadsheet');
const AppError = require('./appError');

const connectToGoogleSheets = async (connectionDetails) => {
  try {
    const doc = new GoogleSpreadsheet(connectionDetails.spreadsheetId);
    await doc.useServiceAccountAuth({
      client_email: connectionDetails.client_email,
      private_key: connectionDetails.private_key
    });
    await doc.loadInfo();

    const sheets = [];
    for (let i = 0; i < doc.sheetCount; i++) {
      const sheet = doc.sheetsByIndex[i];
      const rows = await sheet.getRows();
      const headers = sheet.headerValues;
      const sampleData = rows.slice(0, 5).map(row => row._rawData);

      sheets.push({
        name: sheet.title,
        columns: headers,
        sampleData: sampleData.map(row => {
          const obj = {};
          headers.forEach((header, index) => {
            obj[header] = row[index];
          });
          return obj;
        })
      });
    }

    return sheets;
  } catch (err) {
    throw new AppError('Error connecting to Google Sheets: ' + err.message, 400);
  }
};

module.exports = { connectToGoogleSheets };