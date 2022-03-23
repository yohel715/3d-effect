/* To actually be able to display anything with three.js, 
*  we need three things: scene, camera and renderer, 
*  so that we can render the scene with camera.
*/
var scene = new THREE.Scene(); //initilize
var camera = new THREE.PerspectiveCamera(
    75, //field of view
    window.innerWidth/window.innerHeight, //aspect ratio (w/h)
    0.1, //near plane
    1000 //far plane
);

camera.position.z = 3;

var renderer = new THREE.WebGLRenderer({antialias: true}); //initilize the renderer WebGLRenderer
renderer.setClearColor("#e5e5e5"); //background color
renderer.setSize(window.innerWidth,window.innerHeight); //set the size of the renderer to the size of the window 

//resize the renderer and the camera when the window is resized
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

//render the scene
var render = function() {
    requestAnimationFrame(render);
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
}

document.body.appendChild(renderer.domElement); //This is a <canvas> element the renderer uses to display the scene to us.

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial({color: 0xF1F1F1});
var mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

//source light for the scene
var light = new THREE.PointLight(0xFFFFFF, 1, 1000)
light.position.set(0,0,0);
scene.add(light);

//source light for the scene
var light = new THREE.PointLight(0xFFFFFF, 2, 1000)
light.position.set(0,0,25);
scene.add(light);

render();