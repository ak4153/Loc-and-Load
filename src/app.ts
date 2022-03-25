import axios from 'axios';

//lets typescript know that the variable will be availbale from the index.html file
//install the googlemaps@types
// declare var google: any;

const form = <HTMLFormElement>document.querySelector('form');
const input = <HTMLInputElement>document.querySelector('input');

const privateAPI = 'YOURAPIHERE';

interface Geo {
  results: [{ geometry: { location: { lng: number; lat: number } } }];
  status: 'OK' | 'ZERO_RESULTS';
}

form.addEventListener('submit', (e: Event) => {
  e.preventDefault();
  const googleApiKey = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
    input.value
  )}&key=${privateAPI}`;
  axios
    .get<Geo>(googleApiKey)
    .then((res) => {
      if (res.data.status !== 'OK') {
        throw new Error('not ok');
      }
      const location = res.data.results[0].geometry.location;
      const map = new google.maps.Map(
        document.getElementById('map') as HTMLElement,
        {
          center: location,
          zoom: 15,
        }
      );
      new google.maps.Marker({
        position: location,
        map: map,
      });
      const div = document.createElement('div');
      const h1 = document.createElement('hi');
      h1.textContent = location.lat + ' ' + location.lng;
      div.insertAdjacentElement('afterbegin', h1);
    })
    .catch((err) => {
      console.log(err.message);
    });
});
