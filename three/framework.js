var THREED;
(function (THREED) {
    class Scene extends THREE.Scene {
        constructor() {
            super();
        }
        add(value) {
            //console.log("kkkk");
            super.add(value);
        }
    }
    THREED.Scene = Scene;
    class CameraPerspective extends THREE.PerspectiveCamera {
        constructor() {
            super();
            this._angle = 45;
            this._aspectratio = window.innerWidth / window.innerHeight;
            this._near = 0.1;
            this._far = 1000;
            this.fov = this._angle;
            this.aspect = this._aspectratio;
            this.far = this._far;
            this.near = this._near;
            this.updateProjectionMatrix();
        }
        get angle() {
            return (this._angle);
        }
        set angle(value) {
            this._angle = value;
            this.fov = this._angle;
            this.updateProjectionMatrix();
        }
        get aspectratio() {
            return (this._aspectratio);
        }
        set aspectratio(value) {
            this._aspectratio = value;
            this.aspect = this._aspectratio;
            this.updateProjectionMatrix();
        }
        get near1() {
            return (this._near);
        }
        set near1(value) {
            this._near = value;
            this.near = this._near;
            this.updateProjectionMatrix();
        }
        get far1() {
            return (this._far);
        }
        set far1(value) {
            this._far = value;
            this.far = this._far;
            this.updateProjectionMatrix();
        }
        setposition(x, y, z) {
            this.position.x = x;
            this.position.y = y;
            this.position.z = z;
        }
    }
    THREED.CameraPerspective = CameraPerspective;
    class Renderer extends THREE.WebGLRenderer {
        constructor() {
            super();
            this.setClearColor(new THREED.Color(0xEEEEEE, 1), 1);
            this.setSize(window.innerWidth, window.innerHeight);
        }
        initrenderer() {
            //super.setClearColorHex();
            //super.setClearColor(new THREE.Color(0xEEEEEE));
            //super.setSize(window.innerWidth, window.innerHeight);
        }
        myrender(scene, camera) {
            this.render(scene, camera);
            console.log("i am here");
        }
        //when windows size changes this function need to be executed
        updateOnWindowSizeChange(camera) {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            this.setSize(window.innerWidth, window.innerHeight);
        }
    }
    THREED.Renderer = Renderer;
    class Color extends THREE.Color {
        constructor(value, code) {
            super(value);
            //super.set();
        }
    }
    THREED.Color = Color;
    class AxisHelper extends THREE.AxisHelper {
        constructor(value) {
            super(value);
            //super.AxisHelper(value);
        }
    }
    THREED.AxisHelper = AxisHelper;
    class Plane extends THREE.Mesh {
        constructor(length, width, hexcolor) {
            super(new THREE.PlaneGeometry(length, width), new THREE.MeshLambertMaterial({ color: hexcolor }));
            //super.rotation.x = 0.1;
        }
        set receiveShadow(value) {
            super.receiveShadow = value;
        }
        set rotatex(value) {
            this.rotation.x = value;
        }
        set rotatey(value) {
            this.rotation.y = value;
        }
        set rotatez(value) {
            this.rotation.z = value;
        }
        rotateall(x, y, z) {
            this.rotatex = x;
            this.rotatey = y;
            this.rotatez = z;
        }
        setposition(x, y, z) {
            this._px = x; //not working
            this._py = y;
            this._pz = z;
            this.position.x = x;
            this.position.y = y;
            this.position.z = z;
        }
    }
    THREED.Plane = Plane;
    class Cube extends THREE.Mesh {
        constructor(length, width, height, hexcolor) {
            super(new THREE.BoxGeometry(length, width, height), new THREE.MeshLambertMaterial({ color: hexcolor }));
        }
        set showshadow(value) {
            this.castShadow = value;
        }
        setposition(x, y, z) {
            this._px = x; //not working
            this._py = y;
            this._pz = z;
            this.position.x = this._px;
            this.position.y = this._py;
            this.position.z = this._pz;
            //= new THREE.Vector3(this._px, this._py, this._pz);
        }
    }
    THREED.Cube = Cube;
    class SpotLight extends THREE.SpotLight {
        constructor(hexcolor) {
            super(hexcolor);
        }
    }
    THREED.SpotLight = SpotLight;
    class Sphere extends THREE.Mesh {
        constructor(length, widthseg, heightseg, hexcolor) {
            super(new THREE.SphereGeometry(length, widthseg, heightseg), new THREE.MeshLambertMaterial({ color: hexcolor }));
        }
        set showshadow(value) {
            this.castShadow = value;
        }
        setposition(x, y, z) {
            this._px = x; //not working
            this._py = y;
            this._pz = z;
            this.position.x = this._px;
            this.position.y = this._py;
            this.position.z = this._pz;
            //= new THREE.Vector3(this._px, this._py, this._pz);
        }
    }
    THREED.Sphere = Sphere;
    class AmbientLight extends THREE.AmbientLight {
        constructor(hexcolor) {
            super(hexcolor);
        }
    }
    THREED.AmbientLight = AmbientLight;
    class Fog extends THREE.Fog {
        constructor(hexcolor, near, far) {
            super(hexcolor, near, far);
        }
    }
    THREED.Fog = Fog;
    class STLLoader {
        load(filename, scene, scale, name) {
            var loader = new THREE.STLLoader();
            loader.load(filename, function (geometry) {
                //console.log(geometry);
                geometry.computeFaceNormals();
                geometry.computeVertexNormals();
                //#ECEF16 //0x7777ff 
                var mat = new THREE.MeshPhongMaterial({ color: 0xECEF16 });
                //var mat = new THREE.MeshLambertMaterial({color: 0x7777ff});
                var group = new THREE.Mesh(geometry, mat);
                group.rotation.x = -0.5 * Math.PI;
                //group.scale.set(0.6, 0.6, 0.6);
                group.scale.set(scale, scale, scale);
                group.name = name;
                scene.add(group);
            });
        }
    }
    THREED.STLLoader = STLLoader;
    class mesh extends THREE.Mesh {
        constructor(geomerty, hexcolor) {
            super(geomerty, new THREE.MeshPhongMaterial({ color: hexcolor }));
        }
    }
    THREED.mesh = mesh;
    class Vector3 extends THREE.Vector3 {
        constructor(x, y, z) {
            super(x, y, z);
        }
    }
    THREED.Vector3 = Vector3;
    class CylinderGeometry extends THREE.CylinderGeometry {
    }
    THREED.CylinderGeometry = CylinderGeometry;
    class IcosahedronGeometry extends THREE.IcosahedronGeometry {
    }
    THREED.IcosahedronGeometry = IcosahedronGeometry;
    //export class ConvexGeometry extends THREE.ConvexGeometry {  }
    class LatheGeometry extends THREE.LatheGeometry {
    }
    THREED.LatheGeometry = LatheGeometry;
    class TetrahedronGeometry extends THREE.TetrahedronGeometry {
    }
    THREED.TetrahedronGeometry = TetrahedronGeometry;
    class TorusGeometry extends THREE.TorusGeometry {
    }
    THREED.TorusGeometry = TorusGeometry;
    class TorusKnotGeometry extends THREE.TorusKnotGeometry {
    }
    THREED.TorusKnotGeometry = TorusKnotGeometry;
    class Face3 extends THREE.Face3 {
    }
    THREED.Face3 = Face3;
    class MeshLambertMaterial extends THREE.MeshLambertMaterial {
    }
    THREED.MeshLambertMaterial = MeshLambertMaterial;
    class Geometry extends THREE.Geometry {
    }
    THREED.Geometry = Geometry;
    class Material {
        getLambertMat(hexcolor) {
            var mat = new THREED.MeshLambertMaterial({ color: hexcolor });
            return (mat);
        }
        getPhongMat(hexcolor) {
            var mat = new THREE.MeshPhongMaterial({ color: hexcolor });
            return (mat);
        }
    }
    THREED.Material = Material;
    class Raycaster extends THREE.Raycaster {
    }
    THREED.Raycaster = Raycaster;
})(THREED || (THREED = {}));
window.addEventListener('resize', function () { renderer.updateOnWindowSizeChange(camera); }, false);
//# sourceMappingURL=framework.js.map