var random = false;
var checkbox = document.querySelector("#random")

var isChecked = (localStorage.random == 'true');
var removeStylish = (localStorage.removeStylish == 'true');

checkbox.checked = isChecked

if(removeStylish){
	document.querySelector("#stylish-css").remove()
}

function toggleStyle(){
	removeStylish = !removeStylish;
	localStorage.removeStylish = removeStylish;
	if(removeStylish){
		document.querySelector("#stylish-css").remove()
	}else{
		var head = document.getElementsByTagName('head')[0];
		var link = document.createElement('link');
		link.id = 'stylish-css';
		link.rel = 'stylesheet';
		link.href = './Styled.css';
		head.appendChild(link);
	}
}

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

function getThing(things){
	return Math.floor(Math.random() * ((things.length-1) - 0 + 1)) + 0
}

function addClass(el, className){
	if (el.classList){
		el.classList.add(className);
	}else{
		el.className += ' ' + className;
	}
}

getJson('./Things.json').then(things => {
	let q = 0;
	if(isChecked){
		q = getThing(things)

		while(localStorage.q == q){
			q = getThing(q)
		}
	}else{
		q = localStorage.q||-1;
		q++;

		if(q >= things.length){
			q = 0
		}
	}

	localStorage.q = q

	document.querySelector("#thing").innerHTML = things[q];

	addClass(document.querySelector("#thing"), "show")
})

checkbox.addEventListener('change', () => {
	random = checkbox.checked;
	localStorage.random = random
	console.log(checkbox.checked)
})