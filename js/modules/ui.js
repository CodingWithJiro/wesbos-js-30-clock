// * UI.JS SCRIPT
const timeElement = document.querySelector(".clock__digital-time");
const dateElement = document.querySelector(".clock__date");
const locationElement = document.querySelector(".clock__location");

export function updateTimeAndDateAttributes(dateObject) {
  const hours = String(dateObject.getHours()).padStart(2, "0");
  const minutes = String(dateObject.getMinutes()).padStart(2, "0");
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const date = String(dateObject.getDate()).padStart(2, "0");

  timeElement.setAttribute("datetime", `${hours}:${minutes}`);
  dateElement.setAttribute("datetime", `${year}-${month}-${date}`);
}

function resetElementAnimation(...elements) {
  elements.forEach((element) => {
    element.addEventListener("animationend", () => {
      void element.offSetWidth;
      element.classList.remove("fade-out-fade-in");
    });
  });
}

export function addFadeOutFadeInValues() {
  timeElement.classList.add("fade-out-fade-in");
  dateElement.classList.add("fade-out-fade-in");
  locationElement.classList.add("fade-out-fade-in");

  resetElementAnimation(timeElement, dateElement, locationElement);
}
