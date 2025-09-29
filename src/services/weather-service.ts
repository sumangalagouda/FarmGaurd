/**
 * Mock service to fetch weather data.
 * In a real application, this would fetch data from a weather API.
 */

export interface WeatherAlert {
  title: string;
  description: string;
}

export interface CurrentWeather {
  temperature: number;
  condition: string;
  alert: WeatherAlert | null;
}

export interface Forecast {
    day: string;
    high: number;
    low: number;
    weather: "sunny" | "cloudy" | "rainy";
}

const allWeather = {
    'jos': {
        current: {
            temperature: 28,
            condition: "Sunny, light breeze",
            alert: {
                title: "Sudden Temp Drop",
                description: "5°C drop expected overnight. Protect young livestock.",
            },
        },
        forecast: [
          { day: "Mon", high: 30, low: 18, weather: "sunny" },
          { day: "Tue", high: 32, low: 19, weather: "sunny" },
          { day: "Wed", high: 28, low: 17, weather: "cloudy" },
          { day: "Thu", high: 26, low: 16, weather: "rainy" },
          { day: "Fri", high: 29, low: 18, weather: "cloudy" },
          { day: "Sat", high: 31, low: 20, weather: "sunny" },
          { day: "Sun", high: 33, low: 21, weather: "sunny" },
        ]
    },
    'lagos': {
        current: {
            temperature: 32,
            condition: "Humid and sunny",
            alert: null,
        },
        forecast: [
          { day: "Mon", high: 33, low: 25, weather: "sunny" },
          { day: "Tue", high: 34, low: 26, weather: "sunny" },
          { day: "Wed", high: 31, low: 24, weather: "rainy" },
          { day: "Thu", high: 32, low: 25, weather: "cloudy" },
          { day: "Fri", high: 33, low: 25, weather: "sunny" },
          { day: "Sat", high: 34, low: 26, weather: "sunny" },
          { day: "Sun", high: 33, low: 25, weather: "rainy" },
        ]
    },
    'default': {
        current: {
            temperature: 25,
            condition: "Partly cloudy",
            alert: null,
        },
        forecast: [
          { day: "Mon", high: 28, low: 18, weather: "cloudy" },
          { day: "Tue", high: 29, low: 19, weather: "cloudy" },
          { day: "Wed", high: 27, low: 17, weather: "rainy" },
          { day: "Thu", high: 26, low: 16, weather: "rainy" },
          { day: "Fri", high: 28, low: 18, weather: "sunny" },
          { day: "Sat", high: 30, low: 20, weather: "sunny" },
          { day: "Sun", high: 31, low: 21, weather: "sunny" },
        ]
    }
}


export async function getCurrentWeather(location: string): Promise<CurrentWeather> {
  console.log(`Fetching current weather for location: ${location}`);
  const locationKey = location.toLowerCase().split(',')[0].trim();
  const weatherData = allWeather[locationKey as keyof typeof allWeather] || allWeather.default;
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(weatherData.current);
    }, 300);
  });
}

export async function getWeeklyForecast(location: string): Promise<Forecast[]> {
  console.log(`Fetching weekly forecast for location: ${location}`);
  const locationKey = location.toLowerCase().split(',')[0].trim();
  const weatherData = allWeather[locationKey as keyof typeof allWeather] || allWeather.default;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(weatherData.forecast);
    }, 700);
  });
}
