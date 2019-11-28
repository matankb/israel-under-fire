const mongoose = require('mongoose');

const alertSchema = {
  timestamp: String
}

module.exports = mongoose.model('Alert', alertSchema);