
namespace THREED
{
     export class Scene extends THREE.Scene
    {
        constructor()
        {
            super();
         }
         public add(value)
         {
             //console.log("kkkk");
             super.add(value);
         }
    }

    export class CameraPerspective extends THREE.PerspectiveCamera
    {
        private _angle: number = 45;
        private _aspectratio: number = window.innerWidth / window.innerHeight;
        private _near: number=0.1;
        private _far: number=1000;
        constructor()
        {
            super();
            this.fov = this._angle;
            this.aspect = this._aspectratio;
            this.far = this._far;
            this.near = this._near;
            this.updateProjectionMatrix();

        }
        get angle(): number
        {
            return (this._angle);
        }
        set angle(value: number)
        {
            this._angle = value;
            this.fov = this._angle;
            this.updateProjectionMatrix();
        }

        get aspectratio(): number {
            return (this._aspectratio);
        }
        set aspectratio(value: number) {
            this._aspectratio = value;
            this.aspect = this._aspectratio;
            this.updateProjectionMatrix();
        }

        get near1(): number {
            return (this._near);
        }
        set near1(value: number) {
            this._near = value;
            this.near = this._near;
            this.updateProjectionMatrix();
        }

        get far1(): number {
            return (this._far);
        }
        set far1(value: number) {
            this._far = value;
            this.far = this._far;
            this.updateProjectionMatrix();
        }
        public setposition(x: number, y: number, z: number) {
            
            this.position.x = x;
            this.position.y = y;
            this.position.z = z;
        }
    }

    export class Renderer extends THREE.WebGLRenderer
    {
        constructor()
        {
            super();
            this.setClearColor(new THREED.Color(0xEEEEEE, 1), 1);
            this.setSize(window.innerWidth, window.innerHeight);
            
        }
        public initrenderer()
        {
            //super.setClearColorHex();
            //super.setClearColor(new THREE.Color(0xEEEEEE));
            //super.setSize(window.innerWidth, window.innerHeight);
        }
        public myrender(scene: Scene, camera: CameraPerspective)
        {
            this.render(scene, camera);
            console.log("i am here");
        }
        //when windows size changes this function need to be executed
        public updateOnWindowSizeChange(camera) {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            this.setSize(window.innerWidth, window.innerHeight);
        }
    }
    export class Color extends THREE.Color
    {
        
        constructor(value,code)
        {
            super(value);
            //super.set();
        }
    }
    export class AxisHelper extends THREE.AxisHelper {
        constructor(value)
        {
            super(value);
            //super.AxisHelper(value);

        }

        
    }

    export class Plane extends THREE.Mesh {
        private _px: number;
        private _py: number;
        private _pz: number;
        constructor(length: number, width: number, hexcolor: any) {
            super(new THREE.PlaneGeometry(length, width), new THREE.MeshLambertMaterial({ color: hexcolor } ));
            //super.rotation.x = 0.1;
        }
        set receiveShadow(value: boolean) {
            super.receiveShadow = value;
        }
        set rotatex(value: number) {
            this.rotation.x = value;
            
        }
        set rotatey(value: number) {
            this.rotation.y=value;
        }
        set rotatez(value: number) {
            this.rotation.z=value;
        }
        public rotateall(x: number, y: number, z: number) {
            this.rotatex = x;
            this.rotatey = y;
            this.rotatez = z;

        }
        public setposition(x: number, y: number, z: number) {
            this._px = x;//not working
            this._py = y;
            this._pz = z;
            this.position.x = x;
            this.position.y = y;
            this.position.z = z;
        }
        
    }
    export class Cube extends THREE.Mesh {
        private _px: number;
        private _py: number;
        private _pz: number;
        constructor(length: number, width: number, height: number, hexcolor: any) {
            super(new THREE.BoxGeometry(length, width, height), new THREE.MeshLambertMaterial({ color: hexcolor }))
        }
        set showshadow(value: boolean) {
            this.castShadow = value;
        }
        public setposition(x: number, y: number, z: number) {
            this._px = x;//not working
            this._py = y;
            this._pz = z;
            
            this.position.x = this._px;
            this.position.y = this._py
            this.position.z = this._pz
                //= new THREE.Vector3(this._px, this._py, this._pz);
        }
    }

    export class SpotLight extends THREE.SpotLight {
        constructor(hexcolor) {
            super(hexcolor);
        }
    }
    export class Sphere extends THREE.Mesh {
        private _px: number;
        private _py: number;
        private _pz: number;
        constructor(length: number, widthseg: number, heightseg: number, hexcolor: any) {
            super(new THREE.SphereGeometry(length, widthseg, heightseg), new THREE.MeshLambertMaterial({ color: hexcolor }))
        }
        set showshadow(value: boolean) {
            this.castShadow = value;
        }
        public setposition(x: number, y: number, z: number) {
            this._px = x;//not working
            this._py = y;
            this._pz = z;
            this.position.x = this._px;
            this.position.y = this._py
            this.position.z = this._pz
            //= new THREE.Vector3(this._px, this._py, this._pz);
        }
    }

    export class AmbientLight extends THREE.AmbientLight {
        constructor(hexcolor) {
            super(hexcolor);
        }
    }
    export class Fog extends THREE.Fog
    {
        constructor(hexcolor, near: number, far: number) {
            super(hexcolor, near, far);
        }
    }
    export class STLLoader {
        
        
        load(filename: string, scene, scale: number, name: string) {
            
            
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
    export class mesh extends THREE.Mesh {
        constructor(geomerty,hexcolor) {
            super(geomerty, new THREE.MeshPhongMaterial({ color: hexcolor }))
        }
    }
    export class Vector3 extends THREE.Vector3 {
        constructor(x: number, y: number, z: number) {
            super(x, y, z);
        }
    }
    export class CylinderGeometry extends THREE.CylinderGeometry {

    }
    export class IcosahedronGeometry extends THREE.IcosahedronGeometry {

    }
    //export class ConvexGeometry extends THREE.ConvexGeometry {  }
    export class LatheGeometry extends THREE.LatheGeometry { }
    export class TetrahedronGeometry extends THREE.TetrahedronGeometry { }
    export class TorusGeometry extends THREE.TorusGeometry { }
    export class TorusKnotGeometry extends THREE.TorusKnotGeometry { }
    export class Face3 extends THREE.Face3 { }
    export class MeshLambertMaterial extends THREE.MeshLambertMaterial { }
    export class Geometry extends THREE.Geometry { }
    export class Material {
        public getLambertMat(hexcolor): THREED.MeshLambertMaterial {
            var mat = new THREED.MeshLambertMaterial({ color: hexcolor });
            return (mat);
        }
        public getPhongMat(hexcolor): THREED.MeshLambertMaterial {
            var mat = new THREE.MeshPhongMaterial({ color: hexcolor });
            return (mat);
        }
    }

    export class Raycaster extends THREE.Raycaster { }
}

window.addEventListener('resize', function () { renderer.updateOnWindowSizeChange(camera); }, false);