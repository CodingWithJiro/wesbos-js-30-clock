//* CLOCK.JS SCRIPT
const hour = document.querySelector(".clock__hour");
const minute = document.querySelector(".clock__minute");
const second = document.querySelector(".clock__second");
const dateNow = new Date();
let secondDegrees = dateNow.getSeconds() * 6;

function rotateSecondsHand() {
  setInterval(() => {
    if (secondDegrees === 354) {
      second.style.transition = "none";
      secondDegrees = 0;
    } else {
      second.style.transition =
        "transform 0.05s cubic-bezier(0.1, 2.7, 0.58, 1)";
      secondDegrees += 6;
    }

    second.style.transform = `translate(-50%, -100%) rotate(${secondDegrees}deg)`;
  }, 1000);
}

export function initClock() {
  rotateSecondsHand();
}
