const locationData = [
  { latitude: 17.385044, longitude: 78.486671 },
  { latitude: 17.385148, longitude: 78.486772 },
  { latitude: 17.385248, longitude: 78.486873 },
  { latitude: 17.385348, longitude: 78.486974 },
  { latitude: 17.385448, longitude: 78.487075 },
  { latitude: 17.385548, longitude: 78.487176 },
  { latitude: 17.38568, longitude: 78.487277 },
  { latitude: 17.385758, longitude: 78.487378 },
  { latitude: 17.385858, longitude: 78.487479 },
  { latitude: 17.385983, longitude: 78.48758 },
  { latitude: 17.386058, longitude: 78.487681 },
  { latitude: 17.386158, longitude: 78.487782 },
  { latitude: 17.386256, longitude: 78.487883 },
  { latitude: 17.386357, longitude: 78.487984 },
  { latitude: 17.386458, longitude: 78.488085 },
  { latitude: 17.386559, longitude: 78.488186 },
  { latitude: 17.38666, longitude: 78.488287 },
  { latitude: 17.386761, longitude: 78.488388 },
  { latitude: 17.386862, longitude: 78.488489 },
  { latitude: 17.386963, longitude: 78.48859 },
  { latitude: 17.387064, longitude: 78.488691 },
  { latitude: 17.387165, longitude: 78.488792 },
  { latitude: 17.387266, longitude: 78.488893 },
  { latitude: 17.387367, longitude: 78.488994 },
  { latitude: 17.387468, longitude: 78.489095 },
  { latitude: 17.387569, longitude: 78.489196 },
  { latitude: 17.38767, longitude: 78.489297 },
  { latitude: 17.387771, longitude: 78.489398 },
  { latitude: 17.387872, longitude: 78.489499 },
  { latitude: 17.387973, longitude: 78.4896 },
  { latitude: 17.388074, longitude: 78.489701 },
  { latitude: 17.388175, longitude: 78.489802 },
  { latitude: 17.388276, longitude: 78.489903 },
  { latitude: 17.388377, longitude: 78.490004 },
];

let map;
let marker;
let path = [];
let polyline;
let index = 0;
const delay = 1000; // Delay between movements (in milliseconds)

function initMap() {
  map = L.map("map").setView(
    [locationData[0].latitude, locationData[0].longitude],
    15
  );

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Create and add markers for start and end points
  L.marker([locationData[0].latitude, locationData[0].longitude]).addTo(map);
  L.marker([
    locationData[locationData.length - 1].latitude,
    locationData[locationData.length - 1].longitude,
  ]).addTo(map);

  // Draw a line connecting the start and end points
  L.polyline(
    [
      [locationData[0].latitude, locationData[0].longitude],
      [
        locationData[locationData.length - 1].latitude,
        locationData[locationData.length - 1].longitude,
      ],
    ],
    {
      color: "blue",
      weight: 3,
      opacity: 0.7,
    }
  ).addTo(map);

  // Add the moving marker and path
  marker = L.marker([locationData[0].latitude, locationData[0].longitude], {
    icon: L.icon({
      iconUrl: "/image/car.png",
      iconSize: [50, 50],
      iconAnchor: [25, 50],
    }),
  }).addTo(map);

  path.push([locationData[0].latitude, locationData[0].longitude]);
  polyline = L.polyline(path, {
    color: "red",
    weight: 2,
  }).addTo(map);
}

function moveMarker() {
  if (index < locationData.length) {
    const position = [
      locationData[index].latitude,
      locationData[index].longitude,
    ];
    marker.setLatLng(position);
    map.setView(position);

    path.push(position);
    polyline.setLatLngs(path);

    index++;
    setTimeout(moveMarker, delay);
  }
}

function startSimulation() {
  index = 0; // Reset index to start from the beginning
  path = []; // Clear the path
  polyline.setLatLngs(path); // Update polyline
  moveMarker(); // Start the marker movement
}

document
  .getElementById("startButton")
  .addEventListener("click", startSimulation);

window.onload = initMap;
