require('dotenv').config();

const path = require('path');

const fastify = require('fastify');
const mongoose = require('mongoose');

const Alert = require('./Alert');
const config = require('./config');

mongoose.connect(config.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const app = fastify({ logger: true });

app.register(require('point-of-view'), {
  engine: {
    mustache: require('mustache')
  }
})

app.get('/api/alerts', async () => {
  const alerts = await Alert.find().select('timestamp -_id').lean();
  return alerts.map(a => a.timestamp);
})

app.get('/', (req, reply) => {
  reply.view('/public/index.html', { COLLECTION_BEGIN_DATE: process.env.COLLECTION_BEGIN_DATE || '11/27/2019' })
})

app.register(require('fastify-static'), {
  root: path.join(__dirname, '../public'),
})

app.listen(config.PORT, config.HOST, (err, address) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Server started ' + address);
  }
})