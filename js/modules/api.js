//* API.JS SCRIPT

async function getUserData() {
  try {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return null;
  }
}

export function initApi() {}
