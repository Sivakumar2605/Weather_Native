// WeatherService.js
import axios from 'axios';

const API_KEY = 'fada576004bed628deb49faf8b8055a9'; // Replace with your OpenWeather API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeather = async (city) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric', // Celsius
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
