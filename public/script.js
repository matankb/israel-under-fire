function datesWithin(dates, now, maxElapsed) {
  return dates.filter(d => now - d.getTime() < maxElapsed).length;
}

function computeStats(dateStrings) {
  const dates = dateStrings.map(d => new Date(d));

  const day = 86400000;
  const week = 604800000;
  const month = 2592000000; // Thirty days
  const today = new Date();
  today.setHours(today.getHours() + 7); // account for time difference
  const now = today.getTime();

  const withinDay = datesWithin(dates, now, day);
  const withinWeek = datesWithin(dates, now, week);
  const withinMonth = datesWithin(dates, now, month);

  document.querySelector('#day').textContent = withinDay;
  document.querySelector('#week').textContent = withinWeek;
  document.querySelector('#month').textContent = withinMonth;
}

async function go() {
  const data = await (await fetch('/api/alerts')).json();
  computeStats(data);
}

async function refresh() {
  const data = await (await fetch('/api/refresh')).json();
  computeStats(data);
}

go();

document.querySelector('.refresh').onclick = () => {
  refresh()
};