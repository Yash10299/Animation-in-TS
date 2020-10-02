class myhello {
    constructor() {
        this.msg = "manish";
    }
    hello(msg) {
        this.msg = typeof msg == 'undefined' ? this.msg : msg;
        alert(msg);
    }
}
//scene
var scene = new THREED.Scene();
//camera
var camera = new THREED.CameraPerspective();
camera.setposition(150, 150, 150);
camera.lookAt(scene.position); //(new THREE.Vector3(0, 40, 0));
//stl load
var loader = new THREED.STLLoader();
loader.load("../assets/models/rocktopus.stl", scene, 2, "rocktopus");
//spotlight
var spotLight = new THREED.SpotLight(0xffffff);
spotLight.position.set(100, 100, 50);
spotLight.castShadow = true;
scene.add(spotLight);
//ambient light
var ambientlight = new THREED.AmbientLight(0x0c0c0c);
scene.add(ambientlight);
//render
var renderer = new THREED.Renderer();
// add the output of the renderer to the html element
document.getElementById("WebGL-output").appendChild(renderer.domElement);
// render the scene
renderer.render(scene, camera);
var matchange = false;
var child;
document.addEventListener('mousedown', onDocumentMouseDown, false);
var rotation = 0.006;
//var mee1 = new myhello();
//mee1.hello();
render();
function render() {
    var i = 0;
    for (i = 0; i < scene.children.length; i++) {
        if (scene.children[i].name == "rocktopus") {
            child = scene.children[i];
            child.rotation.z += rotation;
            //if (child.rotation.z > 1 && matchange == false) {
            //    var mat = new THREED.Material();
            //    child.material = mat.getPhongMat(0x7777ff);
            //    matchange = true;
            //}
            //scene.children[i].rotation.z += 0.006;
            //console.log(scene.children[i].name);
            break;
        }
    }
    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
var projector = new THREE.Projector();
function onDocumentMouseDown(event) {
    var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
    vector = vector.unproject(camera);
    var raycaster = new THREED.Raycaster(camera.position, vector.sub(camera.position).normalize());
    var intersects = raycaster.intersectObjects([child]);
    if (intersects.length > 0) {
        console.log(intersects[0]);
        var mymesh = intersects[0].object;
        //mymesh.material.transparent = true;
        //mymesh.material.opacity = 0.1;
        var mat = new THREED.Material();
        mymesh.material = mat.getPhongMat(0x7777ff);
        mymesh.material.transparent = true;
        mymesh.material.opacity = 0.5;
        if (rotation < 0) {
            mymesh.material.transparent = false;
            //mymesh.material.opacity = 0.5;
        }
        rotation = rotation * (-1);
    }
}
//window.addEventListener('resize', function () { renderer.updateOnWindowSizeChange(camera); }, false);
//mesh
//console.log(scene.children.length);
//var i = 0;
//var mt = setInterval(function () {
//    console.log(scene.children.length + "  ");
//    i++;
//    if (i > 20)
//        clearInterval(mt);
//}, 100);
//# sourceMappingURL=stlload.js.map