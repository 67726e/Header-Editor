/*jshint */
/*global chrome: true */

(function() {
	"use strict";

	// Insert request headers
	(function() {
		function getChromeHeaders() {
			var headers = window.getRequestHeaders();

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
		var lastModified = window.getRequestLastModified();

		var modifyHeaders = function(details) {
			if (lastModified !== window.getRequestLastModified()) {
				chromeHeaders = getChromeHeaders();
			}

			details.requestHeaders = details.requestHeaders.concat(chromeHeaders);
			return {requestHeaders: details.requestHeaders};
		};

		var filter = {urls: ["<all_urls>"]};
		var extra = ["requestHeaders", "blocking"];

		chrome.webRequest.onBeforeSendHeaders.addListener(modifyHeaders, filter, extra);
	})();

	// Insert response headers
	(function() {
		function getResponseHeaders() {
			var headers = window.getResponseHeaders();
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

		var responseHeaders = getResponseHeaders();
		var lastModified = window.getResponseLastModified();

		var modifyResponse = function(details) {
			if (lastModified !== window.getRequestLastModified()) {
				responseHeaders = getResponseHeaders();
			}

			details.responseHeaders = details.responseHeaders.concat(responseHeaders);
			return {responseHeaders: details.responseHeaders};
		};

		var filter = {urls: ["<all_urls>"]};
		var extra = ["responseHeaders", "blocking"];

		chrome.webRequest.onHeadersReceived.addListener(modifyResponse, filter, extra);
	})();
})();
