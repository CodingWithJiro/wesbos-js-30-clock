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

export async function initSearch() {
  await loadZones();
}
