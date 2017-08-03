chrome.runtime.onMessage.addListener(function(header) {
	var list = parseHeaders(header);
	for (var i in list) {
		output(list[i]);
	}
});

function parseHeaders(header) {
	var list = [];
	for (var i in header) {
		if (!header[i].name.match(/^Debugger\|/)) {
			continue;
		}
		list.push(JSON.parse(header[i].value));
	}
	list.sort(function(a, b) {
		return a.time - b.time;
	});
	return list;
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
