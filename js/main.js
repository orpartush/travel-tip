import locService from './services/loc-service.js';
import mapService from './services/map-service.js';
import weatherService from './services/weather-service.js';

// weatherService.getForcast();

let coords = { lat: 67, lng: -50 }

// locService.getLocs(coords)
//     .then(locs => console.log('locs', locs))

console.log(weatherService.getForcast(coords))

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
})

renderWeather()

function renderWeather() {
    let coords = { lat: 67, lng: -50 }
    weatherService.getForcast(coords).then(res => {

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