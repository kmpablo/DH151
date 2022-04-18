
// let's create some data
let data = [
    {
        'id': 0,
        'title': 'Bremerton, Washington',
        'lat': 47.5650,
        'lon': -122.62705,
        'desc': 'Where I lived from toddler to preschool years.',
        'img': '<img src="https://wordpressstorageaccount.blob.core.windows.net/wp-media/wp-content/uploads/sites/1075/2019/07/Sunrise-city.png">'
    },
    {
        'id': 1,
        'title': 'Santa Maria, CA',
        'lat': 34.9530,
        'lon': -120.4357,
        'desc': 'Where I lived from kindergarten days to high school. The place where I lived the longest and call my hometown!',
        'img': '<img src="img/santamaria.jpeg">'
    },
    {
        'id': 2,
        'title': 'Orlando, Florida',
        'lat': 28.5384,
        'lon': -81.3789,
        'desc': 'I visited DisneyWorld for summer break once and have wanted to go back ever since.',
        'img': '<img src="img/disneyworld.jpeg">'
    },
    {
        'id': 3,
        'title': 'New York City, New York',
        'lat': 40.7128,
        'lon': -74.0060,
        'desc': 'I visited New York for spring break with her family. I absolutely loved the city life and how something is always happening.',
        'img': '<img src="img/nyc.jpeg">'
    },
    {
        'id': 4,
        'title': 'Washington D.C., Maryland',
        'lat': 38.9072,
        'lon': -77.0369,
        'desc': 'When I went to D.C., I visited so many museums and monuments. It was so cold and windy, my umbrella even folded itself upside down because of the wind!',
        'img': '<img src="img/dc.jpg">'
    },
    {
        'id': 5,
        'title': 'Honolulu, Hawaii',
        'lat': 21.3069,
        'lon': -157.8583,
        'desc': 'My family likes to visit Hawaii every few years for summer vacation. I once went ziplining and surfing in Hawaii and have visited almost every island!',
        'img': '<img src="img/hawaii.jpeg">'
    },
    {
        'id': 6,
        'title': 'Las Vegas, Nevada',
        'lat': 36.1699,
        'lon': -115.1398,
        'desc': 'I have visited Vegas a couple of times as a kid, but could only really do anything there when I finally got to college.',
        'img': '<img src="img/vegas.jpeg">'
    }
]

let map = L.map('map').setView([0,0], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// before looping the data, create an empty FeatureGroup
let myMarkers = L.featureGroup();

// loop through data
data.forEach(function(item){
	// create marker
	let marker = L.marker([item.lat,item.lon]).bindPopup(`<h2>${item.title}</h2>${item.img}<br><br><div class = text>${item.desc}</div>`)

	// add marker to featuregroup
	myMarkers.addLayer(marker)

	// add data to sidebar with onclick event
	$('.sidebar').append(`<div class="sidebar-item" onclick="flyToIndex(${item.id})">${item.title}</div>`)
})

// after loop, add the FeatureGroup to map
myMarkers.addTo(map)

// make the map zoom to the extent of markers
map.fitBounds(myMarkers.getBounds());

// function to fly to a location by a given id number
function flyToIndex(index){
	map.flyTo([data[index].lat,data[index].lon],12)

    // open the popup
	myMarkers.getLayers()[index].openPopup()
}

// define layers
let layers = {
	"My Markers": myMarkers
}

// add layer control box
L.control.layers(null,layers).addTo(map)

