chrome.runtime.onMessage.addListener(function(header) {
	for (var i in header) {
		parseHeaders(header[i])
	}
});

function parseHeaders(header) {
	if (!header.name.match(/^Debugger\|/)) {
		return;
	}
	output(JSON.parse(header.value));
}

function output(message) {
	var date = new Date(message.time * 1000);
	var output = '[';
	output += date.getFullYear() + '-';
	output += ('00' + date.getMonth()).substr(-2) + '-';
	output += ('00' + date.getDay()).substr(-2) + ' ';
	output += ('00' + date.getHours()).substr(-2) + ':';
	output += ('00' + date.getMinutes()).substr(-2) + ':';
	output += ('00' + date.getSeconds()).substr(-2) + '.';
	output += date.getMilliseconds() + ']';
	console[message.level](output, '[' + message.label + ']', message.information);
}
