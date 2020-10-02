var scene = new THREED.Scene();
var camera = new THREED.CameraPerspective();
var renderer = new THREED.Renderer();
renderer.shadowMapEnabled = true;
//scene.fog=new THREE.FogExp2( 0xffffff, 0.015 );
//scene.fog = new THREED.Fog(0xffffff, 0.015, 100);
let plane = new THREED.Plane(60, 20, 0xffffff);
plane.receiveShadow = true;
plane.rotateall(-0.5 * Math.PI, 0, 0);
//plane.rotation.x = -0.5 * Math.PI;
plane.setposition(15, 0, 0);
//plane.position.set(15, 0, 0);
scene.add(plane);
// create a cube
var cube = new THREED.Cube(4, 4, 4, 0xff0000);
cube.showshadow = true;
// position the cube
cube.setposition(-4, 3, 0);
//cube.position.set(-4, 3, 0);
// add the cube to the scene
scene.add(cube);
//sphere
var sphere = new THREED.Sphere(4, 40, 40, 0x7777ff);
sphere.setposition(20, 4, 2);
sphere.showshadow = true;
scene.add(sphere);
// position and point the camera to the center of the scene
camera.setposition(-30, 40, 30);
camera.lookAt(scene.position);
// add spotlight for the shadows
var spotLight = new THREED.SpotLight(0xffffff);
spotLight.position.set(-40, 60, -10);
spotLight.castShadow = true;
scene.add(spotLight);
//Ambient light
var ambientLight = new THREED.AmbientLight(0x0c0c0c);
scene.add(ambientLight);
// add the output of the renderer to the html element
document.getElementById("WebGL-output").appendChild(renderer.domElement);
// render the scene
renderer.render(scene, camera);
var stats = initStats();
// call the render function
var step = 0;
renderScene();
function renderScene() {
    stats.update();
    // rotate the cube around its axes
    cube.rotation.x += 0.02;
    cube.rotation.y += 0.02;
    cube.rotation.z += 0.02;
    // bounce the sphere up and down
    step += 0.04;
    sphere.position.x = 20 + (10 * (Math.cos(step)));
    sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));
    // render using requestAnimationFrame
    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
}
function initStats() {
    var stats = new Stats();
    stats.setMode(0); // 0: fps, 1: ms
    // Align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.getElementById("Stats-output").appendChild(stats.domElement);
    return stats;
}
window.addEventListener('resize', function () { renderer.updateOnWindowSizeChange(camera); }, false);
//# sourceMappingURL=file1.js.map