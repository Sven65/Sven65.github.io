const POSTERS_PER_ROW = 12;
const RING_RADIUS = 200;

function setup_posters(row){
	let posterAngle = 360 / POSTERS_PER_ROW;
	for(let i=0;i<POSTERS_PER_ROW;i++){
		let poster = document.createElement('div');
		poster.className = 'poster';
		let transform = 'rotateY(' + (posterAngle * i) + 'deg) translateZ(' + RING_RADIUS + 'px)';
		poster.style.webkitTransform = transform;
		let content = poster.appendChild(document.createElement('p'));
		content.textContent = i;
		// add the poster to the row
		//row.appendChild(poster);
	}
}

function init(){
	setup_posters(document.getElementById('ring-1'));
	setup_posters(document.getElementById('ring-2'));
	setup_posters(document.getElementById('ring-3'));
}

window.addEventListener('load', init, false);
