var active = "home";

Node.prototype.hasClass = function(className){
    if(this.classList){
        return this.classList.contains(className);
    }else{
        return (-1 < this.className.indexOf(className));
    }
};

Node.prototype.addClass = function(className){
    if(this.classList){
        this.classList.add(className);
    }else if(!this.hasClass(className)){
        var classes = this.className.split(" ");
        classes.push(className);
        this.className = classes.join(" ");
    }
    return this;
};

Node.prototype.removeClass = function(className){
    if(this.classList){
        this.classList.remove(className);
    }else{
        var classes = this.className.split(" ");
        classes.splice(classes.indexOf(className), 1);
        this.className = classes.join(" ");
    }
    return this;
};

function fadeIn(el, display){
  el.style.opacity = 0;
  el.style.display = display || "block";

  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += .1) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}

document.getElementById("home").addEventListener("click", function(){
	document.getElementById(active).removeClass("active");
	document.getElementById("home").addClass("active");
	intev = setInterval(function(){
		var i = Number(document.getElementById(active+"_tab").style.marginLeft.replace("px", ""));
		document.getElementById(active+"_tab").style.marginLeft = i+2+"px";
		if(i+2 > window.innerWidth/1.25){
			clearInterval(intev);
			document.getElementById(active+"_tab").style.display = "none";
			document.getElementById("home_tab").style.marginLeft = "0px";
			fadeIn(document.getElementById("home_tab"));
			active = "home";
		}
	}, 1);
});

document.getElementById("projects").addEventListener("click", function(){
	document.getElementById(active).removeClass("active");
	document.getElementById("projects").addClass("active");
	intev = setInterval(function(){
		var i = Number(document.getElementById(active+"_tab").style.marginLeft.replace("px", ""));
		document.getElementById(active+"_tab").style.marginLeft = i+2+"px";
		if(i+2 > window.innerWidth/1.25){
			clearInterval(intev);
			document.getElementById(active+"_tab").style.display = "none";
			document.getElementById("projects_tab").style.marginLeft = "0px";
			fadeIn(document.getElementById("projects_tab"));
			active = "projects";
		}
	}, 1);
});

document.getElementById("languages").addEventListener("click", function(){
	document.getElementById(active).removeClass("active");
	document.getElementById("languages").addClass("active");
	intev = setInterval(function(){
		var i = Number(document.getElementById(active+"_tab").style.marginLeft.replace("px", ""));
		document.getElementById(active+"_tab").style.marginLeft = i+2+"px";
		if(i+2 > window.innerWidth/1.25){
			clearInterval(intev);
			document.getElementById(active+"_tab").style.display = "none";
			document.getElementById("languages_tab").style.marginLeft = "0px";
			fadeIn(document.getElementById("languages_tab"));
			active = "languages";
		}
	}, 1);
});

document.getElementById("lang").addEventListener("click", function(){
	document.getElementById("languages").click();
});