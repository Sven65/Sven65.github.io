let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let geometry = new THREE.BoxGeometry( 1, 1, 1 );
let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
let cube = new THREE.Mesh( geometry, material );
cube.name = "cube";
scene.add(cube);

camera.position.z = 5;

window.addEventListener('resize', onWindowResize, false);
window.addEventListener('keydown', keyHandler, false);

let rotation = true;

const keys = {
	RArr: 39,
	LArr: 37,
	F1: 112
}

function keyHandler(e){
	let key = e.which;
	
	console.log(key)

	if(key === keys.RArr){
		cube.position.x += 0.1;
	}else if(key === keys.LArr){
		cube.position.x -= 0.1;
	}else if(key === keys.F1){
		e.preventDefault();
		rotation = !rotation;
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

render();