import {WebGLRenderer,
    PerspectiveCamera,
    OrthographicCamera,
    AmbientLight,
    DirectionalLight,
    PointLight,
    GridHelper,
    LineBasicMaterial,
    Vector3, 
    BufferGeometry,
    Line} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class View{
    camera;
    lighting;
    bgColour;
    controls;
    origin;
    grid;
    renderer;

    gridEnabled = false;
    axesEnabled = false;

    static AMBIENT = 0;
    static DIRECTIONAL = 1;
    static POINT = 2;


    constructor(){
        this.setDefault();
    }

    update(scene){
      this.controls.update();
      this.renderer.render(scene, this.camera);
    }

    resetAspect(){
        this.renderer.setSize(window.innerWidth,window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }

    setDefault(){
        this.renderer = new WebGLRenderer({ antialias: true });
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
    
        this.camera = new PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);
        this.camera.position.z = 30;
        //this.camera = new OrthographicCamera(window.innerWidth/-2, window.innerWidth/2, window.innerHeight/2, window.innerHeight/-2, 0.1, 1000);
        this.lighting = [
            new this.Light(View.AMBIENT),
            new this.Light(View.DIRECTIONAL),
            new this.Light(View.POINT)];

        this.grid = new this.Grid(50, 0xffffff);
        
        this.bgColour = "#000000";
        this.renderer.setClearColor(this.bgColour);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.autoRotate = false;
        
    }

    set(scene){
        for(let l of this.lighting){
            scene.add(l.light);
        }
        scene.add(this.camera);
    }

    toggleGrid(scene){
        this.gridEnabled = !this.gridEnabled;

        if(this.gridEnabled){
           scene.add(this.grid.subGrid);
        }else{
           scene.remove(this.grid.subGrid);
        }
    }

    toggleAxes(scene){
        this.axesEnabled = !this.axesEnabled;


        if(this.axesEnabled){
            for(let a of this.grid.axes){
                scene.add(a);
            }
        }else{
            for(let a of this.grid.axes){
                scene.remove(a);
            }
        }

        
    }

    toggleCameraRotation(){
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

    Grid = class Grid {
        subGrid;
        axes = [];

        size;
        colour;

        constructor(s, c){
            this.size = s;
            this.colour = c;
            this.subGrid = new GridHelper(s, s, c, c);
            this.genAxes();
            
        }

        genAxes(){
            var axesMaterial = new LineBasicMaterial( {
                color: this.colour,
                linewidth: 3
            } );

            let axesSize = this.size /2;
            this.axes.push(new Line(new BufferGeometry().setFromPoints([new Vector3(-axesSize, 0, 0), new Vector3(axesSize, 0, 0)]), axesMaterial));
            this.axes.push(new Line(new BufferGeometry().setFromPoints([new Vector3(0, -axesSize, 0), new Vector3(0, axesSize, 0)]), axesMaterial));
            this.axes.push(new Line(new BufferGeometry().setFromPoints([new Vector3(0, 0, -axesSize), new Vector3(0, 0, axesSize)]), axesMaterial));
        }

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
            switch(lightType){
                case View.AMBIENT: 
                    this.colour = "#0ff0ff";
                    this.isDirectional = false;
                    this.intensity = 0.4;
                    this.light = new AmbientLight(this.colour, this.intensity);
                    break;
                case View.DIRECTIONAL:
                    this.colour = "#ffff00";
                    this.isDirectional = true;
                    this.intensity = 0.5;
                    this.light = new DirectionalLight(this.colour, this.intensity);
                    break;
                case View.POINT:
                    this.colour = "#ffffff";
                    this.isDirectional = true;
                    this.intensity = 0.6;
                    this.light = new PointLight(this.colour, this.intensity);
                    this.light.position.set(5,0,2);
                    break;
            }
        }
    }
}

