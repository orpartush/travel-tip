export default {
	getLocs: getLocs,
	getPosition: getPosition
}

var locs = [
	{
	lat: 11.22,
	lng: 22.11
	}
]

function getLocs() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(locs);
		}, 2000)
	});
}


function getPosition() {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	})
}


