/* To actually be able to display anything with three.js,
 *  we need three things: scene, camera and renderer,
 *  so that we can render the scene with camera.
 */
import { GLTFLoader } from "./GLTFLoader.js";
import * as THREE from "./three.module.js";

var scene = new THREE.Scene(); // Initilize.
var camera = new THREE.PerspectiveCamera(
  75, // Field of view.
  window.innerWidth / window.innerHeight, // Aspect ratio (w/h).
  0.1, // Near plane.
  1000 // Far plane.
);

camera.position.set(0, 0, 10); // X, Y, Z.
var renderer = new THREE.WebGLRenderer({ antialias: true }); // Initilize the renderer WebGLRenderer.
renderer.setClearColor(0x000000, 0); // Background color.
renderer.setSize(window.innerWidth, window.innerHeight); // Set the size of the renderer to the size of the window.

// Resize the renderer and the camera when the window is resized.
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Render the scene.
var render = function () {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};

const elementContainer = document.querySelector('.rendered-object');
// This is a <canvas> element the renderer uses to display the scene to us.
elementContainer.appendChild(renderer.domElement);

var loader = new GLTFLoader();
var object;

// Load the gltf file.
loader.load("assets/vaso.gltf", function (gltf) {
    object = gltf.scene; // Get the scene from the gltf file.
    object.scale.set(0.9, 0.9, 0.9); // Scale the object, X, Y, Z.
    if (window.innerWidth <= 425 && window.innerHeight <= 875) {
      object.position.set(0, -4.3, 0) // Position the object, X, Y, Z.
      object.rotation.set(0.35, 4.7, 0) // Rotate the object, X, Y, Z.
    } else {
      object.position.set(0, -5.5, 0) // Position the object, X, Y, Z.
      object.rotation.set(0.3, 4.7, 0) // Rotate the object, X, Y, Z.
    }
    scene.add(gltf.scene); // Add the object to the scene.
    render();
});

// Source light for the scene.
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
// End of light sources.

const mainElement = document.querySelector('body > main');
const canvaElement = document.querySelector('.rendered-object > canvas');
var detailsElement = document.querySelectorAll('.detail');
let lastScrollTop = 0;

// On scroll addEventListener.
mainElement.addEventListener("scroll", function () {
  const direction = lastScrollTop > this.scrollTop ? 1 : -1;
  lastScrollTop = mainElement.scrollTop;
  // Get the amount of pixels the user has scrolled.
  const scrollAmount = mainElement.scrollTop; 
  // Height of the window.
  const windowHeight = window.innerHeight; 
  // Height of the main element.
  const mainElementHeight = mainElement.scrollHeight; 
  // Percentage of the scroll.
  const scrollPercentage = scrollAmount / (mainElementHeight - windowHeight);

  if (scrollPercentage < 0.5) {
    object.rotation.y += 0.169 * direction; // Rotate the object.
  }

  if (scrollPercentage >= 0.5) {
    canvaElement.classList.add("static");
    canvaElement.removeAttribute("style");
  } 

  // If the user has scrolled to the middle of the page, then stop the canvas.
  else if (scrollPercentage <= 0.49) {
    canvaElement.style.position = "fixed";
    canvaElement.classList.remove("static");
  }

  /* If the user has scrolled near to the middle of the page, 
  * then show the details by adding the class "fadeIn" to the details element,
  */
  if (scrollPercentage >= 0.30 && scrollPercentage < 0.70) {
    detailsElement.forEach( (detail) => {
      detail.classList.add('fadeIn');
    });
  }
});

/*
* Progress bar
* get the amount of questions from the API 
* and set the width of the progress bar
*/
const progressBarFull = document.getElementById('progressBarFull');
function getFromAPI(url, callback){
  var obj;
  fetch(url)
    .then(res => res.json())
    .then(data => obj = data)
    .then(() => callback(obj))
};

getFromAPI('https://opensheet.elk.sh/1uk-DfBya4xDh5roFCh46gxnuqWM2MHHoTW12cJp-Wf8/Sheet1', getData);

function getData(arrOfObjs){
  var results = "";
  arrOfObjs.forEach( (x) => {
    results += "<div class='progressindicator'> " + x.Progreso + "<br/> <span>??rboles donados</span> </div>"
    let questionCounter = x.Progreso;
    let MAX_QUESTIONS = x.Meta;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
  })
  results += "";
  document.getElementById("progressBarFull").innerHTML = results;
};


/* On mouse movement get the mouse position, 
* and set te position of the details element.
*/
(function () {
  document.addEventListener("mousemove", parallax);
  function parallax(e) {
    let _width = window.innerWidth / 2; // Get half window width
    let _height = window.innerHeight / 2; // Get half window height
    let _mouseX = e.clientX; //horizontal coordinate
    let _mouseY = e.clientY; //vertical coordinate
    let _depthX = `${ (_mouseX - _width) * 0.01}%`;
    let _depthY = `${ (_mouseY - _height) * 0.01}%`;
    
    if (window.innerWidth > 520) {
      detailsElement.forEach( (detail) => {
        detail.style.top = `${_depthY} `;
        detail.style.left = `${_depthX} `;
      });
    };
  };
})();

//on load, stwitch from the loading screen to the main screen
document.documentElement.addEventListener("load", function(){
  document.getElementById("loading").style.display = "block";
});

window.onload = function(){
  document.getElementById("loading").style.display = "none";
};

render();
