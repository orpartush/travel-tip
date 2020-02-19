import mapService from './map-service.js';

export default {
    getPosition: getPosition,
    findLocation: findLocation
}

function getPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

findLocation('new york')

function findLocation(locStr) {
    //vova's key
    const API_KEY = 'AIzaSyCWZ8SVphkFIwIS-JWNMRklKJvHjGNQH3I';
    let adjustedStr = locStr.replace(' ', '+');

    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${adjustedStr}&key=${API_KEY}`)
        .then(res => {
            let lat = res.data.results[0].geometry.location.lat;
            let lng = res.data.results[0].geometry.location.lng;
            mapService.panTo(lat, lng)
            mapService.addMarker({ lat, lng });
        })
}