let earthquakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(earthquakeUrl, function(data) {
    console.log(data);
    function getStyle(feature) {
        return {
          opacity: 1,
          fillOpacity: 1,
          fillColor: circleColor(feature.properties.mag),
          color: "#000000",
          radius: circleSize(feature.properties.mag),
          stroke: true,
          weight: 0.5
        };
      }
      function circleColor(magnitude) {
          if (magnitude > 5) {
            return "#ea2c2c";
          }
          else if (magnitude > 4){
            return "#ea822c";
          }
          else if (magnitude > 3){
            return "#ee9c00";
          }
          else if (magnitude > 2){
            return "#eecc00";
          }
          else if (magnitude > 1){
            return "#d4ee00";
          }
          else 
            return "#98ee00";
    }
    
      function circleSize(magnitude) {
            return magnitude * 3;
      }
      
      L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng);
        },
        style: getStyle,
        onEachFeature: function(feature, layer) {
          layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }
    
      }).addTo(earthquakes);
    
      earthquakes.addTo(map);
    
    
    });

  
let lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

let darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

let streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [lightMap, darkmap, streetmap]
  });

let baseMaps = {
    Light: lightMap,
    Night: darkmap,
    Street: streetmap
}
let earthquakes = new L.LayerGroup();

let overlayMaps = {
    "Earthquakes": earthquakes
}

L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);