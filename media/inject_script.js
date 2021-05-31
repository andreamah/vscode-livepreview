// const { existsSync } = require("fs")

const url = 'ws://localhost:${WS_PORTNUM}';
const connection = new WebSocket(url);

connection.onerror = (error) => {
	console.log('WebSocket error: ' + error);
};

connection.onmessage = (e) => {
	if ((e.data = 'refresh')) {
		window.location.reload();
	}
};
window.parent.postMessage(
	{ command: 'update-path', text: window.location.pathname },
	'*'
);

window.addEventListener(
	'message',
	function () {
		if (this.event.data == 'refresh') {
			window.location.reload();
		}
	},
	false
);

var l = document.getElementsByTagName('a');
for (var i = 0; i < l.length; i++) {
	l[i].onclick = (e) => {
		const linkTarget = e.target.href;

		if (!linkTarget.startsWith('http://localhost:')) {
			// TODO: support for external links - current work doesn't support browser
			// e.preventDefault();
			// window.parent.postMessage(
			// 	{ command: 'open-external-link', text: linkTarget },
			// 	'*'
			// );
		} else {
			// check all local URLs to make sure to catch pages that won't be injectable
			window.parent.postMessage(
				{ command: 'perform-url-check', text: linkTarget },
				'*'
			);
		}
	};
}

window.addEventListener('message', (event) => {
	if (event.data.command == 'open-external-link') {
		window.parent.postMessage(event.data, '*');
	}
});
