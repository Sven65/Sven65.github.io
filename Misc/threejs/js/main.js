// VARIABLES

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();

let geometry = new THREE.BoxGeometry(1,1,1);
let material = new THREE.MeshBasicMaterial({color: 0x00ff00, side: THREE.BackSide});
let cube = new THREE.Mesh( geometry, material );

let lamp = new THREE.PointLight(0xffffff, 1, 100)
let zoom = 1;

const mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel";

let rotation = true;
let colorChange = true;

const keys = {
	RArr: 39,
	LArr: 37,
	UArr: 38,
	DArr: 40,
	F1: 112,
	C: 67,
	NUMPAD8: 104,
	NUMPAD4: 100,
	NUMPAD2: 98,
	NUMPAD1: 97,
	NUMPAD3: 99,
	NUMPAD6: 102,
	R: 82,
	W: 87,
	A: 65,
	S: 83,
	D: 68,
	Q: 81,
	E: 69,
	M: 77,
	N: 78
}

// ADD STUFF TO STUFF

lamp.position.set(50,50,50)

cube.name = "cube";
scene.add(lamp)

scene.add(cube);

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;
document.body.appendChild(renderer.domElement);

// OH BOY

window.addEventListener('resize', onWindowResize, false);
window.addEventListener('keydown', keyHandler, false);
window.addEventListener(mousewheelevt, deltaHandle)

// AND THOSE FUCKING FUNCTIONS


function deltaHandle(e){
	let delta = e.wheelDelta;
	if(delta == 120){
		zoom += 0.1;
	}else if(delta == -120){
		zoom -= 0.1;
	}
	camera.zoom = zoom;
	camera.updateProjectionMatrix();
}

function keyHandler(e){
	let key = e.which;
	
	console.log(key)

	if(key === keys.RArr){
		cube.position.x += 0.1;
	}else if(key === keys.LArr){
		cube.position.x -= 0.1;
	}else if(key === keys.UArr){
		cube.position.y += 0.1;
	}else if(key === keys.DArr){
		cube.position.y -= 0.1;
	}else if(key === keys.M){
		cube.position.z += 0.1;
	}else if(key === keys.N){
		cube.position.z -= 0.1;
	}else if(key === keys.F1){
		e.preventDefault();
		rotation = !rotation;
	}else if(key === keys.NUMPAD6){
		cube.scale.x += 0.1;
	}else if(key === keys.NUMPAD4){
		cube.scale.x -= 0.1;
	}else if(key === keys.NUMPAD8){
		cube.scale.y += 0.1;
	}else if(key === keys.NUMPAD2){
		cube.scale.y -= 0.1;
	}else if(key === keys.NUMPAD1){
		cube.scale.z += 0.1;
	}else if(key === keys.NUMPAD3){
		cube.scale.z -= 0.1;
	}else if(key === keys.R){
		cube.scale.y = 1;
		cube.scale.x = 1;
		cube.scale.z = 1;
	}else if(key === keys.C){
		colorChange = !colorChange;
	}else if(key === keys.W){
		cube.rotation.x += 0.05;
	}else if(key === keys.S){
		cube.rotation.x -= 0.05;
	}else if(key === keys.A){
		cube.rotation.y += 0.05;
	}else if(key === keys.D){
		cube.rotation.y -= 0.05;
	}else if(key === keys.Q){
		cube.rotation.z += 0.05;
	}else if(key === keys.E){
		cube.rotation.z -= 0.05;
	}
}

function onWindowResize(){
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function render() {
	requestAnimationFrame(render)
	try{
		if(rotation){
			cube.rotation.x += 0.05;
			cube.rotation.y += 0.05;
		}
	}catch(e){
		console.error(e)
	}
	renderer.render(scene, camera);
}

setInterval(() => {
	if(colorChange){
		let color = new THREE.Color(Math.floor(Math.random()*16777215));
		let tw = new createjs.Tween(cube.material.color).to({r: color.r, g: color.g, b: color.b}, 1000);
		//tw.update();
	}
}, 2000)

render();