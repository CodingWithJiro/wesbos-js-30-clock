// * IMPORT MODULES
import { getCountryData } from "./api.js";

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

function getInputDate(inputTimestamp, inputTimeZone) {
  const dateObject = new Date(inputTimestamp * 1000);
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: inputTimeZone,
    weekday: "long",
    month: "long",
    day: "numeric",
    minute: "2-digit",
    hour: "numeric",
    hour12: true,
  });
  const inputDate = formatter.formatToParts(dateObject);

  return inputDate;
}

async function handleSubmitSearchForm() {
  const { zones } = await getCountryData();
  const [capital, country] = getInputLocation();
  let currentTimestamp = 0;
  let timeZone = "";

  for (const { countryName, zoneName, timestamp } of zones) {
    if (countryName === country && zoneName.includes(capital)) {
      currentTimestamp = timestamp;
      timeZone = zoneName;
      break;
    }
  }

  return currentTimestamp;
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
