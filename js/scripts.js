/* To actually be able to display anything with three.js,
 *  we need three things: scene, camera and renderer,
 *  so that we can render the scene with camera.
 */

import { GLTFLoader } from "./GLTFLoader.js";

var scene = new THREE.Scene(); //initilize
var camera = new THREE.PerspectiveCamera(
  75, //field of view
  window.innerWidth / window.innerHeight, //aspect ratio (w/h)
  0.1, //near plane
  1000 //far plane
);

camera.position.set(0, 0, 10);

var renderer = new THREE.WebGLRenderer({ antialias: true }); //initilize the renderer WebGLRenderer
renderer.setClearColor(0x000000, 0); //background color

//renderer.setSize(window.innerWidth, window.innerHeight); //set the size of the renderer to the size of the window
renderer.setSize(440, 640); //set the size of the renderer to the size of the window

//resize the renderer and the camera when the window is resized
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

//render the scene
var render = function () {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
};

document.body.appendChild(renderer.domElement); //This is a <canvas> element the renderer uses to display the scene to us.

var loader = new GLTFLoader();
var object;
loader.load("assets/vaso.gltf", function (gltf) {
    object = gltf.scene;
    //object.scale.set(1, 1, 1);
    object.position.set(0, -4, 0)
    object.rotation.set(0.5, 1.5, 0)
    scene.add(gltf.scene);
    render();
});

//source light for the scene
var hemisphereLight = new THREE.HemisphereLight( 0xffffff, 0x080820, 0.5 );
scene.add( hemisphereLight );

var ambientLight = new THREE.AmbientLight( 0x404040, 3 );
scene.add( ambientLight );

var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight.position.set( 10000, -10000, 1000 );
scene.add( directionalLight );

//on down scroll addEventListener
window.addEventListener("scroll", function (event) {
  object.rotation.y += 0.2; //rotate the objec
  //document.getElementsByClassName("shadow")[0].style.display = "none";
});

// var isScrolling;
// window.addEventListener('scroll', function ( event ) {
// 	window.clearTimeout( isScrolling );
// 	isScrolling = setTimeout(function() {
// 		//console.log( 'Scrolling has stopped.' );
//     document.getElementsByClassName("shadow")[0].style.display = "block";
// 	});
// }, false);

render();
