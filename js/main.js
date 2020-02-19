import locService from './services/loc-service.js';
import mapService from './services/map-service.js';
import weatherService from './services/weather-service.js';
import utilsService from './services/utils-service.js';

// weatherService.getForcast();

var coords = {
	lat: null,
	lng: null
}


window.onload = () => {
	mapService.initMap()
		.then(() => {
			let urlLat = +utilsService.getParameterByName('lat');
			let urlLng = +utilsService.getParameterByName('lng');
			if (urlLat && urlLng) {
				mapService.panTo(urlLat, urlLng);
				mapService.addMarker({
					lat: urlLat,
					lng: urlLng
				});
				coords.lat = urlLat;
				coords.lng = urlLng;
				renderWeather();
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
					renderWeather();
				});
		})
		.catch(err => console.log('INIT MAP ERROR', err));
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

document.querySelector('.copy-loc-btn').addEventListener('click', () => {
	let elHiddenTxt = document.querySelector('.hidden-url');
	let currUrl = window.location.href;
	let lockUrl = `${currUrl}?lat=${coords.lat}&lng=${coords.lng}`;
	console.log(lockUrl);
	elHiddenTxt.value = lockUrl;
	elHiddenTxt.select();
	document.execCommand('copy');
});



document.querySelector('.loc-search-btn').addEventListener('click', () => {
	let locSearch = document.querySelector('.location-text');
	locService.findLocation(locSearch.value).then(res => {
		coords.lat = res.lat;
		coords.lng = res.lng;
		renderWeather();
		locSearch.value = '';
	});
})


function renderWeather() {
	let weatherCoords = {
		lat: coords.lat,
		lng: coords.lng
	}
	weatherService.getForcast(weatherCoords).then(res => {
		let description = res.description.charAt(0).toUpperCase() + res.description.slice(1);
		let strHTML = `
			<p>Location:
				<p class="weather-res">${res.location}</p> 
			</p>
			<p>Weather Description: 
				<p class="weather-res">${description}</p>
			</p>
			<p>Current Temperature: <span class="weather-res">${res.temp}</span></p>
			<p>Min Temperature: <span class="weather-res">${res.tempMin}</span></p>
			<p>Max Temperature: <span class="weather-res">${res.tempMax}</span></p>
			<p>Wind Speed: <span class="weather-res">${res.windSpeed}</span></p>
			<p>Wind Speed: <span class="weather-res">${res.windDirection}</span></p>
		`;

		let elWeather = document.querySelector('.weather-container');
		elWeather.innerHTML = strHTML;
		renderLocation(res.location);
	})
}

function renderLocation(loc) {
	let elLocation = document.querySelector('.curr-loc>span');
	elLocation.innerText = loc;
}