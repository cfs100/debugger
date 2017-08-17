chrome.devtools.network.onRequestFinished.addListener(function(HAR) {
	chrome.extension.sendMessage(HAR.response.headers);
});
