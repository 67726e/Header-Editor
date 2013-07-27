/*jshint */
/*global chrome: true */

(function() {
	"use strict";

	var optionsPageTitle = document.getElementById("options-page-title");
	var requestHeadersPage = document.getElementById("options-request-headers-page");
	var responseHeadersPage = document.getElementById("options-response-headers-page");
	var aboutPage = document.getElementById("options-about-page");

	// Setup options page
	(function() {
		var requestHeadersLink = document.getElementById("options-request-headers");
		var responseHeadersLink = document.getElementById("options-response-headers");
		var aboutLink = document.getElementById("options-about");

		// Insert i18n text
		window.setText("options-title", "title");
		window.setText(requestHeadersLink, "request");
		window.setText(responseHeadersLink, "response");
		window.setText(aboutLink, "about");
		window.setText(optionsPageTitle, "request");

		// Display the "Headers" page as the initial page
		requestHeadersPage.style.display = "block";

		// Setup navigation actions
		requestHeadersLink.addEventListener("click", function() {
			requestHeadersPage.style.display = "block";
			responseHeadersPage.style.display = "none";
			aboutPage.style.display = "none";

			window.setText(optionsPageTitle, "request");
		});

		responseHeadersLink.addEventListener("click", function() {
			requestHeadersPage.style.display = "none";
			responseHeadersPage.style.display = "block";
			aboutPage.style.display = "none";

			window.setText(optionsPageTitle, "response");
		});

		aboutLink.addEventListener("click", function() {
			requestHeadersPage.style.display = "none";
			responseHeadersPage.style.display = "none";
			aboutPage.style.display = "block";

			window.setText(optionsPageTitle, "about");
		});
	})();

	// Setup request headers "page"
	(function() {
		var headers = window.getRequestHeaders();
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
			headers = window.getRequestHeaders();

			var uuid = window.generateUuid();
			var header = createHeader.value;
			var value = createValue.value;
			var active = createActive.checked;

			// Display the new header in the list of headers
			headersTableBody.appendChild(window.createHeaderRow(uuid, header, value, active));

			// Persist the new header
			headers[uuid] = {header: header, value: value, active: active};
			window.setRequestHeaders(headers);

			// Clear create header form
			createHeader.value = "";
			createValue.value = "";
			createActive.checked = true;
		});
	})();

	// Setup response headers "page"
	(function() {

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
