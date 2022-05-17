// Global variables
let map;
let lat = 0;
let lon = 0;
let zl = 3;

// global variables
let markers = L.featureGroup();
let jsondata;

// initialize
$( document ).ready(function() {
    createMap(lat,lon,zl);
    getJSON();
});

// create the map
function createMap(lat,lon,zl){
	map = L.map('map').setView([lat,lon], zl);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
}

function getJSON(){
	$.getJSON('https://data.lacity.org/resource/2nrs-mtv8.json?$order=date_rptd%20desc',function(data){
		console.log(data)
		jsondata = data;
		mapJSON()
	})
}

function mapJSON(race) {

    // clear layers in case you are calling this function more than once
    markers.clearLayers();

    // circle options
	let circleOptions = {
		radius: 5,
		weight: 1,
		color: 'white',
		fillColor: 'dodgerblue',
		fillOpacity: 1
	}

    jsondata.forEach(function(item,index){
        let marker = L.circleMarker([item.lat,item.lon],circleOptions)

		markers.addLayer(marker)  
	})

	markers.addTo(map)

	map.fitBounds(markers.getBounds())
}


// function mapJSON(){



// 	// add marker to featuregroup
// 	markers.addLayer(marker)
//     })

//     let marker = L.circleMarker([item.latitude,item.longitude],circleMarker)

//     // add featuregroup to map
// 	markers.addTo(map)

// 	// fit map to markers
// 	map.fitBounds(markers.getBounds())
// }
