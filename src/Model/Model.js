import {
    Scene,
    WebGLRenderer,
    PerspectiveCamera,
    OrthographicCamera,
    Vector3,
    BufferGeometry,
    PlaneHelper,
    Plane
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Set from './Set.js'
import Light from './Light.js'
import Tools from './Tools.js'
import Parameters from './Parameters.js'

export class Model {
    sets = [];

    scene;
    camera;
    lighting;
    bgColour;
    controls;
    lookAt;
    tools;
    renderer;

    height;
    width;

    gridEnabled = false;
    axesEnabled = false;
    sidebarExpanded = false;

    cameraType = 'perspective';

    selectedSet;

    planeConstants;
    clippingPlanes;
    clippingHelpers;
    clipIntersections;

    constructor() {
        this.scene = new Scene();
        this.setDefault();
    }

    setDefault() {
        this.selectedSet = 0;

        this.initClippers();

        this.renderer = new WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.localClippingEnabled = true;

        this.lookAt = new Vector3(0, 0, 0);

        this.updateDimensions();
        this.setCamera(this.cameraType);

        this.lighting = [
            new Light('ambient'),
            new Light('directional'),
            new Light('point')];

        this.tools = new Tools(50, 0xffffff);

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

    initClippers() {
        this.clippingIntersections = false;

        this.clippingPlanes = [
            new Plane(new Vector3(1, 0, 0), 50),
            new Plane(new Vector3(-1, 0, 0), 50),
            new Plane(new Vector3(0, 1, 0), 50),
            new Plane(new Vector3(0, -1, 0), 50),
            new Plane(new Vector3(0, 0, 1), 50),
            new Plane(new Vector3(0, 0, -1), 50)
        ];

        this.clippingHelpers = [
            new PlaneHelper(this.clippingPlanes[0], 100, 0xff0000),
            new PlaneHelper(this.clippingPlanes[1], 100, 0xff0000),
            new PlaneHelper(this.clippingPlanes[2], 100, 0x00ff00),
            new PlaneHelper(this.clippingPlanes[3], 100, 0x00ff00),
            new PlaneHelper(this.clippingPlanes[4], 100, 0x0000ff),
            new PlaneHelper(this.clippingPlanes[5], 100, 0x0000ff)
        ];

        for(let helper of this.clippingHelpers){
            helper.visible = true;
            this.scene.add(helper);
        }
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

    updateLookAt(l) {
        this.lookAt = new Vector3(l.x, l.y, l.z);
        this.controls.target = this.lookAt;
        this.controls.update();

    }

    toggleSidebar() {
        this.sidebarExpanded = !this.sidebarExpanded;
        this.updateDimensions();
    }

    updateBg(colour) {
        this.bgColour = Model.rgbToHex(colour.r, colour.g, colour.b);
        this.renderer.setClearColor(this.bgColour);
    }

    toggleLight(type, enabled) {
        this.lighting[type].visible = enabled;
    }

    updateLight(type, colour) {
        this.lighting[type].updateColour(Model.rgbToHex(colour.r, colour.g, colour.b), colour.i);
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
        var colour = Model.rgbToHex(rgb.r, rgb.g, rgb.b);
        this.tools.updateColour(colour);
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

        this.tools.updateSize(size);

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
            this.scene.add(this.tools.subGrid);
        } else {
            this.scene.remove(this.tools.subGrid);
        }
    }

    toggleAxes() {
        this.axesEnabled = !this.axesEnabled;

        if (this.axesEnabled) {
            for (let a of this.tools.axes) {
                this.scene.add(a);
            }
        } else {
            for (let a of this.tools.axes) {
                this.scene.remove(a);
            }
        }


    }

    toggleCameraRotation() {
        this.controls.autoRotate = !this.controls.autoRotate;
    }

    static rgbToHex(r, g, b) {
        function componentToHex(c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    updateBoundingShape(type, enabled) {
        this.scene.remove(this.tools.boundingShape);

        if (enabled) {
            this.scene.add(this.tools.genBoundingShape(type, this.sets));
        }
    }


    getParameters(val) {
        let parameters;

        switch (val) {
            case 'Ellipsoid':
                parameters = Parameters.Ellipsoid;
                break;
            case 'Spherocylinder':
                parameters = Parameters.Spherocylinder;
                break;
            case 'Spheroplatelet':
                parameters = Parameters.Spheroplatelet;
                break;
            case 'Cut Sphere':
                parameters = Parameters.CutSphere;
                break;
            case 'Sphere':
                parameters = Parameters.Sphere;
                break;
            case 'Cone':
                parameters = Parameters.Cone;
                break;
            case 'Cylinder':
                parameters = Parameters.Cylinder;
                break;
            case 'Torus':
                parameters = Parameters.Torus;
                break;

        }

        return parameters;
    }

    updateModel(id, params, f) {
        for (const m of this.sets[id].meshes) {
            this.scene.remove(m);
        }
        f(...params);
        for (const m of this.sets[id].meshes) {
            this.scene.add(m);
        }
    }

    updateLOD(val) {
        for (let i = 0; i < this.sets.length; i++) {
            this.updateModel(i, [i, val], (i, val) => {
                this.sets[i].lod = val;
                this.sets[i].meshes = [];
                this.sets[i].genGeometries();
                this.sets[i].setElements();
                this.sets[i].genMeshes();
            });
        }
    }

    updateUserColour(id, colour) {
        this.updateModel(id, [id, colour], (id, colour) => {
            this.sets[id].meshes = [];
            this.sets[id].setUserColour(Model.rgbToHex(colour.r, colour.g, colour.b));
            this.sets[id].genMeshes();
        });
    }

    updateShape(shape, id, parameters) {
        this.updateModel(id, [id, shape, parameters], (id, shape, parameters) => {
            this.sets[id].meshes = [];
            this.sets[id].type = shape;
            this.sets[id].parameters = parameters.vals;
            this.sets[id].genGeometries();
            this.sets[id].setElements();
            this.sets[id].genMeshes();
        });
    }

    updateShininess(id, val) {
        this.updateModel(id, [id, val], (id, val) => {
            this.sets[id].meshes = [];
            this.sets[id].shininess = val;
            this.sets[id].genMeshes();
        });
    }

    toggleWireframe(id, toggle) {
        this.updateModel(id, [id, toggle], (id, toggle) => {
            this.sets[id].meshes = [];
            this.sets[id].wireframe = toggle;
            this.sets[id].genMeshes();
        });
    }

    toggleUserColour(id, toggle) {
        this.updateModel(id, [id, toggle], (id, toggle) => {
            this.sets[id].meshes = [];
            this.sets[id].colourByDirector = toggle;
            this.sets[id].genMeshes();
        });
    }

    load(data) {
        let sets = data.split("$");
        let setData, ps;
        for (let set of sets) {
            if (set == "") {
                return;
            }
            else {
                setData = set.split("\n");
                ps = new Set(setData[0], setData[1], setData.slice(2), this.clippingPlanes, this.clippingIntersections);
                this.sets.push(ps);
            }
        }

        this.setConfiguration();
    }


    setConfiguration() {
        for (let set of this.sets) {
            for (const m of set.meshes) {
                this.scene.add(m);
            }
        }
    }

}

export default Model;
