//* CLOCK.JS SCRIPT
const hour = document.querySelector(".clock__hour");
const minute = document.querySelector(".clock__minute");
const second = document.querySelector(".clock__second");
const digitalTime = document.querySelector(".clock__digital-time");
const date = document.querySelector(".clock__date");
const dateNow = new Date();
let secondDegrees = dateNow.getSeconds() * 6;
let minuteDegrees = dateNow.getMinutes() * 6;
let hourDegrees = (dateNow.getHours() % 12) * 30 + dateNow.getMinutes() * 0.5;
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function displayInitialTime() {
  second.style.transform = `translate(-50%, -100%) rotate(${secondDegrees}deg)`;
  minute.style.transform = `translate(-50%, -100%) rotate(${minuteDegrees}deg)`;
  hour.style.transform = `translate(-50%, -100%) rotate(${hourDegrees}deg)`;
}

function rotateSecondsHand() {
  const now = new Date();
  secondDegrees = now.getSeconds() * 6;

  second.style.transition = "transform 0.05s cubic-bezier(0.1, 2.7, 0.58, 1)";

  if (secondDegrees === 0) {
    second.style.transition = "none";
  }

  second.style.transform = `translate(-50%, -100%) rotate(${secondDegrees}deg)`;
}

function rotateMinutesHand() {
  const now = new Date();
  minuteDegrees = now.getMinutes() * 6;

  minute.style.transition = "transform 0.05s cubic-bezier(0.1, 2.7, 0.58, 1)";

  if (minuteDegrees === 0) {
    minute.style.transition = "none";
  }

  minute.style.transform = `translate(-50%, -100%) rotate(${minuteDegrees}deg)`;
}

function rotateHoursHand() {
  if (hourDegrees >= 359.5) {
    hour.style.transition = "none";
    hourDegrees = 0;
  } else {
    hour.style.transition = "transform 0.05s linear";
    hourDegrees += 0.5;
  }

  hour.style.transform = `translate(-50%, -100%) rotate(${hourDegrees}deg)`;
}

function initDigitalClock() {
  const now = new Date();
  const currentHour =
    now.getHours() > 12
      ? String(now.getHours() - 12).padStart(2, "0")
      : String(now.getHours() === 0 ? 12 : now.getHours()).padStart(2, "0");
  const currentMinute = String(now.getMinutes()).padStart(2, "0");
  const isAM = now.getHours() < 12;

  digitalTime.innerHTML = `${currentHour}:${currentMinute} <span class="clock__am-pm">${
    isAM ? "AM" : "PM"
  }</span>`;
}

function initDate() {
  const currentDate = new Date();
  date.textContent = `${
    months[currentDate.getMonth()]
  } ${currentDate.getDate()}, ${days[currentDate.getDay()]}`;
}

function initTick() {
  setInterval(() => {
    rotateSecondsHand();
    rotateMinutesHand();
    initDigitalClock();
    initDate();
  }, 1000);
}

export function initClock() {
  displayInitialTime();
  initTick();
}
