// * IMPORT MODULES
import { getCountryData } from "./api.js";
import { toZonedTime } from "https://esm.sh/date-fns-tz";

// * SEARCH.JS SCRIPT
const searchInput = document.querySelector(".search__input");
const searchButton = document.querySelector(".search__button");
const searchForm = document.querySelector(".search");

const cachedZones = [];
const capitalCountryArray = [];

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

    capitalCountryArray.push(`${capital}, ${country}`);
    optionsHTMLText += `<option value="${capital}, ${country}" />`;
  }

  countryList.innerHTML = optionsHTMLText;
}

function isValidLocation(inputValue) {
  return capitalCountryArray.includes(inputValue);
}

function getInputLocation() {
  const input = searchInput.value.trim();

  if (isValidLocation(input)) {
    const inputArray = input.split(", ");
    const [capital, country] = inputArray;

    return [capital, country];
  } else {
    console.error("Please input a valid location");
  }
}

async function getInputTimeZone() {
  const { zones } = await getCountryData();
  const [capital, country] = getInputLocation();
  let timeZone = "";

  for (const { countryName, zoneName } of zones) {
    if (
      countryName === country &&
      zoneName.includes(capital.replace(" ", "_"))
    ) {
      timeZone = zoneName;
      break;
    }
  }

  return timeZone;
}

async function handleSubmitSearchForm() {
  const timeZone = await getInputTimeZone();
}

function initSearchForm() {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleSubmitSearchForm();
  });
}

export async function initSearch() {
  await loadZones();
  loadSearchOptions();
  initSearchForm();
}
