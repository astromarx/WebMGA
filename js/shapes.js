class Shape {

    //complexity attributes
    levels = 2;
    maxComplexity = [20, 20]
    minComplexity = [0, 0]

    //shape model attributes
    args;

    //graphics components
    meshes = [];
    geometries = [];

    //placeholder material
    material = new THREE.MeshLambertMaterial({color: 0xF7F7F7});

    constructor(){
        this.args = arguments[0];
    }

    normalize(vec, scale){
        vec[0] /= Math.pow(scale[0], 2.0);
        vec[1] /= Math.pow(scale[1], 2.0);
        vec[2] /= Math.pow(scale[2], 2.0);

        let length = Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1] + vec[2] * vec[2]);
        vec = vec.map(x => x / length);

        return vec;
    }

    translate(){
        // to do 
    }

    rotate(){
        // to do
    }
}

class Ellipsoid extends Shape {
    
    constructor(){
        super(arguments);
        this.genGeometries();
        this.genMeshes();
    }

    genGeometries(){
        let actComplexity = [],
        piece = [],
        scale = this.args,
        vertices = [],
        normals = [],
        temp = [];

        console.log(scale)

        let bodyGeom = new THREE.BufferGeometry(),
        topGeom = new THREE.BufferGeometry(),
        bottomGeom = new THREE.BufferGeometry();

        //renders ellipsoid body vertices and normals
        for(let currLevel = 0; currLevel < this.levels; ++currLevel){
            //calculates complexity of current render
            actComplexity.push(this.maxComplexity[0] + currLevel * ((this.minComplexity[0] - this.maxComplexity[0]) / (this.levels - 1.0)));
            actComplexity.push(this.maxComplexity[1] + currLevel * ((this.minComplexity[1] - this.maxComplexity[1]) / (this.levels - 1.0)));

            piece.push(2 * Math.PI / actComplexity[0]);
            piece.push(Math.PI / ((actComplexity[1]+1) * 2));

            for(var i = 0; i < actComplexity[1]*2; ++i){
                for(var j = 0; j < actComplexity[0]+1; ++j){   
                    if( j == 0 || j == actComplexity[0] ){
                        temp.push(-scale[0] * Math.sin((i + 1) * piece[1]));
                        temp.push(0.0);
                    }
                    else
                    {
                        temp.push(-Math.cos(j * piece[0]) * scale[0] * Math.sin((i + 1) * piece[1]));
                        temp.push(-Math.sin(j * piece[0]) * scale[1] * Math.sin((i + 1) * piece[1]));
                    }

                    temp.push(Math.cos((i + 1) * piece[1]) * scale[2]);
                    
                    vertices.push(...temp);
                    normals.push(...this.normalize(temp, scale))
                    temp = []

                    if( j == 0 || j == actComplexity[0] )
                    {
                        temp.push(-scale[0] * Math.sin((i + 2) * piece[1]));
                        temp.push(0.0);
                    }
                    else
                    {
                        temp.push(-Math.cos(j * piece[0]) * scale[0] * Math.sin((i + 2) * piece[1]));
                        temp.push(-Math.sin(j * piece[0]) * scale[1] * Math.sin((i + 2) * piece[1]));

                    }
                    temp.push(Math.cos((i + 2) * piece[1]) * scale[2]);

                    vertices.push(...temp);
                    normals.push(...this.normalize(temp, scale))
                    temp = []

                }

            }
      
        }

        bodyGeom.addAttribute('position', new THREE.BufferAttribute(Float32Array.from(vertices), 3));
        bodyGeom.addAttribute('normal', new THREE.BufferAttribute(Float32Array.from(normals), 3));

        vertices = [];
        normals = [];

        // renders ellipsoid top vertices and normals
        temp.push(0.0);
        temp.push(0.0);
        temp.push(scale[2]);

        vertices.push(...temp);
        normals.push(...this.normalize(temp, scale))
        temp = []

        for(var j = 0; j < actComplexity[0]+1; ++j){
            if( j == 0 || j == actComplexity[0] ){
                temp.push(-scale[0] * Math.sin(piece[1]));
                temp.push(0.0);
            }
            else
            {
                temp.push(-Math.cos(j * piece[0]) * scale[0] * Math.sin(piece[1]));
                temp.push(-Math.sin(j * piece[0]) * scale[1] * Math.sin(piece[1]));
            }
            temp.push(Math.cos(piece[1]) * scale[2]);
            
            vertices.push(...temp);
            normals.push(...this.normalize(temp, scale))
            temp = []
        }

        topGeom.addAttribute('position', new THREE.BufferAttribute(Float32Array.from(vertices), 3));
        topGeom.addAttribute('normal', new THREE.BufferAttribute(Float32Array.from(normals), 3));


        vertices = [];
        normals = []

        // renders ellipsoid bottom vertices and normals
        temp.push(0.0);
        temp.push(0.0);
        temp.push(-scale[2]);

        vertices.push(...temp);
        normals.push(...this.normalize(temp, scale))
        //temp = []

        for(var j = actComplexity[0]; j >= 0; --j){
            if( j == 0 || j == actComplexity[0] ){
                temp.push(-scale[0] * Math.sin(piece[1]));
                temp.push(0.0);
            }
            else
            {
                temp.push(-Math.cos(j * piece[0]) * scale[0] * Math.sin(piece[1]));
                temp.push(-Math.sin(j * piece[0]) * scale[1] * Math.sin(piece[1]));
            }
            temp.push(-Math.cos(piece[1]) * scale[2]);

            vertices.push(...temp);
            normals.push(...this.normalize(temp, scale))
        //    temp = []
           }

        bottomGeom.addAttribute('position', new THREE.BufferAttribute(Float32Array.from(vertices), 3));
        bottomGeom.addAttribute('normal', new THREE.BufferAttribute(Float32Array.from(normals), 3));

        this.geometries = [bodyGeom, topGeom, bottomGeom]

    }

    genMeshes(){
        let bodymesh = new THREE.Mesh(this.geometries[0], this.material);
        bodymesh.drawMode = THREE.TriangleStripDrawMode;

        let topmesh = new THREE.Mesh(this.geometries[1], this.material),
        bottommesh = new THREE.Mesh(this.geometries[2], this.material);

        topmesh.drawMode = THREE.TriangleFanDrawMode;
        bottommesh.drawMode = THREE.TriangleFanDrawMode;

        this.meshes.push(bodymesh);
        this.meshes.push(topmesh);
        this.meshes.push(bottommesh);
    }

}

class Spherocylinder extends Shape {
    
    
    constructor(){
        super(arguments);
        this.genGeometries();
    }

    genGeometries(){
        let actComplexity = [],
        piece = [],
        radius = this.args[0],
        length = this.args[1],
        vertices,
        normals,
        temp = [];

        for(let currLevel = 0; currLevel < this.levels; ++currLevel){
            //calculates complexity of current render
            actComplexity.push(this.maxComplexity[0] + currLevel * ((this.minComplexity[0] - this.maxComplexity[0]) / (this.levels - 1.0)));
            actComplexity.push(actComplexity[0]/4);

            piece.push(2 * Math.PI / actComplexity[0]);
            piece.push(2 * Math.PI / (actComplexity[1]*4));
                  
            let g, m;
        
            for(let y = 0; y < (actComplexity[1]-1); ++y){
                
                vertices = []; 
                normals = [];
                
                for(let x = 0; x <= actComplexity[0]; ++x){
                    if( x == 0 || x == actComplexity[0] ) 
                    {   
                        temp.push(-Math.sin((y + 1) * piece[1]) * radius);
                        temp.push(0);
                    } 
                    else
                    {
                        temp.push(-Math.cos(x * piece[0]) * Math.sin((y + 1) * piece[1]) * radius);
                        temp.push(-Math.sin(x * piece[0]) * Math.sin((y + 1) * piece[1]) * radius);
                    }
                    temp.push( Math.cos((y + 1) * piece[1]) * radius);
                    
                    normals.push(...this.normalize(temp, [1,1,1]))
                    temp[2] += length/2;
                    vertices.push(...temp);
                    temp = [];
                    
                    if( x == 0 || x == actComplexity[0] )
                    {
                        temp.push(-Math.sin((y+2) * piece[1]) * radius);
                        temp.push(0);
                    }
                    else
                    {
                        temp.push(-Math.cos(x * piece[0]) * Math.sin((y + 2) * piece[1]) * radius);
                        temp.push(-Math.sin(x * piece[0]) * Math.sin((y + 2) * piece[1]) * radius);
                    }
                    temp.push(Math.cos((y+2) * piece[1]) * radius);
                    
                    normals.push(...this.normalize(temp, [1,1,1]))
                    temp[2] += length/2;
                    vertices.push(...temp);
                    temp = [];
                }
                
                g = new THREE.BufferGeometry();
                g.addAttribute('position', new THREE.BufferAttribute(Float32Array.from(vertices), 3));
                g.addAttribute('normal', new THREE.BufferAttribute(Float32Array.from(normals), 3));
                m = new THREE.Mesh(g, this.material);
                m.drawMode = THREE.TriangleStripDrawMode;
                this.meshes.push(m);
            }

            for(let y = actComplexity[1]-1; y < 2*(actComplexity[1]-1); ++y){
                
                vertices =[];
                normals = [];

                for(let x = 0; x <= actComplexity[0]; ++x){
                    if( x == 0 || x == actComplexity[0] ) 
                    {   
                        temp.push(-Math.sin((y + 1) * piece[1]) * radius);
                        temp.push(0);
                    } 
                    else
                    {
                        temp.push(-Math.cos(x * piece[0]) * Math.sin((y + 1) * piece[1]) * radius);
                        temp.push(-Math.sin(x * piece[0]) * Math.sin((y + 1) * piece[1]) * radius);
                    }
                    temp.push( Math.cos((y + 1) * piece[1]) * radius);
                    
                    normals.push(...this.normalize(temp, [1,1,1]))
                    temp[2] -= length/2;
                    vertices.push(...temp);
                    temp = [];
                    
                    // Unten
                    if( x == 0 || x == actComplexity[0] )
                    {
                        temp.push(-1 * Math.sin((y+2) * piece[1]) * radius);
                        temp.push(0);
                    }
                    else
                    {
                        temp.push(-Math.cos(x * piece[0]) * Math.sin((y + 2) * piece[1]) * radius);
                        temp.push(-Math.sin(x * piece[0]) * Math.sin((y + 2) * piece[1]) * radius);
                    }
                    temp.push(Math.cos((y+2) * piece[1]) * radius);
                    
                    normals.push(...this.normalize(temp, [1,1,1]))
                    temp[2] -= length/2;
                    vertices.push(...temp);
                    temp = [];
                }
                
                g = new THREE.BufferGeometry();
                g.addAttribute('position', new THREE.BufferAttribute(Float32Array.from(vertices), 3));
                g.addAttribute('normal', new THREE.BufferAttribute(Float32Array.from(normals), 3));
                m = new THREE.Mesh(g, this.material);
                m.drawMode = THREE.TriangleStripDrawMode;
                this.meshes.push(m);
            }

            normals = [];
            vertices = [];

        	for(let x = 0; x <= actComplexity[0]; ++x ){

                if( x == 0 || x == actComplexity[0] ) 
                {
                    temp.push(-radius);
                    temp.push(0);
                }
                else
                {
                    temp.push(-Math.cos(x * piece[0]) * radius);
                    temp.push(-Math.sin(x * piece[0]) * radius);
                }
                temp.push(0);
                
                normals.push(...this.normalize(temp, [1,1,1]))
                temp[2] += length/2;
                vertices.push(...temp);
                
                temp[2] = 0;
                normals.push(...this.normalize(temp, [1,1,1]))
                temp[2] -= length/2;
                vertices.push(...temp);

                temp = [];

            }

            g = new THREE.BufferGeometry();
            g.addAttribute('position', new THREE.BufferAttribute(Float32Array.from(vertices), 3));
            g.addAttribute('normal', new THREE.BufferAttribute(Float32Array.from(normals), 3));
            m = new THREE.Mesh(g, this.material);
            m.drawMode = THREE.TriangleStripDrawMode;
            this.meshes.push(m);


            normals = [];
            vertices = [];
            temp[0] = 0;
            temp[1] = 0;
            temp[2] = radius;
            
            normals.push(...this.normalize(temp, [1,1,1]))
            temp[2] += length/2;
            vertices.push(...temp);
            
            for(let j = 0; j <=  actComplexity[0]; ++j )
            {
                if( j == 0 || j == actComplexity[0] )
                {
                    temp.push(-Math.sin(piece[1]) * radius);
                    temp.push(0);
                }
                else
                {
                    temp.push(-Math.cos(j * piece[0]) * Math.sin(piece[1]) * radius );
                    temp.push(-Math.sin(j * piece[0]) * Math.sin(piece[1]) * radius );
                }
                temp.push(Math.cos(piece[1]) * radius);
                

                normals.push(...this.normalize(temp, [1,1,1]))
                temp[2] += length/2;
                vertices.push(...temp);

                temp = [];
            }

            g = new THREE.BufferGeometry();
            g.addAttribute('position', new THREE.BufferAttribute(Float32Array.from(vertices), 3));
            g.addAttribute('normal', new THREE.BufferAttribute(Float32Array.from(normals), 3));
            m = new THREE.Mesh(g, this.material);
            m.drawMode = THREE.TriangleFanDrawMode;
            this.meshes.push(m);

            normals = [];
            vertices = [];
            temp[0] = 0;
            temp[1] = 0;
            temp[2] = -radius;
            
            normals.push(...this.normalize(temp, [1,1,1]))
            temp[2] -= length/2;
            vertices.push(...temp);
            
            for(let j = actComplexity[0]; j >= 0; --j )
            {
                if( j == 0 || j == actComplexity[0] )
                {
                    temp.push(-Math.sin(piece[1]) * radius);
                    temp.push(0);
                }
                else
                {
                    temp.push(-Math.cos(j * piece[0]) * Math.sin(piece[1]) * radius );
                    temp.push(-Math.sin(j * piece[0]) * Math.sin(piece[1]) * radius );
                }
                temp.push(-Math.cos(piece[1]) * radius);
                

                normals.push(...this.normalize(temp, [1,1,1]))
                temp[2] -= length/2;
                vertices.push(...temp);

                temp = [];
            }

            g = new THREE.BufferGeometry();
            g.addAttribute('position', new THREE.BufferAttribute(Float32Array.from(vertices), 3));
            g.addAttribute('normal', new THREE.BufferAttribute(Float32Array.from(normals), 3));
            m = new THREE.Mesh(g, this.material);
            m.drawMode = THREE.TriangleFanDrawMode;
            this.meshes.push(m);

        }

    }
}

