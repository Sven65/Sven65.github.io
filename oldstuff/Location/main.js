geo = navigator.geolocation;

function $(id){
	return document.getElementById(id);
}

function time(){
	var date = new Date();
	var hours = date.getHours();
	var minutes = "0" + date.getMinutes();
	var seconds = "0" + date.getSeconds();
	var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

	return formattedTime;

}

setInterval(function(){
	navigator.geolocation.getCurrentPosition(function(geo){
		$("long").innerHTML = geo.coords.longitude;
		$("lat").innerHTML = geo.coords.latitude;
		$("acc").innerHTML = geo.coords.accuracy;
		$("head").innerHTML = geo.coords.heading;
		$("speed").innerHTML = geo.coords.speed;
		$("time").innerHTML = time();


	});
}, 100);

$("vibB").addEventListener("click", function(){
	navigator.vibrate($("vib").value);
});
