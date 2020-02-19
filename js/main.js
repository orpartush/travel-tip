console.log('Main!');

import locService from './services/loc-service.js';
import mapService from './services/map-service.js';
// import weatherService from './services/weather-service';


locService.getLocs()
	.then(locs => console.log('locs', locs))

window.onload = () => {
	mapService.initMap()
		.then(() => {

			mapService.addMarker({
				lat: 32.0749831,
				lng: 34.9120554
			});
		})
		.catch(console.log('INIT MAP ERROR'));

	locService.getPosition()
		.then(pos => {
			// 	mapService.panTo({
			// 		lat: pos.coords.latitude,
			// 		lng: pos.coords.longitude
			// 	});
			console.log('User position is:', pos.coords);
		})
		.catch(err => {
			console.log('err!!!', err);
		})
}

document.querySelector('.btn').addEventListener('click', (ev) => {
	console.log('Aha!', ev.target);
	locService.getPosition()
		.then(userPos => mapService.panTo(
			userPos.coords.latitude,
			userPos.coords.longitude
		));
	// mapService.panTo(35.6895, 139.6917);
})