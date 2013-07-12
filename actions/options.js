/*jshint */
/*global chrome: true */

(function() {
	"use strict";

	var optionsPageTitle = document.getElementById("options-page-title");
	var headersPage = document.getElementById("options-headers-page");
	var aboutPage = document.getElementById("options-about-page");

	// Setup options page
	(function() {
		var headersLink = document.getElementById("options-headers");
		var aboutLink = document.getElementById("options-about");

		// Insert i18n text
		window.setText("options-title", "title");
		window.setText(headersLink, "headers");
		window.setText(aboutLink, "about");
		window.setText(optionsPageTitle, "headers");

		// Display the "Headers" page as the initial page
		headersPage.style.display = "block";

		// Setup navigation actions
		headersLink.addEventListener("click", function() {
			aboutPage.style.display = "none";
			headersPage.style.display = "block";

			window.setText(optionsPageTitle, "headers");
		});

		aboutLink.addEventListener("click", function() {
			headersPage.style.display = "none";
			aboutPage.style.display = "block";

			window.setText(optionsPageTitle, "about");
		});
	})();

	// Setup headers "page"
	(function() {
		var headers = window.getHeaders();
		var headersTableBody = document.getElementById("options-headers-table-body");
		var addButton = document.getElementById("options-headers-table-add");
		var createHeader = document.getElementById("options-headers-table-create-header");
		var createValue = document.getElementById("options-headers-table-create-value");
		var createActive = document.getElementById("options-headers-table-create-active");

		// Setup text with i18n
		window.setText("options-headers-table-header", "header");
		window.setText("options-headers-table-value", "value");
		window.setText("options-headers-table-active", "active");
		window.setText(addButton, "add");

		// Insert existing headers
		for (var uuid in headers) {
			if (headers.hasOwnProperty(uuid)) {
				headersTableBody.appendChild(window.createHeaderRow(uuid, headers[uuid].header, headers[uuid].value, headers[uuid].active));
			}
		}

		// Setup actions
		addButton.addEventListener("click", function() {
			// Refresh the list of headers
			headers = window.getHeaders();

			var uuid = window.generateUuid();
			var header = createHeader.value;
			var value = createValue.value;
			var active = createActive.checked;

			// Display the new header in the list of headers
			headersTableBody.appendChild(window.createHeaderRow(uuid, header, value, active));

			// Persist the new header
			headers[uuid] = {header: header, value: value, active: active};
			window.setHeaders(headers);

			// Clear create header form
			createHeader.value = "";
			createValue.value = "";
			createActive.checked = true;
		});
	})();

	// Setup about "page"
	(function() {
		window.setText("options-about-extension", "aboutExtension");
		window.setText("options-about-support", "aboutSupport");
		window.setText("options-about-author", "aboutAuthor");
		window.setText("options-about-attributions", "aboutAttributions");
		window.setText("options-about-attributions-icon", "aboutAttributionsIcon");
	})();
})();
