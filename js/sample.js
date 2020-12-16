class View{
    camera;
    lighting;
    bgColour;
    l;

    static AMBIENT = 0;
    static DIRECTIONAL = 1;
    static POINT = 2;


    constructor(){
        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);
        this.lighting = [
            new this.Light(View.AMBIENT),
            new this.Light(View.DIRECTIONAL),
            new this.Light(View.POINT)];
        this.setDefault();
    }

    setDefault(){
        this.camera.position.z = 10;
        this.bgColour = "#000000";
    }

    setLighting(scene){
        for(let l of this.lighting){
            scene.add(l.light);
        }
    }

    rgbToHex(r, g, b) {
        function componentToHex(c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
          }
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
      }

    Light = class Light {
        light;
        colour;
        intensity;
        isDirectional;

        constructor(lightType){
            this.setDefaultLights(lightType);
        }

        setDefaultLights(lightType){
            this.intensity = 1.0;
            switch(lightType){
                case View.AMBIENT: 
                    this.colour = "#0ff0ff";
                    this.isDirectional = false;
                    this.intensity = 0.2;
                    this.light = new THREE.AmbientLight(this.colour, this.intensity);
                    break;
                case View.DIRECTIONAL:
                    this.colour = "#ffff00";
                    this.isDirectional = true;
                    this.intensity = 0.2;
                    this.light = new THREE.DirectionalLight(this.colour, this.intensity);
                    break;
                case View.POINT:
                    this.colour = "#ffffff";
                    this.isDirectional = true;
                    this.intensity = 1.0;
                    this.light = new THREE.PointLight(this.colour, this.intensity);
                    break;
            }
        }
    }
}

class Model{
    meshes;

    constructor(){

        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshLambertMaterial({color: 0xF7F7F7});   
        this.meshes = [15];

        for(var i = 0; i<15;i++) {
        
            var mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = (Math.random() - 0.5) * 10;
            mesh.position.y = (Math.random() - 0.5) * 10;
            mesh.position.z = (Math.random() - 0.5) * 10;

            this.meshes[i] = mesh;
        }
    }

    setMeshes(scene){
        for(let m of this.meshes){
            scene.add(m);
        }

    }
}

var scene = new THREE.Scene();
var view = new View();
var model = new Model();

var renderer = new THREE.WebGLRenderer({antialias: true}); // TODO  toggle antialias
renderer.setClearColor(view.bgColour);
renderer.setSize(window.innerWidth,window.innerHeight);

model.setMeshes(scene);
view.setLighting(scene);

document.body.appendChild(renderer.domElement);


var render = function() {
    requestAnimationFrame(render);
    renderer.render(scene, view.camera);
}

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    view.camera.aspect = window.innerWidth / window.innerHeight;

    view.camera.updateProjectionMatrix();
})

render();