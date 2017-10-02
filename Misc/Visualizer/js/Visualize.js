window.addEventListener("DOMContentLoaded", e => {
	let audioContext = new (window.AudioContext || window.webkitAudioContext)()
	let audioElement = document.querySelector("audio")
	audioElement.crossOrigin = "anonymous";
	let audioSource = audioContext.createMediaElementSource(audioElement)
	let audioAnalyzer = audioContext.createAnalyser()

	audioSource.connect(audioAnalyzer)
	audioSource.connect(audioContext.destination)

	let frequencyData = new Uint8Array(200);

	let svgHeight = '300';
	let svgWidth = '1200';
	let barPadding = '0';

	let r = 255;
	let g = 0;
	let b = 0;
	let manual = false;

	function rInt(min, max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}


	function createSvg(parent, height, width){
		return d3.select(parent).append('svg').attr('height', height).attr('width', width);
	}

	function changeBarWidth(changeTo){
		barPadding = changeTo;
		document.querySelector("#barwidth").innerHTML = "Bar width: "+barPadding;
	}

	let svg = createSvg('body', svgHeight, svgWidth);

	svg.selectAll('rect').data(frequencyData).enter().append('rect').attr('x', function (d, i) {
			return i * (svgWidth / frequencyData.length);
	}).attr('width', svgWidth / frequencyData.length - barPadding);

	// Continuously loop and update chart with frequency data.
	function renderChart() {
		requestAnimationFrame(renderChart);

		// Copy frequency data to frequencyData array.
		//console.log(frequencyData)
		audioAnalyzer.getByteFrequencyData(frequencyData);

		// Update d3 chart with new data.
		svg.selectAll('rect').data(frequencyData).attr('y', function(d) {
			return svgHeight - d;
		}).attr('height', function(d) {
			return d;
		}).attr('fill', function(d) {
			var amountLeft = 255-d;
			
			if(document.querySelector("#redRange").value >= 256){
				r = d+rInt(0, amountLeft)
			}
			if(document.querySelector("#greenRange").value >= 256){
				g = 0
			}
			if(document.querySelector("#blueRange").value >= 256){
				b = d
			}
			var event = new CustomEvent('colorChange', {detail: {r: r, g: g, b: b}});
			window.dispatchEvent(event)
			return `rgb(${r}, ${g}, ${b})`;
			//return 'rgb('+rInt(0, 255)+', 0, ' + d + ')';
		});
	}

	document.querySelector("#redRange").addEventListener("input", e => {
		r = document.querySelector("#redRange").value;
		var event = new CustomEvent('colorChange', {detail: {r: r, g: g, b: b}});
		window.dispatchEvent(event)
	})

	document.querySelector("#blueRange").addEventListener("input", e => {
		b = document.querySelector("#blueRange").value;
		var event = new CustomEvent('colorChange', {detail: {r: r, g: g, b: b}});
		window.dispatchEvent(event)
	})

	document.querySelector("#greenRange").addEventListener("input", e => {
		g = document.querySelector("#greenRange").value;
		var event = new CustomEvent('colorChange', {detail: {r: r, g: g, b: b}});
		window.dispatchEvent(event)
	})

	window.addEventListener('colorChange', e => {
		document.querySelector("#red").innerHTML = "R: "+e.detail.r
		document.querySelector("#blue").innerHTML = "B: "+e.detail.b
		document.querySelector("#green").innerHTML = "G: "+e.detail.g

	})

	// Run the loop
	renderChart();
})