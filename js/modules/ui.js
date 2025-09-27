// * UI.JS SCRIPT
const timeElement = document.querySelector(".clock__digital-time");
const dateElement = document.querySelector(".clock__date");

export function updateTimeAndDateAttributes(dateObject) {
  const hours = String(dateObject.getHours()).padStart(2, "0");
  const minutes = String(dateObject.getMinutes()).padStart(2, "0");
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const date = String(dateObject.getDate()).padStart(2, "0");

  timeElement.setAttribute("datetime", `${hours}:${minutes}`);
  dateElement.setAttribute("datetime", `${year}-${month}-${date}`);
}
