import {
    AmbientLight,
    DirectionalLight,
    PointLight
} from 'three';

export class Light {
    light;

    static AMBIENT = 0;
    static DIRECTIONAL = 1;
    static POINT = 2;

    constructor(lightType) {
        this.setDefaultLights(lightType);
    }

    updatePosition(x, y, z){
        this.light.position.set(x, y, z);
    }

    updateColour(c, i){
        this.light.color.setHex(parseInt(c.substring(1), 16));
        this.light.intensity = i * 0.01;
    }

    setDefaultLights(lightType) {
        switch (lightType) {
            case 'ambient':
                this.light = new AmbientLight("#0ff0ff", 0.4);
                break;
            case 'directional':
                this.light = new DirectionalLight("#ffffff", 0.5);
                this.light.position.set(-5, 0, -5);
                break;
            case 'point':
                this.light = new PointLight("#ffffff", 0.6);
                this.light.position.set(5, 0, 5);
                break;
        }
    }
}

export default Light;