const request = require('request');

module.exports = function getAlertHistory() {
  return new Promise((res, rej) => {
    request('https://www.oref.org.il/WarningMessages/History/AlertsHistory.json', {
      'Referer': 'https://www.oref.org.il/11226-he/pakar.aspx',
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
      proxy: 'http://82.81.169.142:80'
    }, (err, response) => {
      if (err) {
        rej(err);
      } else {
        res(JSON.parse(response.body));
      }
    })
  })
}