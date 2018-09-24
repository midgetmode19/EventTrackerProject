window.addEventListener('load', function(e) {
  console.log('Script Loaded');
  init();
});

function init() {
  document.viewEntries.viewLog.addEventListener('click', viewEntries);
  document.entryForm.submit.addEventListener('click', addEntry);
  document.addEventListener('click', updateEntry);
  document.addEventListener('click', deleteEntry);
}

function viewEntries(e) {
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
}

function displayEntries(entries) {
  var div = document.getElementById("allEntries");
  var table = document.getElementById('entriesTable');

  var trh = document.createElement('tr');
  var thead = document.createElement('thead');
  var thId = document.createElement('th');
  var thMiles = document.createElement('th');
  var thCost = document.createElement('th');
  var thGallons = document.createElement('th');
  var thDate = document.createElement('th');

  var tbody = document.createElement('tbody');

  thId.textContent = "Entry Number";
  thMiles.textContent = "Miles";
  thCost.textContent = "Fuel Cost";
  thGallons.textContent = "Gallons This Fill";
  thDate.textContent = "Date of Refuel";

  trh.appendChild(thId);
  trh.appendChild(thMiles);
  trh.appendChild(thCost);
  trh.appendChild(thGallons);
  trh.appendChild(thDate);
  thead.appendChild(trh);
  table.appendChild(thead);


  entries.forEach(function(value, i, arr) {
    var tr = document.createElement('tr');
    var tdId = document.createElement('td');
    var tdMiles = document.createElement('td');
    var tdCost = document.createElement('td');
    var tdGallons = document.createElement('td');
    var tdDate = document.createElement('td');
    var tdUpdate = document.createElement('td');
    var tdDelete = document.createElement('td');
    var tdUpdateButton = document.createElement('input');
    tdUpdateButton.type = 'submit';
    tdUpdateButton.value = 'Edit Entry';
    tdUpdateButton.id = 'updatebtn';
    var tdDeleteButton = document.createElement('input');
    tdDeleteButton.type = 'button';
    tdDeleteButton.value = 'Delete';
    tdDeleteButton.id = 'deletebtn';


    tdId.textContent = value.id;
    tdMiles.textContent = value.miles;
    tdCost.textContent = "$" + value.fuelCost;
    tdGallons.textContent = value.gallonsPerFill;
    tdDate.textContent = value.refuelDate;

    tr.appendChild(tdId);
    tr.appendChild(tdMiles);
    tr.appendChild(tdCost);
    tr.appendChild(tdGallons);
    tr.appendChild(tdDate);
    tr.appendChild(tdUpdateButton);
    tr.appendChild(tdDeleteButton);
    tbody.appendChild(tr);

  });
  table.appendChild(tbody);
  div.appendChild(table);

  document.viewEntries.viewLog.removeEventListener('click', viewEntries);
}

function addEntry(e) {
  e.preventDefault();
  var form = e.target.parentElement;
  var miles = form.miles.value;
  var cost = form.fuelCost.value;
  var gallons = form.gallonsPerFill.value;
  var refuelDate = form.refuelDate.value;

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'api/entries', true);

  xhr.setRequestHeader("Content-type", "application/json");

  var data;
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status == 200 || xhr.status == 201) {
        var data = JSON.parse(xhr.responseText);
        console.log(data);
      } else {
        console.log("POST request failed.");
        console.error(xhr.status + ': ' + xhr.responseText);
      }
    }
  };
  var entry = {
    "miles": form.miles.value,
    "fuelCost": form.fuelCost.value,
    "gallonsPerFill": form.gallonsPerFill.value,
    "refuelDate": form.refuelDate.value
  }
  var entryJson = JSON.stringify(entry);
  xhr.send(entryJson);

  form.reset();
}

function updateEntry(e) {
  if (e.target && e.target.id == 'updatebtn') {
    console.log("update click");

  }
}

function deleteEntry(e) {
  if (e.target && e.target.id == 'deletebtn') {
    console.log("delete click");
		var entryId = e.target.parentElement.firstChild.textContent;
		console.log(entryId);
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', 'api/entries/' + entryId, true);
		if (!isNaN(entryId) && entryId > 0) {

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status == 200 || xhr.status == 202) {
          var data = JSON.parse(xhr.responseText);
          console.log(data);
        } else {
          console.log("Delete request failed.");
          console.error(xhr.status + ': ' + xhr.responseText);
        }
      }
    };

    xhr.send();
  }
}
}

function updateDeleteForm() {
  document.createElement('form');
}
