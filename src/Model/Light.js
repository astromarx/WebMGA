import {
    AmbientLight,
    DirectionalLight,
    PointLight
} from 'three';

export class Light {
    light;
    colour;
    intensity;
    isDirectional;

    static AMBIENT = 0;
    static DIRECTIONAL = 1;
    static POINT = 2;

    constructor(lightType) {
        this.setDefaultLights(lightType);
    }

    setDefaultLights(lightType) {
        switch (lightType) {
            case Light.AMBIENT:
                this.colour = "#0ff0ff";
                this.isDirectional = false;
                this.intensity = 0.4;
                this.light = new AmbientLight(this.colour, this.intensity);
                break;
            case Light.DIRECTIONAL:
                this.colour = "#ffff00";
                this.isDirectional = true;
                this.intensity = 0.5;
                this.light = new DirectionalLight(this.colour, this.intensity);
                break;
            case Light.POINT:
                this.colour = "#ffffff";
                this.isDirectional = true;
                this.intensity = 0.6;
                this.light = new PointLight(this.colour, this.intensity);
                this.light.position.set(5, 0, 2);
                break;
        }
    }
}

export default Light;