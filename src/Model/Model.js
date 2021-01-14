import {
    Scene,
    WebGLRenderer,
    PerspectiveCamera,
    OrthographicCamera,
    Vector3
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
    lookAt;
    grid;
    renderer;

    height;
    width;

    gridEnabled = false;
    axesEnabled = false;
    sidebarExpanded = false;

    cameraType = 'perspective';

    constructor() {
        this.scene = new Scene();
        this.setDefault();
    }

    setDefault() {

        this.renderer = new WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.lookAt = new Vector3(0,0,0);

        this.updateDimensions();
        this.setCamera(this.cameraType);

        this.lighting = [
            new Light('ambient'),
            new Light('directional'),
            new Light('point')];

        this.grid = new Grid(50, 0xffffff);

        this.bgColour = "#000000";
        this.renderer.setClearColor(this.bgColour);


        for (let l of this.lighting) {
            this.scene.add(l.light);
        }
        this.scene.add(this.camera);
    }

    update() {
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    updateDimensions() {
        this.height = (window.innerHeight - 56);

        if (this.sidebarExpanded) {
            this.width = window.innerWidth - 356;
        } else {
            this.width = window.innerWidth - 56;
        }

        this.renderer.setSize(this.width, this.height);
    }

    setCamera(type) {
        if (type == 'perspective') {
            this.camera = new PerspectiveCamera(50, this.width / this.height, 0.1, 1000);
        } else {
            this.camera = new OrthographicCamera(this.width / -2, this.width / 2, this.height / 2, this.height / -2, 0.1, 1000);
            this.camera.zoom = 10;
            console.log(this.camera.zoom);
        }

        this.camera.position.z = 30;
        
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target = this.lookAt;
    }

    updateCamera() {
        if (this.cameraType == 'perspective') {
            this.camera.aspect = this.width / this.height;
        } else {
            this.camera.left = this.width / - 2;
            this.camera.right = this.width / 2;
            this.camera.top = this.height / 2;
            this.camera.bottom = this.height / 2;
        }
        this.camera.updateProjectionMatrix();
    }

    updateLookAt(l){
        this.lookAt = new Vector3(l.x,l.y,l.z);
        this.controls.target = this.lookAt;
        this.controls.update();

    }

    toggleSidebar() {
        this.sidebarExpanded = !this.sidebarExpanded;
        this.updateDimensions();
    }

    updateBg(colour) {
        this.bgColour = this.rgbToHex(colour.r, colour.g, colour.b);
        this.renderer.setClearColor(this.bgColour);
    }

    toggleLight(type, enabled) {
        this.lighting[type].visible = enabled;
    }

    updateLight(type, colour) {
        this.lighting[type].updateColour(this.rgbToHex(colour.r, colour.g, colour.b), colour.i);
    }

    updateLightPosition(type, pos) {
        this.lighting[type].updatePosition(pos.x, pos.y, pos.z);
    }

    updateGridColour(rgb) {
        let passGrid = false;
        let passAxes = false;
        if (this.gridEnabled) {
            this.toggleGrid();
            passGrid = true;
        }
        if (this.axesEnabled) {
            this.toggleAxes();
            passAxes = true;
        }
        var colour = this.rgbToHex(rgb.r, rgb.g, rgb.b);
        this.grid.updateColour(colour);
        if (passGrid) {
            this.toggleGrid();
        }
        if (passAxes) {
            this.toggleAxes();
        }
    }

    updateGridSize(size) {
        let passGrid = false;
        let passAxes = false;
        if (this.gridEnabled) {
            this.toggleGrid();
            passGrid = true;
        }
        if (this.axesEnabled) {
            this.toggleAxes();
            passAxes = true;
        }

        this.grid.updateSize(size);

        if (passGrid) {
            this.toggleGrid();
        }
        if (passAxes) {
            this.toggleAxes();
        }
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
