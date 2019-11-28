function datesWithin(dates, now, maxElapsed) {
  return dates.filter(d => now - d.getTime() < maxElapsed).length;
}

// gets timestamp of first visit
function getFirstVisitTime() {
  const time = localStorage.getItem('first-visit');
  if (time) {
    return parseInt(time);
  }
  const now = Date.now();
  localStorage.setItem('first-visit', now);
  return now;
}

function computeStats(dateStrings) {
  const dates = dateStrings.map(d => new Date(d));

  const day = 86400000;
  const week = 604800000;
  const month = 2592000000; // Thirty days
  const today = new Date();
  const firstVisit = Date.now() - getFirstVisitTime();
  today.setHours(today.getHours() + 7); // account for time difference
  const now = today.getTime();

  const withinDay = datesWithin(dates, now, day);
  const withinWeek = datesWithin(dates, now, week);
  const withinMonth = datesWithin(dates, now, month);
  const withinFirstVisit = datesWithin(dates, now, firstVisit);

  document.querySelector('#day').textContent = withinDay;
  document.querySelector('#week').textContent = withinWeek;
  document.querySelector('#month').textContent = withinMonth;
  document.querySelector('#first-visit').textContent = withinFirstVisit;
}

async function populateData() {
  const data = await (await fetch('/api/alerts')).json();
  computeStats(data);
}

function insertFirstVisitTime() {
  const time = getFirstVisitTime();
  const date = new Date(time);
  document.querySelector('#first-visit-info').title = `Since ${date.toLocaleString()}`;
}

populateData();
insertFirstVisitTime();

document.querySelector('#about-link').addEventListener('click', () => {
  document.querySelector('.about').classList.toggle('visible');
})