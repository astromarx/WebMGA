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

    update(c, i){
        //console.log();

        this.light.color.setHex(parseInt(c.substring(1), 16));
        this.light.intensity = i * 0.01;
    }

    setDefaultLights(lightType) {
        switch (lightType) {
            case 'ambient':
                this.light = new AmbientLight("#0ff0ff", 0.4);
                break;
            case 'directional':
                this.light = new DirectionalLight("#ffff00", 0.5);
                break;
            case 'point':
                this.light = new PointLight("#ffffff", 0.6);
                this.light.position.set(5, 0, 2);
                break;
        }
    }
}

export default Light;