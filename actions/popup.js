/*jshint */
/*global chrome: true */

(function() {
	"use strict";

	document.getElementById("header").innerHTML = chrome.i18n.getMessage("title");
	var headers = document.getElementById("headers");
})();
