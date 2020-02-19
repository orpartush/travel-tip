import locService from './services/loc-service.js';
import mapService from './services/map-service.js';
import weatherService from './services/weather-service.js';
import utilsService from './services/utils-service.js';

// weatherService.getForcast();

var coords = {
	lat: null,
	lng: null
}

console.log(weatherService.getForcast(coords))

window.onload = () => {
	mapService.initMap()
		.then(() => {
			let urlLat = utilsService.getParameterByName('lat');
			let urlLng = utilsService.getParameterByName('lng');
			if (urlLat && urlLng) {
				console.log(+urlLat, +urlLng);
				mapService.panTo(+urlLat, +urlLng);
				mapService.addMarker({
					lat: +urlLat,
					lng: +urlLng
				});
				coords.lat = +urlLat;
				coords.lng = +urlLng;
				return;
			}
			//goes to the user location and marking it
			locService.getPosition()
				.then(userPos => {
					const {
						latitude,
						longitude
					} = userPos.coords;
					mapService.panTo(latitude, longitude);
					mapService.addMarker({
						lat: latitude,
						lng: longitude
					});
					coords.lat = latitude;
					coords.lng = longitude;
					// console.log(coords);
				});
		})
		.catch(console.log('INIT MAP ERROR'));
}

//on My Location btn
document.querySelector('.my-loc-btn').addEventListener('click', () => {
	locService.getPosition()
		.then(userPos => {
			const {
				latitude,
				longitude
			} = userPos.coords;
			mapService.panTo(latitude, longitude);
			mapService.addMarker({
				lat: latitude,
				lng: longitude
			});
			coords.lat = latitude;
			coords.lng = longitude;
		}).catch(err => console.log('err!!!', err));
});

document.querySelector('.copy-loc').addEventListener('click', () => {
	//get the curr location's lat nad lng.
	// http://127.0.0.1:5501/index.html?lat=34.0929792&lng=36.8069888
	let elHiddenTxt = document.querySelector('.hidden-url');
	let currLocLink = `http://127.0.0.1:5501/index.html?lat=${coords.lat}&lng=${coords.lng}`;
	elHiddenTxt.value = currLocLink;
	console.log(currLocLink);
	elHiddenTxt.select();
	// Copy its contents
	document.execCommand('copy');
});

renderWeather()

function renderWeather() {
	let weatherCoords = {
		lat: 67,
		lng: -50
	}
	weatherService.getForcast(weatherCoords).then(res => {

		let strHTML = `<p>location:TBD</p>
         <p>weather description:${res.description}</p>
         <p>current temperature:${res.temp}</p>
         <p>min temperature:${res.tempMin}</p>
         <p>max temperature:${res.tempMax}</p>
         <p>wind speed:${res.windSpeed}</p>
         <p>wind speed:${res.windDirection}</p>`

        let elWeather = document.querySelector('.weather-container');
        elWeather.innerHTML = strHTML;
    })
}

document.querySelector('.loc-search-btn').addEventListener('click', () => {
    let locationTxt = document.querySelector('.location-text').value;
    let x = locService.findLocation(locationTxt).then();
})
