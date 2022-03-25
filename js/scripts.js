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

renderer.setSize(window.innerWidth, window.innerHeight); //set the size of the renderer to the size of the window


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
var hemisphereLight = new THREE.HemisphereLight( 0x404040, 0x080820, 1.5 );
scene.add( hemisphereLight );

var ambientLight = new THREE.AmbientLight( 0xffffff, 0.6);
scene.add( ambientLight );

var pointLightUp = new THREE.PointLight( 0xffffff, 1, 20, 3 );
pointLightUp.position.set( 0, 0, 15 );
scene.add( pointLightUp );

var pointLightR = new THREE.PointLight( 0xDFECF8, 1, 100, 2 );
pointLightR.position.set( 20, -5, -2 );
scene.add(pointLightR);

var pointLightL = new THREE.PointLight( 0xDFECF8, 1, 100, 2 );
pointLightL.position.set( -20, -5, -2 );
scene.add( pointLightL );

//on down scroll addEventListener
window.addEventListener("scroll", function (event) {
  object.rotation.y += 0.3; //rotate the objec
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
