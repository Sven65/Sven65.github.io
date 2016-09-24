let count = 0;
let c = document.querySelector('#count');

window.onload = () => {
	count = localStorage.getItem('count') | 0;
	c.innerHTML = count;
}


document.addEventListener("click", (e) => {
	count++;
	c.innerHTML = count;
	localStorage.setItem('count', count);
});
