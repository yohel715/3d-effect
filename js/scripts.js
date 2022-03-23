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

camera.position.z = 10;

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
    renderer.render(scene, camera);
}

document.body.appendChild(renderer.domElement); //This is a <canvas> element the renderer uses to display the scene to us.

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial({color: 0xF1F1F1});
var mesh = new THREE.Mesh(geometry, material);

//mesh.rotation.set(0, 1, 0);
//mesh.position.set(0, 0, 0);

scene.add(mesh);

meshX = -10;

for(var i = 0; i<15;i++) {
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * 10;
    mesh.position.y = (Math.random() - 0.5) * 10;
    mesh.position.z = (Math.random() - 0.5) * 10;
    scene.add(mesh);
    meshX+=1;
}

//source light for the scene
var light = new THREE.PointLight(0xFFFFFF, 1, 1000)
light.position.set(0,0,0);
scene.add(light);

//source light for the scene
var light = new THREE.PointLight(0xFFFFFF, 2, 1000)
light.position.set(0,0,25);
scene.add(light);

function onMouseMove(event) {
    event.preventDefault();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children, true);
    for (var i = 0; i < intersects.length; i++) {
        this.tl = new TimelineMax();
        this.tl.to(intersects[i].object.scale, 1, {x: 2, ease: Expo.easeOut})
        this.tl.to(intersects[i].object.scale, .5, {x: .5, ease: Expo.easeOut})
        this.tl.to(intersects[i].object.position, .5, {x: 2, ease: Expo.easeOut})
        this.tl.to(intersects[i].object.rotation, .5, {y: Math.PI*.5, ease: Expo.easeOut}, "=-1.5")
    }
};

window.addEventListener('mousemove', onMouseMove);
render();