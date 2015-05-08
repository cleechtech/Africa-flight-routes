

d3.csv("the_File2.csv", function(data) {
	console.log(data);
	var flightArcs = [];
	data.forEach(function(flight){

		var origin = {
			latitude: parseFloat(flight.departure_lat),
			longitude: parseFloat(flight.departure_long)
		};
		var destination = {
			latitude: parseFloat(flight.arrival_lat),
			longitude: parseFloat(flight.arrival_long)
		};

		flightArcs.push({ origin: origin, destination: destination });

	});

	// var groupedByCity = _.groupBy(data, function(d){
	// 	return d["departure city"];
	// });

	// console.log(groupedByCity["Cape Town"]);

	var worldMap = new Datamap({
		element: document.getElementById('container'),
		fills: {
            defaultFill: 'DarkGray'
        },
        geographyConfig: {
            highlightOnHover: true,
            popupOnHover: false
        },
        data: data
	});

	worldMap.arc(flightArcs,  {strokeWidth: 1, arcSharpness: 1.4});

});


// [{ 
//   	origin: { latitude: 40.639722, longitude: -73.778889 },
//     destination: { latitude: 37.618889, longitude: -122.375 }
// }, {
//   	origin: { latitude: 30.194444, longitude: -97.67 },
//     destination: { latitude: 25.793333, longitude: -80.290556 },
//     options: { strokeWidth: 2, strokeColor: 'rgba(100, 10, 200, 0.4)', greatArc: true }
// }, {
// 	origin: { latitude: 39.861667, longitude: -104.673056 },
// 	destination: { latitude: 35.877778, longitude: -78.7875}
// }]