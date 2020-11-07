const mymap = L.map('mapid').setView([0, 0], 1);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYWdhcG9saTg5IiwiYSI6ImNraDgxZm8zazBmdTMycG5xb25yd3A4OXYifQ.YjWJqt1ETSJEt5G1mj5S4A',
}).addTo(mymap);

const marker = L.marker([0,0]).addTo(mymap);

 const xhr = new XMLHttpRequest();
 const select = document.getElementById('countrySelect');


 const getAllCountries = () => {
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

            select.addEventListener('change', showCountryInfo);
        }
        });

    xhr.addEventListener("error", e => {
        alert("Nie udało się nawiązać połączenia");
    });

    xhr.open("GET", "https://restcountries.eu/rest/v2/all?fields=iso2Code;name", true);
    xhr.send();
}

const showCountryInfo = (event) => {
    const countryName = event.target.value;
    const countryData = document.getElementById('countryData');
    const countryFlag = document.getElementById('countryFlag');

    xhr.addEventListener("load", e => {
        if (xhr.status === 200) {
            const json = JSON.parse(xhr.response)[0];
            console.log(json);

            countryData.innerHTML = `<h3 class="country-name">
            ${json.name}
        </h3>
        <div>
            Stolica: <strong>${json.capital}</strong>
        </div>
        <div>
            Region: <strong>${json.region}</strong>
        </div>
        <div>
            Podregion: <strong>${json.subregion}</strong>
        </div>
        <div>
            Liczba ludności: <strong>${json.population}</strong>
        </div>
        <div>
            Strefa czasowa: <strong>${json.timezones}</strong>
        </div>`
            
            countryFlag.setAttribute("src", json.flag);

            mymap.setView(json.latlng, 5);
            marker.setLatLng(json.latlng);
        }
        });

    xhr.addEventListener("error", e => {
        alert("Nie udało się nawiązać połączenia");
    });

    xhr.open("GET", "https://restcountries.eu/rest/v2/name/" + countryName, true);
    xhr.send();
    
}

getAllCountries();
