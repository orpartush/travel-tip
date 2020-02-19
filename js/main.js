console.log('Main!');

import locService from './services/loc-service.js';
import mapService from './services/map-service.js';
import weatherService from './services/weather-service.js';

weatherService.getForcast();

// let locs = locService.getLocs()
// 	.then(locsRes => locsRes[0]);
// console.log(locs);


window.onload = () => {
	mapService.initMap()
		.then(() => {
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
					// locService.getLocs()
					// 	.then(locsRes => {
					// 		let { lat, lng } = locsRes[0];
					// 		lat = latitude;
					// 		lng = longitude;
					// 	});
					// console.log(locs);
					// locs.lat = latitude;
					// locs.lng = longitude;
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
			let locs = locService.getLocs()
				.then(locsRes => locsRes[0]);
			console.log(locs);
			locs.lat = latitude;
			locs.lng = longitude;
			console.log(locs);
		}).catch(err => console.log('err!!!', err));
});

document.querySelector('.copy-loc').addEventListener('click', () => {
	//get the curr location's lat nad lng.
	locService.getLocs()
		.then(locsRes => {
			const { lat, lng } = locsRes[0];
			let currLocLink = `https://orpartush.github.io/travel-tip/?lat=${lat}&lng=${lng}`;
			console.log(currLocLink);
		});
	// console.log(locs);
	// locs.then(currLoc => {
	// 	console.log(currLoc)
	// 	let {
	// 		lat,
	// 		lng
	// 	} = currLoc;
	// 	let currLocLink = `https://orpartush.github.io/travel-tip/?lat=${lat}&lng=${lng}`;
	// 	console.log(currLocLink);
	// })
	// console.log(currUserPos);
	// .then()
	//add them to the clipboard like this: 
	// github.io/travelTip/index.html?***lat=3.14***&***lng=1.63***

});