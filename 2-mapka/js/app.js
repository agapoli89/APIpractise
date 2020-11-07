/* const map = L.map('mapid').setView([51.919437, 19.145136], 5);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoia2FydG9mZWxlazAwNyIsImEiOiJjanRpazhyM2owbHUwNDluem40Ynljdm5hIn0.kYoJkNni5ksRyA0gy1yV7A'
}).addTo(map); */

/*----------------------------------------------------
 !!! powyzszego nie ruszaj, to mapa wstawiona za pomocą leafletjs
 wzorowana na tutorialu ze strony: https://leafletjs.com/examples/quick-start/
 Skrypt pisz poniżej
 ----------------------------------------------------*/


 const xhr = new XMLHttpRequest();
 const select = document.getElementById('countrySelect');

 xhr.addEventListener("load", e => {
     if (xhr.status === 200) {
         const json = JSON.parse(xhr.response);

         json.forEach(country => {
             const countryOption = document.createElement('option');
             countryOption.setAttribute('value', country.name);
             countryOption.textContent = country.name;
             select.appendChild(countryOption);            
         });
         select.removeAttribute('disabled');
     }
    });

 xhr.addEventListener("error", e => {
     alert("Nie udało się nawiązać połączenia");
 });

 xhr.open("GET", "https://restcountries.eu/rest/v2/all?fields=iso2Code;name", true);
 xhr.send();
 
