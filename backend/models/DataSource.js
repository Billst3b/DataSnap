const mongoose = require('mongoose');

const dataSourceSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  name: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['excel', 'google-sheets', 'postgresql', 'mysql', 'csv'],
    required: true 
  },
  connectionDetails: { type: Object, required: true },
  tables: [{
    name: String,
    columns: [String],
    sampleData: [Object]
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DataSource', dataSourceSchema);