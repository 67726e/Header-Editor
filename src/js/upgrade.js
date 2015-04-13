
(function() {
	function uuid() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}

		return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			s4() + '-' + s4() + s4() + s4();
	}

	var compareVersions = function(left, right) {
		console.log(left, right);

		if (!left || !right) {
			return;
		}

		var leftBlocks = left.split(".").map(function(number) { return parseInt(number, 10); });
		var rightBlocks = right.split(".").map(function(number) { return parseInt(number, 10); });
		
		for (var i = 0; i < Math.max(leftBlocks.length, rightBlocks.length); i++) {
			var leftNumber = leftBlocks[i];
			var rightNumber = rightBlocks[i];

			if (typeof leftNumber === "number" && typeof rightNumber === "number") {
				if (leftNumber === rightNumber) {
					continue;
				} else if (leftNumber < rightNumber) {
					return -1;
				} else if (leftNumber > rightNumber) {
					return 1;
				}
			} else {
				// If both numbers are NaN, terminate and they're equal up until this point
				if (isNaN(leftNumber) && isNaN(rightNumber)) {
					return 0;
				} else if (isNaN(leftNumber)) {
					// If the left number is NaN, assume we've reached the end and terminate
					return -1;
				} else if (isNaN(rightNumber)) {
					// If the right number is NaN, assume we've reached the end and terminate
					return 1;
				}
			}
		}

		// If we reach this point, the version strings are identical
		return 0;
	};

	// Methods for updating user data
	function update_2_1_0() {
		function getHeaders(key) {
			var json = localStorage.getItem(key);
			return (!!json) ? JSON.parse(json) : {};
		}

		var requestHeaders = getHeaders("headers");
		var responseHeaders = getHeaders("response-headers");

		// Since we don't want to include Backbone and all of the dependencies, we'll manually create and serialize the JSON
		function convertHeaders(headers, headerKey) {
			var headersList = []; 

			for (var key in headers) {
				if (headers.hasOwnProperty(key)) {
					var header = headers[key];
					var headerId = uuid();
					headersList.push(headerId);

					localStorage.setItem(headerKey + headerId, JSON.stringify({
						id: headerId,
						header: header.header || "",
						value: header.value || "",
						// Only set as inactive if explicitly false
						active: (header.active === false) ? false : true
					}));
				}
			}

			// Format is <UUID>[,<UUID>]
			return headersList.join(","); 
		}

		localStorage.setItem("backbone.requestHeaders", convertHeaders(requestHeaders, "backbone.requestHeaders-"));
		localStorage.setItem("backbone.responseHeaders", convertHeaders(responseHeaders, "backbone.responseHeaders-"));
	}

	// Methods for updating user data to include descriptions
	function update_2_2_0() {
		function updateHeaders(headerKeys, headerPrefix) {
			console.log(headerKeys);

			for (var i = 0; i < headerKeys.length; i++) {
				var headerKey = headerPrefix + headerKeys[i];
				var header = JSON.parse(localStorage.getItem(headerKey));

				console.log(headerPrefix, headerKey);

				// Create the new header field if one does not exist
				header.description = header.description || "";

				localStorage.setItem(headerKey, JSON.stringify(header));
			}
		}

		var requestHeaders = localStorage.getItem("backbone.requestHeaders");
		var responseHeaders = localStorage.getItem("backbone.requestHeaders");

		if (!!requestHeaders) {
			updateHeaders(requestHeaders.split(","), "backbone.requestHeaders-");
		}

		if (!!responseHeaders) {
			updateHeaders(responseHeaders.split(","), "backbone.responseHeaders-");
		}
	}

	chrome.runtime.onInstalled.addListener(function(details) {
		var previousVersion = details.previousVersion;
		var currentVersion = chrome.app.getDetails().version;

		if (0 > compareVersions(previousVersion, currentVersion)) {
			if (0 > compareVersions(previousVersion, "2.1.0")) {
				update_2_1_0();
			}

			if (0 > compareVersions(previousVersion, "2.2.0")) {
				update_2_2_0();
			}
		}
	});
})();

