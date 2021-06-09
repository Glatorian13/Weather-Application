const ocdKey = "b0ef02e3d61149c4b983c959417f6f13"
const owmKey = "5d73f4124fe6b71593f1c8bc0c5a7f03"
const searchIn = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-btn');
const cityEl = document.querySelector('#cityName');
const cityArr = [];

const formFunc = function(event) {
    const selCity = searchIn
    .value
    .trim()
    .tolowerCase()
    .split(' ')
    .join(' ');

    if (selCity) {
        getLocation(selCity);
        searchIn.value = '';
    } else {
        alert('Enter a valid city.');
    };
};

//get Location using open cage geocacheing
const getLocation = function(city) {
    const oCD = queryURL1 = `https://api.opencagedata.com/geocode/v1/geojson?limit=1&no_annotations=1&q=${searchTerm}&key=${ocdKey}&jsonp=logResults`;

    fetch(queryURL1).then(function(res) {
        if (res.ok) {
            res.json().then(function(data) {
                const lon = data.features[0].geometry.coordinates[1];
                const lat = data.features[0].geometry.coordinates[0];
                getForecast(city, lon, lat);

                //list funtion for later?
               // if document.querySelector('')

               saveCity(city);
               loadCities();
            });
        } else {
            alert(`Error: ${response.status}`)
        }
    })
    .catch(function(error) {
        alert('Error loading weather.');
    })
}

const getForecast = function(city, lon, lat) {
    const queryURL2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly,alerts&appid=${owmKey}`;
    fetch(queryURL2).then(function(res) {
        if (res.ok) {
            res.json().then(function(data) {
                cityEl.textContent = `${city} (${moment().format("M/D/YYYY")})`;
                console.log(data)
                nowForecast(data);
                fiveDayForecast(data);
            });
        }
    })
}

const dispTemp = function(el, temperature) {
    const tempEl = document.querySelector(el);
    const elText = Math.round(temperature);
    tempEl.textContent = elText;
}

// function buildQueryURL() {
//     // var searchTerm = $("#search-input")
//     var searchTerm = "texas".value().trim()
//         //.value()
//         .split(' ')
//         .join('+');
//     var queryURL1 = "https://api.opencagedata.com/geocode/v1/geojson?limit=1&no_annotations=1&q=" + searchTerm + "&key=" + ocdKey + "&jsonp=logResults";

//     function logResults(json) {
//     console.log(json);
//     }
//     $.ajax({
//         url: queryURL1,
//         dataType: "jsonp"
//     });

//    // var locate = JSON.parse(queryURL1.features);

//     console.log(queryURL1.features);

//    // var lat = locate.features[0].geometry.coordinates[0];
//    // console.log(lat);
//    // var lng = locate.features[0].geometry.coordinates[1];
//   //  console.log(lng);


//    // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}


// };

// .on("click function") for search button
// $("#search-btn").on("click", function (event) {
//     event.preventDefault();
//     //clear();
//     var queryURL1 = buildQueryURL();
//     $.ajax({
//         url: queryURL1,
//         method: "GET"
//     }).then(updatePage);
// });