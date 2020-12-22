import {PerspectiveCamera,
    AmbientLight,
    DirectionalLight,
    PointLight} from './lib/three.module.js';
import { OrbitControls } from './lib/OrbitControls.js';

export class View{
    camera;
    lighting;
    bgColour;
    controls;
    origin;

    static AMBIENT = 0;
    static DIRECTIONAL = 1;
    static POINT = 2;


    constructor(){
        this.camera = new PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);
        this.lighting = [
            new this.Light(View.AMBIENT),
            new this.Light(View.DIRECTIONAL),
            new this.Light(View.POINT)];
        this.setDefault();
    }

    setDefault(){
        this.camera.position.z = 30;
        this.bgColour = "#000000";
    }

    setControls(domElement){
        this.controls = new OrbitControls(this.camera, domElement);
        this.controls.enableKeys = true;
        this.controls.autoRotate = true;
    }

    setLighting(scene){
        for(let l of this.lighting){
            scene.add(l.light);
        }

    }

    adjustCamera(direction, scene){
        let rotSpeed = .05;

        let camera = this.camera;

        let x = camera.position.x,
        y = camera.position.y,
        z = camera.position.z;

        switch(direction){
            case 'up':
                camera.position.y = y * Math.cos(rotSpeed) + z * Math.sin(rotSpeed);
                camera.position.z = z * Math.cos(rotSpeed) - y * Math.sin(rotSpeed);
                break;
            case 'down':
                camera.position.y = y * Math.cos(rotSpeed) - z * Math.sin(rotSpeed);
                camera.position.z = z * Math.cos(rotSpeed) + y * Math.sin(rotSpeed);
                break;
            case 'left':
                camera.position.x = x * Math.cos(rotSpeed) + z * Math.sin(rotSpeed);
                camera.position.z = z * Math.cos(rotSpeed) - x * Math.sin(rotSpeed);
                break;
            case 'right':
                camera.position.x = x * Math.cos(rotSpeed) - z * Math.sin(rotSpeed);
                camera.position.z = z * Math.cos(rotSpeed) + x * Math.sin(rotSpeed);
                break;
        }

        camera.lookAt(scene.position);
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
                    this.intensity = 1.0;
                    this.light = new PointLight(this.colour, this.intensity);
                    this.light.position.set(5,0,2);
                    break;
            }
        }
    }
}

