//* CLOCK.JS SCRIPT
const hour = document.querySelector(".clock__hour");
const minute = document.querySelector(".clock__minute");
const second = document.querySelector(".clock__second");
const dateNow = new Date();
let secondDegrees = dateNow.getSeconds() * 6;
let minuteDegrees = dateNow.getMinutes() * 6;
let hourDegrees = dateNow.getHours() * 30 + minuteDegrees * 0.5;

function displayInitialTime() {
  second.style.transform = `translate(-50%, -100%) rotate(${secondDegrees}deg)`;
  minute.style.transform = `translate(-50%, -100%) rotate(${minuteDegrees}deg)`;
  hour.style.transform = `translate(-50%, -100%) rotate(${hourDegrees}deg)`;
}

function rotateSecondsHand() {
  setInterval(() => {
    if (secondDegrees === 354) {
      second.style.transition = "none";
      secondDegrees = 0;
      rotateMinutesHand();
    } else {
      second.style.transition =
        "transform 0.05s cubic-bezier(0.1, 2.7, 0.58, 1)";
      secondDegrees += 6;
    }

    second.style.transform = `translate(-50%, -100%) rotate(${secondDegrees}deg)`;
  }, 1000);
}

function rotateMinutesHand() {
  if (minuteDegrees === 354) {
    minute.style.transition = "none";
    minuteDegrees = 0;
  } else {
    minute.style.transition = "transform 0.05s cubic-bezier(0.1, 2.7, 0.58, 1)";
    minuteDegrees += 6;
  }

  minute.style.transform = `translate(-50%, -100%) rotate(${minuteDegrees}deg)`;
}

export function initClock() {
  displayInitialTime();
  rotateSecondsHand();
}
