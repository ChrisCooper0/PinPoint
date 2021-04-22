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
  "London Eye": {
    Lat: 51.5033,
    Lng: -0.1196,
  },
  "Trafalgar Square": {
    Lat: 51.508,
    Lng: -0.1281,
  },
};

// Displays random location (locationObj key) when START button is clicked
function updateUI() {
  const addLocation = document.getElementById("location");
  const button = document.getElementById("btn");
  const refreshBtn = document.getElementById("refreshBtn");

  button.addEventListener("click", () => {
    // Sets the random location to a variable
    let randomLocation = Object.keys(locationObj)[
      Math.floor(Math.random() * Object.keys(locationObj).length)
    ];
    addLocation.textContent = `${randomLocation}`;
    // Removes START button
    button.classList.add("display");

    // Displays TRY AGAIN button
    refreshBtn.classList.remove("display");
    // Refreshes page to display "START" button again when clicked
    refreshBtn.addEventListener("click", () => {
      location.reload();
      return false;
    });
  });
}

updateUI();

// Pop-up of clicked coordinates on map
let popup = L.popup();
function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(mymap);
  // Return coordinates of click on map
  let clickedCoordinates = e.latlng;
  let clickedLat = clickedCoordinates[Object.keys(clickedCoordinates)[0]];
  let clickedLng = clickedCoordinates[Object.keys(clickedCoordinates)[1]];

  //Change randomLat & randomLng
  let randomLat = clickedLat;
  let randomLng = clickedLng;

  // Checks if user has clicked the START button
  if (randomLat === undefined || randomLng === undefined) {
    alert("Please click the START button");
  }
  // Checks if both coordinates fully match
  else if (clickedLat === randomLat && clickedLng === randomLng) {
    alert("Winner! The coordinates match!");
  }
  // Checks if only the latitude matches
  else if (clickedLat === randomLat && clickedLng !== randomLng) {
    alert("The Latitude matches! Try again to match the Longitude!");
  } // Check if only the longitude matches
  else if (clickedLng === randomLng && clickedLat != randomLat) {
    alert("The Longitude matches! Try again to match the Latitude!");
  }
  // Checks if the latitude or longitude match to the nearest 2 decimal place
  else if (
    clickedLat.toFixed(2) === randomLat.toFixed(2) ||
    clickedLng.toFixed(2) === randomLng.toFixed(2)
  ) {
    alert("That was close, try again!");
  } // Else returns does not match
  else {
    alert("That was not close! Try again!");
  }
}
mymap.on("click", onMapClick);
