// * IMPORT MODULES
import { getUserData } from "./api.js";

// * LOCATION.JS SCRIPT
const location = document.querySelector(".clock__location");

export async function showUserLocation(inputLocation = null) {
  if (!inputLocation) {
    const userData = await getUserData();

    setTimeout(() => {
      location.innerHTML = `${userData.country_capital}, ${userData.country_name}`;
    }, 500);
  } else {
    setTimeout(() => {
      location.innerHTML = `${inputLocation[0]}, ${inputLocation[1]}`;
    }, 500);
  }
}

export function initLocation() {
  showUserLocation();
}
