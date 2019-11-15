const path = require('path');

const fastify = require('fastify');
const mongoose = require('mongoose');

const getAlertHistory = require('./alert-history');

// mongoose.connect('mongodb://localhost:27017/israelunderfire', { useNewUrlParser: true, useUnifiedTopology: true });

const app = fastify({ logger: true });

let datesCache = [];

app.get('/api/refresh', async (req, reply) => {
  const alerts = await getAlertHistory();
  const dates = alerts.map(alert => alert.alertDate);
  datesCache = dates;
  reply.send(dates);
});

app.get('/api/alerts', async () => {
  return datesCache;
})

app.register(require('fastify-static'), {
  root: path.join(__dirname, './public'),
})

const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';
const port = process.env.NODE_ENV === 'production' ? process.env.PORT : '8080';

app.listen(port, host, (err, address) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Server started ' + address);
  }
})