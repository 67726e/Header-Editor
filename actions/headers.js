/*jshint */
/*global chrome: true */

(function() {
	"use strict";

	var modifyHeaders = function(details) {
		details.requestHeaders.push({name: "X-Forwarded-For", value: "TEST"});
		return {requestHeaders: details.requestHeaders};
	};

	var filter = {urls: ["http://*/*", "https://*/*"]};
	var extra = ["requestHeaders", "blocking"];

	chrome.webRequest.onBeforeSendHeaders.addListener(modifyHeaders, filter, extra);

})();
