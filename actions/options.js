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
				headersTableBody.appendChild(window.createHeaderRow(uuid, "request", headers[uuid]));
			}
		}

		// Setup actions
		addButton.addEventListener("click", function() {
			// Refresh the list of headers
			headers = window.getRequestHeaders();

			var uuid = window.generateUuid();
			var headerData = {
				header: createHeader.value,
				value: createValue.value,
				active: createActive.checked
			};

			// Display the new header in the list of headers
			headersTableBody.appendChild(window.createHeaderRow(uuid, "request", headerData));

			// Persist the new header
			headers[uuid] = headerData;
			window.setRequestHeaders(headers);

			// Clear create header form
			createHeader.value = "";
			createValue.value = "";
			createActive.checked = true;
		});
	})();

	// Setup response headers "page"
	(function() {
		var headers = window.getResponseHeaders();
		var headersTableBody = document.getElementById("options-response-headers-table-body");
		var addButton = document.getElementById("options-response-headers-table-add");
		var createHeader = document.getElementById("options-response-headers-table-create-header");
		var createValue = document.getElementById("options-response-headers-table-create-value");
		var createActive = document.getElementById("options-response-headers-table-create-active");

		// Setup text
		window.setText("options-response-headers-table-header", "header");
		window.setText("options-response-headers-table-value", "value");
		window.setText("options-response-headers-table-active", "active");
		window.setText(addButton, "add");

		// Insert response headers
		for (var uuid in headers) {
			if (headers.hasOwnProperty(uuid)) {
				headersTableBody.appendChild(window.createHeaderRow(uuid, "response", headers[uuid]));
			}
		}

		// Setup response header add button
		addButton.addEventListener("click", function() {
			// Get current headers
			headers = window.getResponseHeaders();

			var uuid = window.generateUuid();
			var headerData = {
				header: createHeader.value,
				value: createValue.value,
				active: createActive.checked
			};

			// Append the header row to the response table
			headersTableBody.appendChild(window.createHeaderRow(uuid, "response", headerData));

			// Persist header
			headers[uuid] = headerData;
			window.setResponseHeaders(headers);

			// Clear add header form
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
