class Model{
    meshes = [];

    shapeType = {
        ELLIPSOID : 1,
        CUBE: 2
    }

    constructor(){
        this.sample();

    }

    genShape(type){
        let shape; 
        shape = new Spherocylinder(3, 2);
        this.meshes.push(...shape.meshes);
        
    }    
 
    sample(){
        this.genShape(0);
    }

    setShapes(scene){
        for(let m of this.meshes){
            scene.add(m);
        }
    }

}