const request = require('request');
const isJson = require('is-json');

const config = require('./config');

function getAlertHistory() {

  const options = {
    'Referer': 'https://www.oref.org.il/11226-he/pakar.aspx',
    'X-Requested-With': 'XMLHttpRequest',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
    proxy: config.ISRAEL_PROXY,
  }

  return new Promise((res, rej) => {
    request('https://www.oref.org.il/WarningMessages/History/AlertsHistory.json', options, (err, response) => {
      if (err) {
        rej(err);
      } else {
        if (isJson(response.body)) {
          const data = JSON.parse(response.body);
          res(data.map(a => a.alertDate));
        } else {
          console.log('Non-JSON response: ', response.body);
          res([]);
        }
      }
    })
  })
}

getAlertHistory().then(console.log);

module.exports = getAlertHistory;