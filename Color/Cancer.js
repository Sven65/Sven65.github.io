document.addEventListener('DOMContentLoaded', () => {
	let shouldRun = true;

	setInterval(() => {
		if(shouldRun){
			let color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
			document.getElementById("color").innerHTML = color;
			document.getElementById("body").style.backgroundColor = color;
		}
	}, 1500)

	document.addEventListener('click', () => {
		shouldRun = !shouldRun;
		document.getElementById("state").innerHTML = shouldRun?'Running':'Paused'
	})

})
