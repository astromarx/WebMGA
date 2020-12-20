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

    genShapes(){
        let shape; 
        shape = new Spheroplatelet(2, 2, 5);

        let m;

        for(const g of shape.fanGeometries){
            m = new THREE.Mesh(g, this.material);
            m.drawMode = THREE.TriangleFanDrawMode;
            this.meshes.push(m);
        }

        for(const g of shape.stripGeometries){
            m = new THREE.Mesh(g, this.material);
            m.drawMode = THREE.TriangleStripDrawMode;
            this.meshes.push(m);
        }
        
    }    
 
    sample(){
        this.genShapes();
    }

    setShapes(scene){
        for(const m of this.meshes){
            scene.add(m);
        }
    }

    genMeshes(){

    }

}