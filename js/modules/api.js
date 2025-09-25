// * API.JS SCRIPT
export async function getUserData() {
  try {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return null;
  }
}

export async function getCountryData() {
  try {
    const response = await fetch(
      "https://api.timezonedb.com/v2.1/list-time-zone?key=BERT7APVT6E5&format=json"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch country data:", error);
    return {};
  }
}
