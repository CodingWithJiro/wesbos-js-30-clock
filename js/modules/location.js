// * IMPORT MODULES
import { getUserData } from "./api.js";
import { getCountryData } from "./api.js";

// * LOCATION.JS SCRIPT
const location = document.querySelector(".clock__location");

export async function showUserLocation(inputLocation = null) {
  if (!inputLocation) {
    const userData = await getUserData();

    location.innerHTML = `${userData.country_capital}, ${userData.country_name}`;
  }

  location.innerHTML = `${inputLocation[0]}, ${inputLocation[1]}`;
}

export function initLocation() {
  showUserLocation();
}
