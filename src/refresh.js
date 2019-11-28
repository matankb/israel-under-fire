require('dotenv').config();

const mongoose = require('mongoose');

const config = require('./config');
const Alert = require('./Alert');
const getAlertHistory = require('./alert-history');

mongoose.connect(config.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

async function refreshAlerts() {
  const alerts = await Alert.find();
  const newAlerts = (await getAlertHistory())
    .filter(timestamp => {
      return !alerts.find(a => a.timestamp === timestamp);
    }).map(timestamp => {
      return new Alert({ timestamp });
    });
    
  if (!newAlerts.length) {
    console.log('No new alerts');
  } else {
    console.log(`${newAlerts.length} new alerts`);
    Alert.collection.insertMany(newAlerts, () => {
      process.exit(0);
    });
  }
}

refreshAlerts();