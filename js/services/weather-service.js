export default {
    getForcast
}

function getForcast(coords) {
    // console.log(coords)
    // if (localStorage.currencies) {
    //     var gCurrencies = JSON.parse(localStorage.currencies)
    // }
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&appid=bb92276d35d1215a8ad73c28452671a0`)
        .then(res => {
            return {
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

function kelvinToFahrenheit(degInKelvin) {
    return (degInKelvin * (9 / 5) - 459.67);
}