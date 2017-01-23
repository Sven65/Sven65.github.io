Array.prototype.random = function(){return this[Math.floor(Math.random() * ((this.length-1) - 0 + 1)) + 0];}

document.querySelector("body").style.backgroundImage = `url(images/${['one.jpg', 'two.jpg'].random()})`;

function removeClass(el, className){
	if (el.classList){
		el.classList.remove(className);
	}else{
		el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	}
}

function addClass(el, className){
	if (el.classList){
		el.classList.add(className);
	}else{
		el.className += ' ' + className;
	}
}

/* Modal Stuff */

let modal = document.querySelector("#modal")

function openModal(){
	addClass(modal, 'md-show')
	document.querySelectorAll(".themecolor").forEach(a => {a.content = "#8f1b0f"})
}

function closeModal(){
	removeClass(modal, 'md-show')
	document.querySelectorAll(".themecolor").forEach(a => {a.content = "#090909"})
}

document.querySelector(".md-close").addEventListener("click", () => {
	closeModal()
})

document.querySelector("#languages").addEventListener("click", () => {
	openModal()
})