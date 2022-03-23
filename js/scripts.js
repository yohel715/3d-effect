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

camera.position.set(0, 2, 0);
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer({ antialias: true }); //initilize the renderer WebGLRenderer
renderer.setClearColor("#e5e5e5"); //background color
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
    scene.rotation.y += 0.005;
    renderer.render(scene, camera);
};

document.body.appendChild(renderer.domElement); //This is a <canvas> element the renderer uses to display the scene to us.

var loader = new GLTFLoader();
loader.load("assets/scene.gltf", function (gltf) {
    scene.add(gltf.scene);
    render();
});

//source light for the scene
var light = new THREE.HemisphereLight( 0xffffff, 0x000000, 5 );
scene.add(light); 

render();
