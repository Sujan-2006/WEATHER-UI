const apiKey = 'bd76c79bc532cd965afade878cba3d21';  

const getWeatherBtn = document.getElementById('getWeatherBtn');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');

const weatherEmojis = {
  Clear: '☀️',
  Clouds: '☁️',
  Rain: '🌧️',
  Drizzle: '🌦️',
  Thunderstorm: '⛈️',
  Snow: '❄️',
  Mist: '🌫️',
  Smoke: '💨',
  Haze: '🌫️',
  Dust: '🌪️',
  Fog: '🌫️',
  Sand: '🏜️',
  Ash: '🌋',
  Squall: '💨',
  Tornado: '🌪️'
};


function convertUnixTime(unixTime, timezone) {
  const date = new Date((unixTime + timezone) * 1000);
  return date.toUTCString().slice(-12, -4); 
}

getWeatherBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (!city) {
    alert('Please enter a city name');
    return;
  }
  
  weatherResult.textContent = 'Loading...';

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => {
      const temp = data.main.temp;
      const desc = data.weather[0].description;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const pressure = data.main.pressure;
      const visibility = data.visibility; 
      const sunrise = data.sys.sunrise;
      const sunset = data.sys.sunset;
      const timezone = data.timezone; 
      const weatherMain = data.weather[0].main;

      
      const emoji = weatherEmojis[weatherMain] || '🌈';

      weatherResult.innerHTML = `
        <h3>Weather in ${data.name} ${emoji}</h3>
        <p><strong>Temperature:</strong> ${temp} °C</p>
        <p><strong>Description:</strong> ${desc}</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Pressure:</strong> ${pressure} hPa</p>
        <p><strong>Visibility:</strong> ${visibility / 1000} km</p>
        <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
        <p><strong>Sunrise:</strong> ${convertUnixTime(sunrise, timezone)} (local time)</p>
        <p><strong>Sunset:</strong> ${convertUnixTime(sunset, timezone)} (local time)</p>
      `;
    })
    .catch(err => {
      weatherResult.textContent = err.message;
    });
});