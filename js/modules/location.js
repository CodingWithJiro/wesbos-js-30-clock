// * IMPORT MODULES
import { getUserData } from "./api.js";
import { getCountryData } from "./api.js";

// * LOCATION.JS SCRIPT
const location = document.querySelector(".clock__location");

async function showUserLocation() {
  const userData = await getUserData();
  location.innerHTML = `${userData.country_capital}, ${userData.country_name}`;
}

export function initLocation() {
  showUserLocation();
}
