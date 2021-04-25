// Initialise map and starting coordinates
let startingCoordinates = [51.509865, -0.118092];
let mymap = L.map("mapid").setView(startingCoordinates, 13);

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

// Toggle dark/light theme
let checkbox = document.querySelector("input[name=theme]");
let button = document.getElementById("btn");
let refreshBtn = document.getElementById("refreshBtn");

checkbox.addEventListener("change", function () {
  if (this.checked) {
    transition();
    document.documentElement.setAttribute("data-theme", "dark");
    button.classList.remove("buttonlight");
    refreshBtn.classList.remove("buttonlight");
    button.classList.add("buttondark");
    refreshBtn.classList.add("buttondark");

    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        id: "mapbox/dark-v9",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoiY2hyaXNjb29wZXIwIiwiYSI6ImNrbnNyYnpqNzJmaTQybnByeWd1YzZwZWUifQ._ShUttBF_X0kxq4UWE8NmA",
      }
    ).addTo(mymap);
  } else {
    transition();
    document.documentElement.setAttribute("data-theme", "light");
    button.classList.remove("buttondark");
    refreshBtn.classList.remove("buttondark");
    button.classList.add("buttonlight");
    refreshBtn.classList.add("buttonlight");

    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        id: "mapbox/light-v9",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoiY2hyaXNjb29wZXIwIiwiYSI6ImNrbnNyYnpqNzJmaTQybnByeWd1YzZwZWUifQ._ShUttBF_X0kxq4UWE8NmA",
      }
    ).addTo(mymap);
  }
});

let transition = () => {
  document.documentElement.classList.add("transition");
  window.setTimeout(() => {
    document.documentElement.classList.remove("transition");
  }, 1000);
};

// Location array with Names and Lat/Lng coordinates
let locationArr = [
  {
    Name: "London Bridge",
    Lat: 51.5079,
    Lng: -0.0877,
  },
  {
    Name: "London Eye",
    Lat: 51.5033,
    Lng: -0.1196,
  },
  {
    Name: "Trafalgur Square",
    Lat: 51.508,
    Lng: -0.1281,
  },
  {
    Name: "Big Ben",
    Lat: 51.5007,
    Lng: -0.1246,
  },
  {
    Name: "Buckingham Palace",
    Lat: 51.5014,
    Lng: -0.1419,
  },
  {
    Name: "St Paul's Cathedral",
    Lat: 51.5138,
    Lng: -0.0984,
  },
  {
    Name: "Westminster Palace",
    Lat: 51.4995,
    Lng: -0.1248,
  },
];

// Displays random location (locationObj key) when START button is clicked
function updateUI() {
  const addLocation = document.getElementById("location");
  const addCoordinates = document.getElementById("coordinates");
  const button = document.getElementById("btn");
  const refreshBtn = document.getElementById("refreshBtn");

  button.addEventListener("click", () => {
    // Get random number from array length
    let randomNumber = Math.floor(Math.random() * locationArr.length);

    // Set random location name to variable
    let randomLocation = locationArr[randomNumber].Name;

    // Set and store randomLat/Lng to 4 decimal places
    let randomLat4DP = locationArr[randomNumber].Lat.toFixed(4);
    let randomLng4DP = locationArr[randomNumber].Lng.toFixed(4);

    // Set and store randomLat/Lng to 3 decimal places
    let randomLat3DP = locationArr[randomNumber].Lat.toFixed(3);
    let randomLng3DP = locationArr[randomNumber].Lng.toFixed(3);

    // Set and store randomLat/Lng to 2 decimal places
    let randomLat2DP = locationArr[randomNumber].Lat.toFixed(2);
    let randomLng2DP = locationArr[randomNumber].Lng.toFixed(2);

    // Set and store randomLat/Lng to 1 decimal place
    let randomLat1DP = locationArr[randomNumber].Lat.toFixed(1);
    let randomLng1DP = locationArr[randomNumber].Lng.toFixed(1);

    // Display random location name
    addLocation.textContent = `${randomLocation}`;

    // Display random location coordinates
    addCoordinates.textContent = `${randomLat3DP}, ${randomLng3DP}`;

    // Removes START button
    button.classList.add("display");

    // Displays TRY AGAIN button
    refreshBtn.classList.remove("display");

    // Refreshes page to display START button
    refreshBtn.addEventListener("click", () => {
      location.reload();
      return false;
    });

    // Pop-up of clicked coordinates on map
    let popup = L.popup();
    function onMapClick(e) {
      // Return coordinates of click on map
      let clickedCoordinates = e.latlng;
      let clickedLat = clickedCoordinates[Object.keys(clickedCoordinates)[0]];
      let clickedLng = clickedCoordinates[Object.keys(clickedCoordinates)[1]];

      // Displays popup of coordinates clicked on map
      popup
        .setLatLng(e.latlng)
        .setContent(
          `You clicked the map at ${clickedLat.toFixed(
            3
          )}, ${clickedLng.toFixed(3)}`
        )
        .openOn(mymap);

      if (
        clickedLat.toFixed(4) === randomLat4DP &&
        clickedLng.toFixed(4) === randomLng4DP
      ) {
        alert("Winner! The coordinates match to four decimal places!");
      }
      // Checks if both coordinates match to 3 decimal places
      else if (
        clickedLat.toFixed(3) === randomLat3DP &&
        clickedLng.toFixed(3) === randomLng3DP
      ) {
        alert("Winner! The coordinates match to three decimal places!");
      }
      // Checks if the latitude or longitude match to 2 decimal places
      else if (
        clickedLat.toFixed(2) === randomLat2DP ||
        clickedLng.toFixed(2) === randomLng2DP
      ) {
        alert("Close! The coordinates match to two decimal places!");
      }
      // Checks if the latitude or longitude match to 1 decimal place
      else if (
        clickedLat.toFixed(1) === randomLat1DP ||
        clickedLng.toFixed(1) === randomLng1DP
      ) {
        alert("Try again!");
      }
      // Else returns does not match
      else {
        alert("Try again!");
      }
    }
    mymap.on("click", onMapClick);
  });
}

updateUI();
