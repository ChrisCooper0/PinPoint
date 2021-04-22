// Initialise map and starting coordinates
const startingCoordinates = [51.509865, -0.118092];
var mymap = L.map("mapid").setView(startingCoordinates, 13);
L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/light-v9",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoiY2hyaXNjb29wZXIwIiwiYSI6ImNrbnNyYnpqNzJmaTQybnByeWd1YzZwZWUifQ._ShUttBF_X0kxq4UWE8NmA",
  }
).addTo(mymap);

// Location object wth names and Lat/Lng coordinates
let locationObj = {
  "London Bridge": {
    Lat: 51.5079,
    Lng: -0.0877,
  },
  //   "Harrods Department Store": {
  //     Lat: 333,
  //     Lng: 444,
  //   },
  //   "Marble Arch": {
  //     Lat: 555,
  //     Lng: 666,
  //   },
  //   "Downing Street": {
  //     Lat: 777,
  //     Lng: 888,
  //   },
  //   "Houses of Parliament": {
  //     Lat: 1234,
  //     Lng: 4567,
  //   },
  //   "New Scotland Yard": {
  //     Lat: 1234,
  //     Lng: 4567,
  //   },
  //   "Big Ben": {
  //     Lat: 1234,
  //     Lng: 4567,
  //   },
  //   "London Eye": {
  //     Lat: 1234,
  //     Lng: 4567,
  //   },
};

// Returns random locationObj key (location name)
let randomLocationObjKey = function (obj) {
  let keys = Object.keys(obj);
  return Object.keys(locationObj)[
    Math.floor(Math.random() * Object.keys(locationObj).length)
  ];
};

// Returns random locationObj value (location coordinates)
let randomLocationObjValue = function (obj) {
  let keys = Object.keys(obj);
  return locationObj[
    Object.keys(locationObj)[
      Math.floor(Math.random() * Object.keys(locationObj).length)
    ]
  ];
};

// Displays random locationObj key when button is clicked
function updateUI() {
  const addLocation = document.getElementById("location");
  const button = document.getElementById("btn");

  button.addEventListener("click", () => {
    addLocation.textContent = `${randomLocationObjKey(
      location
    )} - Coordinates: `;
  });
}
updateUI();

// Popup of clicked coordinates on map
let popup = L.popup();
function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(mymap);
  // Return and split coordinates of click on map
  let clickedCoordinates = e.latlng;
  let clickedLat = clickedCoordinates[Object.keys(clickedCoordinates)[0]];
  let clickedLng = clickedCoordinates[Object.keys(clickedCoordinates)[1]];

  //Change randomLat & randomLng to match the locationObj
  let randomLat = clickedLat;
  let randomLng = clickedLng;

  // Check if clickedCoordinates and randomLocationObjValue match lat && lng
  if (clickedLat === randomLat && clickedLng === randomLng) {
    console.log("Winner! The coordinates match!");
    // alert("Winner! The coordinates match!");
  } else if (clickedLat === randomLat && clickedLng !== randomLng) {
    console.log("The Latitude matches! Try again to match the Longitude!");
  } else if (clickedLng === randomLng && clickedLat != randomLat) {
    console.log("The Longitude matches! Try again to match the Latitude!");
  } else if (
    clickedLat.toFixed(2) === randomLat.toFixed(2) ||
    clickedLng.toFixed(2) === randomLng.toFixed(2)
  ) {
    console.log("That was close, try again!");
  } else {
    console.log("That was not even close! Try again!");
  }
}
mymap.on("click", onMapClick);
