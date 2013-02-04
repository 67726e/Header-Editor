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
		document.getElementById("options-title").innerHTML = chrome.i18n.getMessage("title");
		headersLink.innerHTML = chrome.i18n.getMessage("headers");
		aboutLink.innerHTML = chrome.i18n.getMessage("about");
		optionsPageTitle.innerHTML = chrome.i18n.getMessage("headers");

		// Display the "Headers" page as the initial page
		headersPage.style.display = "block";

		// Setup navigation actions
		headersLink.addEventListener("click", function() {
			aboutPage.style.display = "none";
			headersPage.style.display = "block";

			optionsPageTitle.innerHTML = chrome.i18n.getMessage("headers");
		});

		aboutLink.addEventListener("click", function() {
			headersPage.style.display = "none";
			aboutPage.style.display = "block";

			optionsPageTitle.innerHTML = chrome.i18n.getMessage("about");
		});
	})();

	// Setup headers "page"
	(function() {
		var addButton = document.getElementById("options-headers-table-add");

		// Setup text with i18n
		document.getElementById("options-headers-table-header").innerHTML = chrome.i18n.getMessage("header");
		document.getElementById("options-headers-table-value").innerHTML = chrome.i18n.getMessage("value");
		addButton.innerHTML = chrome.i18n.getMessage("add");

		// Setup actions
		addButton.addEventListener("click", function() {
			// TODO: Persist new header
			// TODO: Clear out insert form
		});
	})();

	// Setup about "page"
	(function() {
		console.log(chrome.i18n.getMessage("about"));
		console.log(chrome.i18n.getMessage("aboutExtension"));

		document.getElementById("options-about-extension").innerHTML = chrome.i18n.getMessage("aboutExtension");
		document.getElementById("options-about-support").innerHTML = chrome.i18n.getMessage("aboutSupport");
		document.getElementById("options-about-author").innerHTML = chrome.i18n.getMessage("aboutAuthor");
	})();
})();
