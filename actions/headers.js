/*jshint */
/*global chrome: true */

(function() {
	"use strict";

	function getChromeHeaders() {
		var headers = window.getHeaders();

		var chromeHeaders = [];

		for (var key in headers) {
			if (headers.hasOwnProperty(key) && headers[key].active === true) {
				chromeHeaders.push({
					name: headers[key].header,
					value: headers[key].value
				});
			}
		}

		return chromeHeaders;
	}

	var chromeHeaders = getChromeHeaders();
	var lastModified = window.getLastModified();


	var modifyHeaders = function(details) {
		if (lastModified !== window.getLastModified()) {
			chromeHeaders = getChromeHeaders();
		}

		details.requestHeaders = details.requestHeaders.concat(chromeHeaders);
		return {requestHeaders: details.requestHeaders};
	};

	var filter = {urls: ["http://*/*", "https://*/*"]};
	var extra = ["requestHeaders", "blocking"];

	chrome.webRequest.onBeforeSendHeaders.addListener(modifyHeaders, filter, extra);

})();
