export default {
	getForcast
}

function getForcast(coords) {
	return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&appid=bb92276d35d1215a8ad73c28452671a0`)
		.then(res => {
			return {
				location: `${res.data.name} ${res.data.sys.country}`, 
				temp: kelvinToCelsius(res.data.main.temp).toFixed(1),
				feelsLike: res.data.main.feels_like,
				tempMin: kelvinToCelsius(res.data.main.temp_min).toFixed(1),
				tempMax: kelvinToCelsius(res.data.main.temp_max).toFixed(1),
				humidity: res.data.main.humidity,
				description: res.data.weather[0].description,
				windSpeed: res.data.wind.speed,
				windDirection: res.data.wind.deg,
			}
		})
}

function kelvinToCelsius(degInKelvin) {
	return (degInKelvin - 273.15);
}