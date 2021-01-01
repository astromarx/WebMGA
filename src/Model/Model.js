import {
    Scene,
    WebGLRenderer,
    PerspectiveCamera,
    OrthographicCamera
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import ParticleSet from './ParticleSet.js'
import Light from './Light.js'
import Grid from './Grid.js'

export class Model {
    configuration = [];

    scene;
    camera;
    lighting;
    bgColour;
    controls;
    origin;
    grid;
    renderer;

    height;
    width;

    gridEnabled = false;
    axesEnabled = false;
    sidebarExpanded = false;

    constructor() {
        this.scene = new Scene();
        this.setDefault();
    }

    setDefault() {
        this.height = window.innerHeight - 56;
        this.width = window.innerWidth;

        this.renderer = new WebGLRenderer({ antialias: true });

        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 30;
        //this.camera = new OrthographicCamera(window.innerWidth/-2, window.innerWidth/2, window.innerHeight/2, window.innerHeight/-2, 0.1, 1000);
        this.lighting = [
            new Light(Light.AMBIENT),
            new Light(Light.DIRECTIONAL),
            new Light(Light.POINT)];

        this.grid = new Grid(50, 0xffffff);

        this.bgColour = "#000000";
        this.renderer.setClearColor(this.bgColour);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.autoRotate = false;
        
        for (let l of this.lighting) {
            this.scene.add(l.light);
        }
        this.scene.add(this.camera);
    }

    update() {
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    toggleSidebar(){
        this.sidebarExpanded = !this.sidebarExpanded;
        this.updateDimensions();
    }

    updateDimensions(){
        this.height = (window.innerHeight-56);
        if(this.sidebarExpanded){
            this.width = window.innerWidth - 356;
        }else{
            this.width = window.innerWidth - 56;
        }
        
        this.renderer.setSize(this.width, this.height);

        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
    }

    toggleGrid() {
        this.gridEnabled = !this.gridEnabled;

        if (this.gridEnabled) {
            this.scene.add(this.grid.subGrid);
        } else {
            this.scene.remove(this.grid.subGrid);
        }
    }

    toggleAxes() {
        this.axesEnabled = !this.axesEnabled;

        if (this.axesEnabled) {
            for (let a of this.grid.axes) {
                this.scene.add(a);
            }
        } else {
            for (let a of this.grid.axes) {
                this.scene.remove(a);
            }
        }


    }

    toggleCameraRotation() {
        this.controls.autoRotate = !this.controls.autoRotate;
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

    load(data) {
        let particleSets = data.split("$");
        let setData, ps;
        for (let particleSet of particleSets) {
            if (particleSet == "") {
                return;
            }
            else {
                setData = particleSet.split("\n");
                ps = new ParticleSet(setData[0], setData[1], setData.slice(2));
                this.configuration.push(ps);
            }
        }

        this.setConfiguration();
    }


    setConfiguration() {
        for (let set of this.configuration) {
            for (const m of set.meshes) {
                this.scene.add(m);
            }
        }
    }

}

export default Model;
