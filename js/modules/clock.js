// * IMPORT MODULES
import { toZonedTime } from "https://esm.sh/date-fns-tz";

// * CLOCK.JS SCRIPT
const hour = document.querySelector(".clock__hour");
const minute = document.querySelector(".clock__minute");
const second = document.querySelector(".clock__second");
const digitalTime = document.querySelector(".clock__digital-time");
const date = document.querySelector(".clock__date");
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
let timer = null;
let inputTimeZone = null;

function displayInitialTime() {
  const now = new Date();
  const secondDegrees = now.getSeconds() * 6;
  const minuteDegrees = now.getMinutes() * 6;
  const hourDegrees = now.getHours() * 30 + now.getMinutes() * 0.5;

  second.style.transform = `translate(-50%, -100%) rotate(${secondDegrees}deg)`;
  minute.style.transform = `translate(-50%, -100%) rotate(${minuteDegrees}deg)`;
  hour.style.transform = `translate(-50%, -100%) rotate(${hourDegrees}deg)`;
}

function setRotation(clockHand, degrees, transition) {
  clockHand.style.transition = degrees === 0 ? "none" : transition;
  clockHand.style.transform = `translate(-50%, -100%) rotate(${degrees}deg)`;
}

function rotateSecondsHand(dateObject) {
  const secondDegrees = dateObject.getSeconds() * 6;
  setRotation(
    second,
    secondDegrees,
    "transform 0.05s cubic-bezier(0.1, 2.7, 0.58, 1)"
  );
}

function rotateMinutesHand(dateObject) {
  const minuteDegrees = dateObject.getMinutes() * 6;
  setRotation(
    minute,
    minuteDegrees,
    "transform 0.05s cubic-bezier(0.1, 2.7, 0.58, 1)"
  );
}

function rotateHoursHand(dateObject) {
  const hourDegrees =
    dateObject.getHours() * 30 + dateObject.getMinutes() * 0.5;
  setRotation(hour, hourDegrees, "transform 0.05s linear");
}

function initDigitalClock(dateObject) {
  const currentHour =
    dateObject.getHours() > 12
      ? String(dateObject.getHours() - 12).padStart(2, "0")
      : String(
          dateObject.getHours() === 0 ? 12 : dateObject.getHours()
        ).padStart(2, "0");
  const currentMinute = String(dateObject.getMinutes()).padStart(2, "0");
  const isAM = dateObject.getHours() < 12;

  digitalTime.innerHTML = `${currentHour}:${currentMinute} <span class="clock__am-pm">${
    isAM ? "AM" : "PM"
  }</span>`;
}

function initDate(dateObject) {
  date.textContent = `${
    months[dateObject.getMonth()]
  } ${dateObject.getDate()}, ${days[dateObject.getDay()]}`;
}

export function initTick(timeZone = null) {
  if (timer) {
    clearInterval(timer);
  }

  inputTimeZone = timeZone;

  timer = setInterval(() => {
    let now = new Date();

    if (inputTimeZone) {
      now = toZonedTime(new Date(), timeZone);
    }

    rotateSecondsHand(now);
    rotateMinutesHand(now);
    rotateHoursHand(now);
    initDigitalClock(now);
    initDate(now);
  }, 1000);
}

export function initClock() {
  displayInitialTime();
  initTick();
}
