var degCount = 0;
var spinstodo = 0;
var spinTimer = 1;

function spin(){
	if(spinstodo > 0){
		degCount+= 1+((spinTimer/100)*0.20);
		document.querySelector("#spinner").style.transform = "rotate("+degCount+"deg)";
		spinstodo--;
	}
}

document.addEventListener("click", function(){
	spinstodo += 10000;
	spinTimer += 0.05;
});

setInterval(spin, spinTimer);