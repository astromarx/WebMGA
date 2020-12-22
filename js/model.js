import {Mesh, MeshLambertMaterial} from './lib/three.module.js';
import * as SHAPE from './shapes.js';

export class Model{
    meshes = [];

    //placeholder material
    material = new MeshLambertMaterial({color: 0xF7F7F7});


    shapeType = {
        ELLIPSOID : 1,
        CUBE: 2
    }

    constructor(){
        this.sample();
    }

    genShapes(num){
        let shape; 
        if(num == 0){
            shape = new SHAPE.CutSphere(2, 0.5);
            shape.translate(-5,-5, 0);
        }else if(num == 1){
            shape = new SHAPE.Spherocylinder(2, 8);
            shape.translate(5,-5, 0);
        }else if(num == 2){
            shape = new SHAPE.Spheroplatelet(1.5, 0.8);
            shape.translate(-5, 5, 0);
        }else if(num == 3){
            shape = new SHAPE.Ellipsoid(1.5, 4, 2);
            shape.translate(5, 5, 0);
        }

        let m;
        for (let f of shape.fanGeometries){
            m = new Mesh(f, this.material);
            this.meshes.push(m);
        }
        
        m = new Mesh(shape.stripGeometry, this.material);
        this.meshes.push(m);
                
    }    
 
    sample(){
        this.genShapes(0);
        this.genShapes(1);
        this.genShapes(2);
        this.genShapes(3);
    }

    setShapes(scene){
        for(const m of this.meshes){
            scene.add(m);
        }
    }

    genMeshes(){

    }

}