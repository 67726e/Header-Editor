/*jshint */
/*global chrome: true */

(function() {
	"use strict";

	window.setText = function(element, i18nKey) {
		var text = chrome.i18n.getMessage(i18nKey);

		if ("string" === typeof element) {
			document.getElementById(element).innerHTML = text;
		} else if ("object" === typeof element) {
			element.innerHTML = text;
		}
	};

	window.createHeaderRow = function(header) {
		header.header = header.header || "";
		header.value = header.value || "";

		// Header cell
		var headerCell = document.createElement("td");
		headerCell.className = "options-headers-table-header";
		headerCell.innerHTML = header.header;

		// Value cell
		var valueCell = document.createElement("td");
		valueCell.className = "options-headers-table-value";
		valueCell.innerHTML = header.value;

		// Edit/Delete cell
		var editButton = document.createElement("button");
		editButton.className = "options-headers-table-edit";
		window.setText(editButton, "edit");

		var deleteButton = document.createElement("button");
		deleteButton.className = "options-headers-table-delete";
		window.setText(deleteButton, "delete");

		var actionsCell = document.createElement("td");
		actionsCell.className = "options-headers-table-actions";
		actionsCell.appendChild(editButton);
		actionsCell.appendChild(deleteButton);

		// Create wrapping `<tr>`
		var row = document.createElement("tr");
		row.appendChild(headerCell);
		row.appendChild(valueCell);
		row.appendChild(actionsCell);

		return row;
	};

	window.getHeaders = function() {
		var headersJson = localStorage.getItem("headers");

		if (headersJson) {
			return JSON.parse(headersJson);
		}

		return [];
	};

	window.setHeaders = function(headers) {
		if (!headers) {
			headers = [];
		}

		localStorage.setItem("headers", JSON.stringify(headers));
	};
})();
