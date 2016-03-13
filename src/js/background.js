
(function() {
	var transformHeaders = function(headers, details) {
		// [ { name: "", value: "" } ]
		var list = [];
	
		for (var i = 0; i < headers.length; i++) {
			var header = headers[i];
			
			var isMatching = details.url.match(header.pattern);
			if (header.active && isMatching) {
				list.push({
					name: header.header,
					value: header.value
				});
			}
		}

		return list;
	};

	var getHeaders = function(matcher) {
		var list = [];

		for (var key in localStorage) {
			if (key.match(matcher)) {
				list.push(JSON.parse(localStorage.getItem(key)));
			}
		}

		return list;
	};

	// Insert request headers
	(function() {
		var FILTER = { urls: ["<all_urls>"]};
		var EXTRAS = ["requestHeaders", "blocking"];

		var modify = function(details) {
			details.requestHeaders = details.requestHeaders.concat(transformHeaders(getHeaders(/^backbone\.requestHeaders.+$/), details));
			
			return { requestHeaders: details.requestHeaders };
		};

		chrome.webRequest.onBeforeSendHeaders.addListener(modify, FILTER, EXTRAS);
	})();

	// Insert response headers
	(function() {
		var FILTER = { urls: ["<all_urls>"] };
		var EXTRAS = ["responseHeaders", "blocking"];
		
		var modify = function(details) {
			details.responseHeaders = details.responseHeaders.concat(transformHeaders(getHeaders(/^backbone\.responseHeaders.+$/), details));

			return { responseHeaders: details.responseHeaders };
		};

		chrome.webRequest.onHeadersReceived.addListener(modify, FILTER, EXTRAS);
	})();
})();

