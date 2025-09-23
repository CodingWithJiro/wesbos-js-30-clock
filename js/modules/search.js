// * IMPORT MODULES
import { getCountryData } from "./api.js";

// * SEARCH.JS SCRIPT
const searchInput = document.querySelector(".search__input");
const searchButton = document.querySelector(".search__button");
const searchForm = document.querySelector(".search");

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

function initSearchForm() {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
  });
}

export async function initSearch() {
  await loadZones();
  loadSearchOptions();
  initSearchForm();
}
