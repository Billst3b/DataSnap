const mongoose = require('mongoose');

const visualizationSchema = new mongoose.Schema({
  queryId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Query', 
    required: true 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  chartType: { type: String, required: true },
  chartConfig: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Visualization', visualizationSchema);