export default {
    getForcast,
}


function getForcast() {
    // if (localStorage.currencies) {
    //     var gCurrencies = JSON.parse(localStorage.currencies)
    // }
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=32&lon=34&appid=bb92276d35d1215a8ad73c28452671a0`)
        .then(res => {
            console.log(res.data.main)
            console.log(kelvinToCelsius(res.data.main.temp).toFixed(1))
            console.log(kelvinToFahrenheit(res.data.main.temp).toFixed(1))
                // localStorage.currencies = JSON.stringify(currencies);
                // onSuccess(currencies)
        })
}


function kelvinToCelsius(degInKelvin) {
    return (degInKelvin - 273.15);
}


function kelvinToFahrenheit(degInKelvin) {
    return (degInKelvin * (9 / 5) - 459.67);
}