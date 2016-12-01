var imgs;
var load = false;
var ti = "";
var slider;

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
				//$("#image").attr("src", imgs[0]["link"]);

				for(i=0;i<imgs.length;i++){
					$("#images").append("<img data-src='"+imgs[i]["link"]+"'>");
				}

				slider = new IdealImageSlider.Slider({
    				selector: '#images',
				    height: 'auto',
				    interval: 4000,
				    maxHeight: (window.innerHeight*0.99)
				});
				slider.start();


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

				for(i=0;i<imgs.length;i++){
					$("#images").append("<img data-src='"+imgs[i]["link"]+"'>");
				}

				slider = new IdealImageSlider.Slider({
    				selector: '#images',
				    height: 'auto',
				    interval: 4000,
				    maxHeight: (window.innerHeight*0.99)
				});
				slider.start();


				//$("#image").attr("src", imgs[0]["link"]);

			}
		}
	}
});



