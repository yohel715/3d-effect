/* To actually be able to display anything with three.js,
 *  we need three things: scene, camera and renderer,
 *  so that we can render the scene with camera.
 */
import { GLTFLoader } from "./GLTFLoader.js";
import * as THREE from "three";

var scene = new THREE.Scene(); //initilize
var camera = new THREE.PerspectiveCamera(
  75, //field of view
  window.innerWidth / window.innerHeight, //aspect ratio (w/h)
  0.1, //near plane
  1000 //far plane
);

camera.position.set(0, 0, 10); // X, Y, Z

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
const elementContainer = document.querySelector('.rendered-object');
elementContainer.appendChild(renderer.domElement); //This is a <canvas> element the renderer uses to display the scene to us.

var loader = new GLTFLoader();
var object;
loader.load("assets/vaso.gltf", function (gltf) { //load the gltf file
    object = gltf.scene; //get the scene from the gltf file
    object.scale.set(0.9, 0.9, 0.9); //scale the object, X, Y, Z
    object.position.set(0, -5.5, 0) //position the object, X, Y, Z
    object.rotation.set(0.3, 4.7, 0) //rotate the object, X, Y, Z
    scene.add(gltf.scene); //add the object to the scene
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
const mainElement = document.querySelector('body > main');
let lastScrollTop = 0;
//change the position absolute of the canva element 
const canvaElement = document.querySelector('.rendered-object > canvas');
var detailsElement = document.querySelectorAll('.details-cup-content .row .detail');

mainElement.addEventListener("scroll", function () {
  const direction = lastScrollTop > this.scrollTop ? 1 : -1;
  lastScrollTop = mainElement.scrollTop;
  //get the amount of pixels the user has scrolled
  const scrollAmount = mainElement.scrollTop;
  const windowHeight = window.innerHeight; //height of the window
  const mainElementHeight = mainElement.scrollHeight; //height of the main element
  const scrollPercentage = scrollAmount / (mainElementHeight - windowHeight);//percentage of the scroll  
  // console.log(scrollPercentage);

  if (scrollPercentage <= 0.5) {
    object.rotation.y += 0.179 * direction; //rotate the object
  }

  if (scrollPercentage >= 0.5) {
    canvaElement.style.position = "inherit";
  } 
  else if (scrollPercentage <= 0.49) {
    canvaElement.style.position = "fixed";
  }

});

render();

//if the screen is smaller than 480px, get the element by id "#detail04" and remove the break lines in the html
if (window.innerWidth <= 480) {
  const detail04 = document.getElementById("detail04");
  detail04.innerHTML = detail04.innerHTML.replace(/<br>/g, "");
}

//Progress bar
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
    // results += "<div class='metaindicator'> Meta: " + x.Meta + "</div>"
    results += "<div class='progressindicator'> " + x.Progreso + "<br/> <span>árboles donados</span> </div>"
    let questionCounter = x.Progreso;
    let MAX_QUESTIONS = x.Meta;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
  })
  results += "";
  document.getElementById("progressBarFull").innerHTML = results;
};

/*
* loading
*/

/*
function onReady(callback) {
  var intervalID = window.setInterval(checkReady, 2000);

  function checkReady() {
      if (document.getElementsByTagName('body')[0] !== undefined) {
          window.clearInterval(intervalID);
          callback.call(this);
      }
  }
}

function show(id, value) {
  document.getElementById(id).style.display = value ? 'block' : 'none';
}

onReady(function () {
   show('page', true);
   show('loading', false);
});
*/

// document.documentElement.addEventListener("load", function(){
//   document.getElementById("loading").style.display = "block";
// });

// window.onload = function(){
//   document.getElementById("loading").style.display = "none";
// }