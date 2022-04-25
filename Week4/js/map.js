// Global variables
let map;
let lat = 34.0522;
let lon = -118.2437;
let zl = 7;

// path to csv data
let path = "data/Museums_and_Aquariums.csv";

// global variables
let markers = L.featureGroup();

// initialize
$( document ).ready(function() {
	createMap(lat,lon,zl);
    readCSV(path);
});

// create the map
function createMap(lat,lon,zl){
	map = L.map('map').setView([lat,lon], zl);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
}

// function to read csv data
function readCSV(path){
	Papa.parse(path, {
		header: true,
		download: true,
		skipEmptyLines: true,
		complete: function(data) {
			console.log(data);
			
			// map the data
			mapCSV(data);

		}
	});
}

function mapCSV(data){

	// circle options
	let circleOptions = {
		radius: 5,
		weight: 1,
		color: 'white',
		fillColor: 'dodgerblue',
		fillOpacity: 1
	}

	// loop through each entry
	data.data.forEach(function(item,index){
		// create a marker
		let marker = L.circleMarker([item.latitude,item.longitude],circleOptions)
		.on('mouseover',function(){
			this.bindPopup(`<b>${item.Name}</b><br>${item.description}`).openPopup()
		})

		// add marker to featuregroup
		markers.addLayer(marker)

		// add entry to sidebar
		$('.sidebar').append(`<div class="sidebar-item" onmouseover="panToImage(${index})">${item.Name}</div>`)
	})

	// add featuregroup to map
	markers.addTo(map)

	// fit map to markers
	map.fitBounds(markers.getBounds())

}

function panToImage(index){
	map.setZoom(17);
	map.panTo(markers.getLayers()[index]._latlng);
}
