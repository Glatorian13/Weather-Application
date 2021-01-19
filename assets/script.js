const ocdKey = "b0ef02e3d61149c4b983c959417f6f13"
const owmKey = "5d73f4124fe6b71593f1c8bc0c5a7f03"

function buildQueryURL() {
    var searchTerm = $("#search-input")
        .val()
        .trim()
        .split(' ')
        .join('+');
    var queryURL1 = "https://api.opencagedata.com/geocode/v1/geojson?limit=1&no_annotations=1&q=" + searchTerm + "&key=" + ocdKey + "&jsonp=logResults";

    function logResults(json) {
    console.log(json);
    }
    $.ajax({
        url: queryURL1,
        dataType: "jsonp"
    });

   // var locate = JSON.parse(queryURL1.features);

    console.log(queryURL1.features);

   // var lat = locate.features[0].geometry.coordinates[0];
   // console.log(lat);
   // var lng = locate.features[0].geometry.coordinates[1];
  //  console.log(lng);


   // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}


};

// .on("click function") for search button
$("#search-btn").on("click", function (event) {
    event.preventDefault();
    //clear();
    var queryURL1 = buildQueryURL();
    $.ajax({
        url: queryURL1,
        method: "GET"
    }).then(updatePage);
});