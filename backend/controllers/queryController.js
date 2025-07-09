const Query = require('../models/Query');
const DataSource = require('../models/DataSource');
const User = require('../models/User');
const { generateSQL } = require('../services/sqlGenerator');
const { processQuery } = require('../services/dataProcessing');
const AppError = require('../utils/appError');

exports.generateQuery = async (req, res, next) => {
  try {
    const { naturalLanguageQuery, dataSourceId } = req.body;
    const userId = req.user._id;

    const dataSource = await DataSource.findById(dataSourceId);
    if (!dataSource) {
      return next(new AppError('No data source found with that ID', 404));
    }

    const generatedSql = await generateSQL(naturalLanguageQuery, dataSource.tables);
    const results = await processQuery(generatedSql, dataSource);

    const query = await Query.create({
      userId,
      dataSourceId,
      naturalLanguageQuery,
      generatedSql,
      results
    });

    await User.findByIdAndUpdate(userId, { $inc: { queriesUsed: 1 } });

    res.status(201).json({
      status: 'success',
      data: { query }
    });
  } catch (err) {
    next(err);
  }
};

exports.getUserQueries = async (req, res, next) => {
  try {
    const queries = await Query.find({ userId: req.user._id })
      .sort('-createdAt')
      .populate('dataSourceId');

    res.status(200).json({
      status: 'success',
      results: queries.length,
      data: { queries }
    });
  } catch (err) {
    next(err);
  }
};

exports.getQuery = async (req, res, next) => {
  try {
    const query = await Query.findOne({
      _id: req.params.id,
      userId: req.user._id
    }).populate('dataSourceId');

    if (!query) {
      return next(new AppError('No query found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { query }
    });
  } catch (err) {
    next(err);
  }
};