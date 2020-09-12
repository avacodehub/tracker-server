const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  
  customId: {
    type: String,
    required: true,
    //unique: true
  },
  payment: {
    type: String,
    required: true
  },
  totalTime: {
    type: String,
    required: true
  },
  totalCost: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Project', projectSchema)