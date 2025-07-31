const apiKey = 'bd76c79bc532cd965afade878cba3d21';  

const getWeatherBtn = document.getElementById('getWeatherBtn');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');

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

      weatherResult.innerHTML = `
        <h3>Weather in ${data.name}</h3>
        <p>Temperature: ${temp} °C</p>
        <p>Description: ${desc}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
      `;
    })
    .catch(err => {
      weatherResult.textContent = err.message;
    });
});