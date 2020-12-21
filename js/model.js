class Model{
    meshes = [];

    //placeholder material
    material = new THREE.MeshLambertMaterial({color: 0xF7F7F7});


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
            shape = new CutSphere(2, 0.3);
        }else if(num == 1){
            shape = new Spherocylinder(2, 8);
        }else if(num == 2){
            shape = new Spheroplatelet(1.5, 0.8);
        }else if(num == 3){
            shape = new Ellipsoid(1.5, 4, 2);
        }
        let m;

        for(const g of shape.fanGeometries){

            if(num == 0){
                g.translate(5,5,0);
            }
            else if(num == 1){
                g.translate(-5,5,0);
            }
            else if(num == 2){
                g.translate(-5,-5,0);
            }
            else if(num == 3){
                g.translate(5,-5,0);
            }

            m = new THREE.Mesh(g, this.material);
            m.drawMode = THREE.TriangleFanDrawMode;
            this.meshes.push(m);
        }

        for(const g of shape.stripGeometries){
            if(num == 0){
                g.translate(5,5,0);
            }
            else if(num == 1){
                g.translate(-5,5,0);
            }
            else if(num == 2){
                g.translate(-5,-5,0);
            }
            else if(num == 3){
                g.translate(5,-5,0);
            }
            m = new THREE.Mesh(g, this.material);
            m.drawMode = THREE.TriangleStripDrawMode;
            this.meshes.push(m);
        }
        
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