
var img = 0;
var imgs;
var load = false;
var ti = "";

var hammer = new Hammer(document.documentElement);

function httpGet(theUrl){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.setRequestHeader("Authorization", "Client-ID 5be6309b7b4cf04");
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

$("#btn").on("click", function(e){
	var v = $("#i_id").val();
	if(v.length <= 0){
		swal("Error", "ID can't be empty!", "error");
	}else{
		v = v.replace("http://", "").replace("https://", "").replace("/a/", "").replace("reddit.com", "");
		if(v.indexOf("/r/") > -1){
			v = v.replace("/r/", "");
			var data = JSON.parse(httpGet("https://api.imgur.com/3/gallery/r/"+v));
			console.log(data);
			if(data.status != 200){
				swal("Error", "Imgur responded with status "+data.status, "error");
			}else{
				$("#wrap").css("display", "none");

				imgs = data.data;
				load = true;
				$("#image").attr("height", window.innerWidth/3);

				$("#image").attr("src", imgs[img]["link"]);

			}
		}else{

			var data = JSON.parse(httpGet("https://api.imgur.com/3/album/"+v));

			if(data.status != 200){
				swal("Error", "Imgur responded with status "+data.status, "error");
			}else{
				if(data.data.title != null){
					ti = data.data.title;
					$("#title").innerHTML = "Imgur Viewer - "+data.data.title;
				}

				$("#wrap").css("display", "none");

				imgs = data.data.images;
				load = true;
				$("#image").attr("height", window.innerWidth/3);

				$("#image").attr("src", imgs[img]["link"]);

			}
		}
	}
});

$("body").on("keydown", function(e){
	if(load){
		if(e.keyCode == 37){
			if(img <= 0){
				img = imgs.length-1;
			}else{
				img--;
			}
		}else if(e.keyCode == 39){
			if(img >= imgs.length-1){
				img = 0;
			}else{
				img++;
			}
		}
		$("#title").innerHTML = "Imgur Viewer - "+ti+" - "+img+"/"+imgs.length-1;
		$("#image").attr("src", imgs[img]["link"]);
	}
});


$(document).on("ready", function(){
	hammer.on("swipe", function(e){
		if(e.direction == 2){
			//left
			if(img <= 0){
				img = imgs.length-1;
			}else{
				img--;
			}
			$("#image").attr("src", imgs[img]["link"]);

		}else if(e.direction == 4){
			// Right
			if(img >= imgs.length-1){
				img = 0;
			}else{
				img++;
			}
			$("#image").attr("src", imgs[img]["link"]);

		}
	});
});
