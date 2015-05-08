

d3.csv("the_File2.csv", function(data) {
	var flightArcs = [];
	var arcOptions = {strokeWidth: 1, arcSharpness: 1.4};

	data.forEach(function(flight){

		var origin = {
			latitude: parseFloat(flight.departure_lat),
			longitude: parseFloat(flight.departure_long)
		};
		var destination = {
			latitude: parseFloat(flight.arrival_lat),
			longitude: parseFloat(flight.arrival_long)
		};

		flightArcs.push({ origin: origin, destination: destination, departure_country: flight.departure_country });

	});

	var worldMap = new Datamap({
		element: document.getElementById('container'),
		setProjection: function(element) {
		    var projection = d3.geo.equirectangular()
		      .center([23, -3])
		      .rotate([4.4, 0])
		      .scale(400)
		      .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
		    var path = d3.geo.path()
		      .projection(projection);
		    
		    return {path: path, projection: projection};
		},
		fills: {
            defaultFill: 'DarkGray'
        },
        geographyConfig: {
            highlightOnHover: true,
            popupOnHover: false
        },
        data: data,
        done: function(datamap) {
            datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                var country = geography.properties.name;
                var departsFromCountry = _.filter(flightArcs, { departure_country: country });
                worldMap.arc(departsFromCountry, arcOptions)
            });
        }
	});

});