chrome.runtime.onMessage.addListener(function(header) {
	for (var i in header) {
		parseHeaders(header[i])
	}
});

function parseHeaders(header) {
	if (!header.name.match(/^Debugger\|/)) {
		return;
	}
	var headerInfo = header.name.split('|')
	output(headerInfo[0], headerInfo[1], JSON.parse(header.value))
}

function output(name, level, message) {
	var date = new Date;
	var output = '[' + name + ' ';
	output += date.getFullYear() + '-';
	output += ('00' + date.getMonth()).substr(-2) + '-';
	output += ('00' + date.getDay()).substr(-2) + ' ';
	output += ('00' + date.getHours()).substr(-2) + ':';
	output += ('00' + date.getMinutes()).substr(-2) + ':';
	output += ('00' + date.getSeconds()).substr(-2) + '.';
	output += date.getMilliseconds() + ']';
	console[level](output, message);
}
