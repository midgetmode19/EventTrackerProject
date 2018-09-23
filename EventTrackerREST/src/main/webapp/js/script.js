window.addEventListener('load', function(e){
	console.log('Script Loaded');
	init();
});

function init() {
	document.viewEntries.viewLog.addEventListener('click', function(e) {
		e.preventDefault();
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "/api/entries");
		xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let entries = JSON.parse(xhr.responseText);
				displayEntries(entries);
			} else {
				console.err('Error retrieving URL');
			}
		}
		if (xhr.readyState === 4 && xhr.status != 200) {
			console.error(xhr.status + ': ' + xhr.responseText);
		}
	}
	xhr.send();
	});
}

function displayEntries(entries) {
	var div = document.getElementById("allEntries");
	var table = document.createElement('table');

	var trh = document.createElement('tr');
	var thead = document.createElement('thead');
	var thMiles = document.createElement('th');
	var thCost = document.createElement('th');
	var thGallons = document.createElement('th');
	var thDate = document.createElement('th');

	var tbody = document.createElement('tbody');

	thMiles.textContent = "Miles";
	thCost.textContent = "Fuel Cost";
	thGallons.textContent = "Gallons This Fill";
	thDate.textContent = "Date of Refuel";

	trh.appendChild(thMiles);
	trh.appendChild(thCost);
	trh.appendChild(thGallons);
	trh.appendChild(thDate);
	thead.appendChild(trh);
	table.appendChild(thead);


	entries.forEach(function(value, i, arr){
		var tr = document.createElement('tr');
		var tdMiles = document.createElement('td');
		var tdCost = document.createElement('td');
		var tdGallons = document.createElement('td');
		var tdDate = document.createElement('td');

		tdMiles.textContent = value.miles;
		tdCost.textContent = value.fuelCost;
		tdGallons.textContent = value.gallonsPerFill;
		tdDate.textContent = value.refuelDate;

		tr.appendChild(tdMiles);
		tr.appendChild(tdCost);
		tr.appendChild(tdGallons);
		tr.appendChild(tdDate);
		tbody.appendChild(tr);

	});
	table.appendChild(tbody);
	div.appendChild(table);
}
