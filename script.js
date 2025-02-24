// Initialize the map and set view to JSU
var map = L.map('map').setView([32.3000, -90.2100], 16);

// Add a modern map tile
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 20
}).addTo(map);

// Function to add markers with popups
function addMarker(coords, name, description, group) {
    L.marker(coords)
      .addTo(group)
      .bindPopup(`<b>${name}</b><br>${description}`);

    // Add label next to marker
    L.marker(coords, {
        icon: L.divIcon({
            className: 'marker-label',
            html: name,
            iconSize: [100, 30], 
            iconAnchor: [0, -15]
        })
    }).addTo(group);
}

// Create layer groups
var academicLayer = L.layerGroup();
var historicLayer = L.layerGroup();
var serviceLayer = L.layerGroup();

// Define walking path coordinates
var walkingPathCoords = [
    [32.2968, -90.2079], // Ayer Hall
    [32.2960, -90.2069], // Johnson Hall
    [32.2980, -90.2118], // Rose E. McCoy Auditorium
    [32.2976, -90.2088], // Gibbs Green Plaza
    [32.2975, -90.2098], // Divine 9
    [32.2972, -90.2014], // COFO Building
    [32.2972, -90.2027], // Mt Olive Cemetery
    [32.2989, -90.2108], // Health Center
    [32.2969, -90.2065], // Administration Tower
    [32.2980, -90.2063]  // Student Center
];

// Draw the walking path
var walkingPath = L.polyline(walkingPathCoords, {
    color: 'blue',
    weight: 4,
    opacity: 0.8,
    dashArray: '6, 6'
});

// Add markers for Academic Buildings
addMarker([32.2968, -90.2079], "Ayer Hall", "Oldest building on campus.", academicLayer);
addMarker([32.2960, -90.2069], "Johnson Hall", "Art gallery and academic building.", academicLayer);
addMarker([32.2980, -90.2118], "Rose E. McCoy Auditorium", "Cultural and performing arts center.", academicLayer);

// Add markers for Historic Locations
addMarker([32.2976, -90.2088], "Gibbs Green Plaza", "Site of the 1970 Jackson State shooting.", historicLayer);
addMarker([32.2972, -90.2014], "COFO Building", "Civil Rights movement headquarters.", historicLayer);
addMarker([32.2972, -90.2027], "Mt Olive Cemetery", "Historic African American cemetery.", historicLayer);

// Add markers for Services
addMarker([32.2989, -90.2108], "Health Center", "Student health services and wellness.", serviceLayer);
addMarker([32.2975, -90.2098], "Divine 9", "Greek life plaza honoring the Divine Nine.", historicLayer);
addMarker([32.2969, -90.2065], "Administration Tower", "Central administrative offices.", serviceLayer);
addMarker([32.2980, -90.2063], "Student Center", "Main hub for student activities and services.", serviceLayer);

// Add layers to map
var overlayLayers = {
    "Academic Buildings": academicLayer,
    "Historic Locations": historicLayer,
    "Services": serviceLayer,
    "Walking Path": walkingPath
};

L.control.layers(null, overlayLayers).addTo(map);

// Add all layers to the map by default
academicLayer.addTo(map);
historicLayer.addTo(map);
serviceLayer.addTo(map);
walkingPath.addTo(map);
