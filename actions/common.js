/*jshint */
/*global chrome: true */

(function() {
	"use strict";

	function editCleanup(row) {
		var valueCell = row.getElementsByClassName("options-headers-table-value")[0];
		var activeCheckbox = row.getElementsByClassName("options-headers-table-active")[0].getElementsByTagName("input")[0];

		// Remove the value edit input
		var valueEdit = valueCell.getElementsByClassName("options-headers-table-value-edit")[0];
		valueEdit.remove();

		// Get the header's value and display it
		var header = row.getElementsByClassName("options-headers-table-header")[0].innerHTML;
		var headerData = window.getHeaders()[header];
		valueCell.innerHTML = headerData.value;

		// Disable the active status checkbox and revert the status
		activeCheckbox.disabled = true;
		activeCheckbox.checked = headerData.active;

		// Remove cancel & save buttons
		row.getElementsByClassName("options-headers-table-edit-cancel")[0].remove();
		row.getElementsByClassName("options-headers-table-edit-save")[0].remove();

		// Redisplay the edit & delete buttons
		row.getElementsByClassName("options-headers-table-edit")[0].style.display = "";
		row.getElementsByClassName("options-headers-table-delete")[0].style.display = "";
	}

	function editCancel(event) {
		var row = event.target.parentNode.parentNode;
		editCleanup(row);
	}

	function editSave(event) {
		var row = event.target.parentNode.parentNode;
		var valueCell = row.getElementsByClassName("options-headers-table-value")[0];
		var valueEdit = valueCell.getElementsByClassName("options-headers-table-value-edit")[0];

		// Get header and value
		var header = row.getElementsByClassName("options-headers-table-header")[0].innerHTML;
		var value = valueEdit.value;

		// Get the active status
		var activeCheckbox = row.getElementsByClassName("options-headers-table-active")[0].getElementsByTagName("input")[0];
		var active = activeCheckbox.checked;

		// Save the new header
		var headers = window.getHeaders();
		headers[header] = {value: value, active: active};
		window.setHeaders(headers);

		editCleanup(row);
	}

	function editRow(event) {
		var row = event.target.parentNode.parentNode;
		var valueCell = row.getElementsByClassName("options-headers-table-value")[0];
		var activeCheckbox = row.getElementsByClassName("options-headers-table-active")[0].getElementsByTagName("input")[0];

		// Create a text input to edit the value
		var valueEdit = document.createElement("input");
		valueEdit.type = "text";
		valueEdit.classList.add("options-headers-table-value-edit");
		valueEdit.value = valueCell.innerHTML;

		// Hide the text and display the input
		valueCell.innerHTML = "";
		valueCell.appendChild(valueEdit);

		// Enable the active status checkbox
		activeCheckbox.disabled = false;

		// Create cancel and save buttons
		var cancelButton = document.createElement("button");
		cancelButton.classList.add("options-headers-table-edit-cancel");
		cancelButton.addEventListener("click", editCancel);
		window.setText(cancelButton, "cancel");

		var saveButton = document.createElement("button");
		saveButton.classList.add("options-headers-table-edit-save");
		saveButton.addEventListener("click", editSave);
		window.setText(saveButton, "save");

		// Hide the delete and edit buttons, show save and cancel
		row.getElementsByClassName("options-headers-table-edit")[0].style.display = "none";
		row.getElementsByClassName("options-headers-table-delete")[0].style.display = "none";

		var actionsCell = row.getElementsByClassName("options-headers-table-actions")[0];
		actionsCell.appendChild(cancelButton);
		actionsCell.appendChild(saveButton);
	}

	function deleteRow(event) {
		var row = event.target.parentNode.parentNode;
		var header = row.getElementsByClassName("options-headers-table-header")[0].innerHTML;

		window.removeHeaderRow(header);

		var headers = window.getHeaders();
		delete headers[header];
		window.setHeaders(headers);
	}

	window.setText = function(element, i18nKey) {
		var text = chrome.i18n.getMessage(i18nKey);

		if ("string" === typeof element) {
			document.getElementById(element).innerHTML = text;
		} else if ("object" === typeof element) {
			element.innerHTML = text;
		}
	};

	window.createHeaderRow = function(header, value, active) {
		// Header cell
		var headerCell = document.createElement("td");
		headerCell.classList.add("options-headers-table-header");
		headerCell.innerHTML = header;

		// Value cell
		var valueCell = document.createElement("td");
		valueCell.classList.add("options-headers-table-value");
		valueCell.innerHTML = value;

		// Active cell
		var activeCheckbox = document.createElement("input");
		activeCheckbox.type = "checkbox";
		activeCheckbox.disabled = true;
		activeCheckbox.checked = active;

		var activeCell = document.createElement("td");
		activeCell.classList.add("options-headers-table-active");
		activeCell.appendChild(activeCheckbox);

		// Edit/Delete cell
		var editButton = document.createElement("button");
		editButton.classList.add("options-headers-table-edit");
		editButton.addEventListener("click", editRow);
		window.setText(editButton, "edit");

		var deleteButton = document.createElement("button");
		deleteButton.classList.add("options-headers-table-delete");
		deleteButton.addEventListener("click", deleteRow);
		window.setText(deleteButton, "delete");

		var actionsCell = document.createElement("td");
		actionsCell.classList.add("options-headers-table-actions");
		actionsCell.appendChild(editButton);
		actionsCell.appendChild(deleteButton);

		// Create wrapping `<tr>`
		var row = document.createElement("tr");
		row.id = "header-" + header;
		row.appendChild(headerCell);
		row.appendChild(valueCell);
		row.appendChild(activeCell);
		row.appendChild(actionsCell);

		return row;
	};

	window.removeHeaderRow = function(header) {
		var headerRow = document.getElementById("header-" + header);

		if (headerRow) {
			headerRow.parentNode.removeChild(headerRow);
		}
	};

	window.getHeaders = function() {
		var headersJson = localStorage.getItem("headers");

		if (headersJson) {
			return JSON.parse(headersJson);
		}

		return {};
	};

	window.setHeaders = function(headers) {
		if (!headers) {
			headers = {};
		}

		localStorage.setItem("headers-last-modified", new Date());
		localStorage.setItem("headers", JSON.stringify(headers));
	};

	window.getLastModified = function() {
		return localStorage.getItem("headers-last-modified");
	};

	chrome.runtime.onInstalled.addListener(function(details) {
		if ("update" === details.reason) {
			var previousVersion = details.previousVersion;
			var currentVersion = chrome.app.getDetails().version;

			if (previousVersion < currentVersion) {
				if (previousVersion < "1.1.0") {
					// Update K/V pair to be String/Object
					// e.g. "X-Forwarded-For": {header: "127.0.0.1", active: true}

					var headers = window.getHeaders();

					var updatedHeaders = {};
					for (var header in headers) {
						if (headers.hasOwnProperty(header)) {
							// Default all headers to active
							updatedHeaders[header] = {value: headers[header], active: true};
						}
					}

					window.setHeaders(updatedHeaders);
				}
			}
		}
	});
})();
