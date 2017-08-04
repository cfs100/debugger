chrome.webRequest.onHeadersReceived.addListener(function(info) {
	chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
		if (!info || tabId !== info.tabId || changeInfo.status !== 'complete') {
			return;
		}
		chrome.tabs.sendMessage(info.tabId, info.responseHeaders);
		info = null;
	});
}, {urls: ['<all_urls>']}, ['responseHeaders']);

chrome.webRequest.onBeforeSendHeaders.addListener(function(info) {
	var headers = info.requestHeaders, response = {};
	for (var i = 0; i < headers.length; ++i) {
		if (headers[i].name === 'User-Agent') {
			headers[i].value = headers[i].value + ' cfs100/debugger';
			break;
		}
	}
	response.requestHeaders = headers;
	return response;
}, {urls: ['<all_urls>']}, ['requestHeaders', 'blocking']);
