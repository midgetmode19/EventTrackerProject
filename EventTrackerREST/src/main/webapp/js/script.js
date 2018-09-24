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
/* View Table */
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
/* End View Table */

/* Add Entry */
function addEntry(e) {
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
/* End Add Entry */

/*Update an Entry */
function updateEntry(e) {
  if (e.target && e.target.id == 'updatebtn') {
    console.log("update click");
    var form = document.createElement('form');
    var milesInput = document.createElement('input');
    var costInput = document.createElement('input');
    var gallonsInput = document.createElement('input');
    var dateInput = document.createElement('input');
    var submitbtn = document.createElement('input');

    var entryId = e.target.parentElement.firstChild.textContent;

    milesInput.type = 'text';
    milesInput.value = e.target.parentElement.firstChild.nextSibling.textContent;
    costInput.type = 'text';
    costInput.value = e.target.parentElement.firstChild.nextSibling.nextSibling.textContent;
    gallonsInput.type = 'text';
    gallonsInput.value = e.target.parentElement.firstChild.nextSibling.nextSibling.nextSibling.textContent;
    dateInput.type = 'date';
    dateInput.value = e.target.parentElement.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.textContent;
    submitbtn.type = 'submit';
    submitbtn.value = 'Submit';
		submitbtn.id = 'submitbtn';

    form.appendChild(milesInput);
    form.appendChild(costInput);
    form.appendChild(gallonsInput);
    form.appendChild(dateInput);
    form.appendChild(submitbtn);

    document.getElementsByTagName('body')[0].appendChild(form);
		document.addEventListener('click', submitUpdate);

  }
}

function submitUpdate(e) {
  e.preventDefault();
	console.log(e.target);
  if (e.target && e.target.id == 'submitbtn') {
		console.log(e.target.parentElement.id);
    var form = e.target.parentElement;
    var entryId = form.id.value;
    var miles = form.miles.value;
    var cost = form.fuelCost.value;
    var gallons = form.gallonsPerFill.value;
    var refuelDate = form.refuelDate.value;

    var xhr = new XMLHttpRequest();
    xhr.open('PUT', 'api/entries/' + entryId, true);

    xhr.setRequestHeader("Content-type", "application/json");

    var data;
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status == 200 || xhr.status == 201) {
          var data = JSON.parse(xhr.responseText);
          console.log(data);
        } else {
          console.log("PUT request failed.");
          console.error(xhr.status + ': ' + xhr.responseText);
        }
      }
    };
    var entry = {
      "id": entryId.value,
      "miles": milesInput.value,
      "fuelCost": costInput.value,
      "gallonsPerFill": gallonsInput.value,
      "refuelDate": dateInput.value
    }
    var entryJson = JSON.stringify(entry);
    xhr.send(entryJson);

    form.reset();
  }
}
/* End Update an Entry */

/* Delete an Entry */
function deleteEntry(e) {
  if (e.target && e.target.id == 'deletebtn') {
    var entryId = e.target.parentElement.firstChild.textContent;
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', 'api/entries/' + entryId, true);
    if (!isNaN(entryId) && entryId > 0) {

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status == 200 || xhr.status == 202) {
            var data = JSON.parse(xhr.responseText);
						viewEntries();
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
/* End Delete an Entry */
