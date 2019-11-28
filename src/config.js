const prod = process.env.NODE_ENV === 'production';

const config = {
  HOST: prod ? '0.0.0.0' : 'localhost',
  PORT: prod ? process.env.PORT : '8080',
  MONGODB_URL: process.env.MONGODB_URI,
  ISRAEL_PROXY: process.env.ISRAEL_PROXY
}

module.exports = config;