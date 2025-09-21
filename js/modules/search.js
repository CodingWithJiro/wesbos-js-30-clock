// * IMPORT MODULES
import { getCountryData } from "./api.js";

// * SEARCH.JS SCRIPT
const cachedZones = [];

async function loadZones() {
  const { zones } = await getCountryData();

  for (const { countryName, zoneName } of zones) {
    cachedZones.push({ countryName: countryName, zoneName: zoneName });
  }
}

function loadSearchOptions() {
  const countryList = document.getElementById("country-list");
  let optionsHTMLText = "";

  for (const zone of cachedZones) {
    const country = zone.countryName;
    const capitalArray = zone.zoneName.split("/");
    const capital = capitalArray.at(-1).replaceAll("_", " ");

    optionsHTMLText += `<option value="${capital}, ${country}" />`;
  }

  countryList.innerHTML = optionsHTMLText;
}

export async function initSearch() {
  await loadZones();
  loadSearchOptions();
}
