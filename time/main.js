var s = 0;


function fTime(seconds) {
  var sec_num = parseInt(seconds, 10);
  
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  var time = hours+' Hours '+minutes+' Minutes '+seconds+" seconds";
  return time;
}

setInterval(function(){ s++; document.getElementById("time").innerHTML = "Page loaded "+fTime(s)+" ago"}, 1000);

function sChange(){
	var val = document.getElementById("shadow").value;
	switch(val){
		case "elegant":
			$('body').removeClass("elegantshadow deepshadow insetshadow retroshadow");
			$('body').addClass("elegantshadow");
		break;
		case "deep":
			$('body').removeClass("elegantshadow deepshadow insetshadow retroshadow");
			$('body').addClass("deepshadow");
		break;
		case "inset":
			$('body').removeClass("elegantshadow deepshadow insetshadow retroshadow");
			$('body').addClass("insetshadow");
		break;
		case "retro":
			$('body').removeClass("elegantshadow deepshadow insetshadow retroshadow");
			$('body').addClass("retroshadow");
		break;
	}
}