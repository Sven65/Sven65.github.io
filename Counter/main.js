let count = 0;
let c = document.querySelector('#count');


document.addEventListener("click", (e) => {
	count++;
	c.innerHTML = count;
});
