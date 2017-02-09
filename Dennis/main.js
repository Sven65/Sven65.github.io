function getJson(url){
	return new Promise((resolve, reject) => {
		let request = new XMLHttpRequest();
		request.open('GET', url, true);

		request.onload = function() {
			if (request.status >= 200 && request.status < 400) {
				let data = JSON.parse(request.responseText);
				resolve(data)
			} else {
				// We reached our target server, but it returned an error
				reject()
			}
		};

		request.onerror = function() {
			reject()
		};

		request.send();
	})
}

function getQuote(quotes){
	return Math.floor(Math.random() * ((quotes.length-1) - 0 + 1)) + 0
}

getJson('./quotes.json').then(quotes => {
	let q = localStorage.q||-1;
	q++;

	if(q > quotes.length){
		q = 0
	}

	localStorage.q = q

	document.querySelector("#quote").innerHTML = quotes[q];
})