chrome.webRequest.onHeadersReceived.addListener(function(info) {
	chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
		if (!info || tabId !== info.tabId || changeInfo.status !== 'complete') {
			return;
		}
		chrome.tabs.sendMessage(info.tabId, info.responseHeaders);
		info = null;
	});
}, {urls: ["*://*/*"]}, ["responseHeaders"]);
