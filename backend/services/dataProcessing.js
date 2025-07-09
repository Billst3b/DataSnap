const { Pool } = require('pg');
const xlsx = require('xlsx');
const AppError = require('../utils/appError');

const processQuery = async (sqlQuery, dataSource) => {
  try {
    if (dataSource.type === 'postgresql') {
      const pool = new Pool(dataSource.connectionDetails);
      const result = await pool.query(sqlQuery);
      await pool.end();
      return result.rows;
    } else if (dataSource.type === 'excel') {
      const workbook = xlsx.read(dataSource.connectionDetails.fileBuffer, {
        type: 'buffer'
      });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      return xlsx.utils.sheet_to_json(worksheet);
    } else if (dataSource.type === 'google-sheets') {
      // Implement Google Sheets processing
      return dataSource.tables[0].sampleData;
    }
    throw new AppError('Unsupported data source type', 400);
  } catch (err) {
    throw new AppError('Error processing query: ' + err.message, 500);
  }
};

module.exports = { processQuery };