const DataSource = require('../models/DataSource');
const { parseExcelFile } = require('../utils/excelParser');
const { connectToGoogleSheets } = require('../utils/googleSheets');
const AppError = require('../utils/appError');

exports.createDataSource = async (req, res, next) => {
  try {
    const { name, type, connectionDetails } = req.body;
    const userId = req.user._id;

    let tables = [];

    if (type === 'excel' && req.file) {
      tables = await parseExcelFile(req.file.buffer);
    } else if (type === 'google-sheets') {
      const sheetsData = await connectToGoogleSheets(connectionDetails);
      tables = sheetsData;
    }

    const dataSource = await DataSource.create({
      userId,
      name,
      type,
      connectionDetails,
      tables
    });

    res.status(201).json({
      status: 'success',
      data: { dataSource }
    });
  } catch (err) {
    next(err);
  }
};

exports.getUserDataSources = async (req, res, next) => {
  try {
    const dataSources = await DataSource.find({ userId: req.user._id });
    res.status(200).json({
      status: 'success',
      results: dataSources.length,
      data: { dataSources }
    });
  } catch (err) {
    next(err);
  }
};

exports.getDataSource = async (req, res, next) => {
  try {
    const dataSource = await DataSource.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!dataSource) {
      return next(new AppError('No data source found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { dataSource }
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteDataSource = async (req, res, next) => {
  try {
    const dataSource = await DataSource.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!dataSource) {
      return next(new AppError('No data source found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    next(err);
  }
};