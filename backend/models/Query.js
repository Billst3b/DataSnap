const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  dataSourceId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'DataSource', 
    required: true 
  },
  naturalLanguageQuery: { type: String, required: true },
  generatedSql: { type: String, required: true },
  results: { type: Object },
  visualizationType: { 
    type: String, 
    enum: ['bar', 'line', 'pie', 'table', 'none'] 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Query', querySchema);