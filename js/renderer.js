
class View{
    camera;
    lighting;
    bgColour;
    l;

    static AMBIENT = 0;
    static DIRECTIONAL = 1;
    static POINT = 2;


    constructor(){
        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);
        this.lighting = [
            new this.Light(View.AMBIENT),
            new this.Light(View.DIRECTIONAL),
            new this.Light(View.POINT)];
        this.setDefault();
    }

    setDefault(){
        this.camera.position.z = 10;
        this.bgColour = "#000000";
    }

    setLighting(scene){
        for(let l of this.lighting){
            scene.add(l.light);
        }
    }

    adjustCamera(direction){
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
                    this.intensity = 1.0;
                    this.light = new THREE.AmbientLight(this.colour, this.intensity);
                    break;
                case View.DIRECTIONAL:
                    this.colour = "#ffff00";
                    this.isDirectional = true;
                    this.intensity = 0.2;
                    this.light = new THREE.DirectionalLight(this.colour, this.intensity);
                    break;
                case View.POINT:
                    this.colour = "#ffffff";
                    this.isDirectional = true;
                    this.intensity = 1.0;
                    this.light = new THREE.PointLight(this.colour, this.intensity);
                    this.light.position.set(5,0,2);
                    break;
            }
        }
    }
}

class Model{
    meshes = [];

    shapes = {
        ELLIPSOID : 1,
        CUBE: 2
    }


    constructor(){
        this.sampleShape();

    }

    genShapeGeometry(shapeType, shapeModel){
        switch(shapeType){
            case this.shapes.ELLIPSOID:
                return this.genEllipsoidGeometries(shapeModel);
                break;
            case this.shapes.CUBE:
                return new THREE.BoxGeometry(1, 1, 1);
        }
    }    

    genEllipsoidGeometries(m){
        //dimensions
        let X = 0;
        let Y = 1;
        let Z = 2;

        var actComplexity = []
        var piece = []
        var vertices = []

        for(let currLevel = 0; currLevel < m.levels; ++currLevel){
            //calculates complexity of current render
            actComplexity.push(m.maxComplexity[X] + currLevel * ((m.minComplexity[X] - m.maxComplexity[X]) / (m.levels - 1.0)));
            actComplexity.push(m.maxComplexity[Y] + currLevel * ((m.minComplexity[Y] - m.maxComplexity[Y]) / (m.levels - 1.0)));

            piece.push(2 * Math.PI / actComplexity[X]);
            piece.push(Math.PI / ((actComplexity[Y]+1) * 2));

            for(var i = 0; i < actComplexity[Y]*2; ++i){
                for(var j = 0; j < actComplexity[X]+1; ++j){
                    
                  
                    if( j == 0 || j == actComplexity[X] ){
                        vertices.push(-m.scale[X] * Math.sin((i + 1) * piece[Y]));
                        vertices.push(0.0);
                    }
                    else
                    {
                        vertices.push(-Math.cos(j * piece[X]) * m.scale[X] * Math.sin((i + 1) * piece[Y]));
                        vertices.push(-Math.sin(j * piece[X]) * m.scale[Y] * Math.sin((i + 1) * piece[Y]));
                    }
                    vertices.push(Math.cos((i + 1) * piece[Y]) * m.scale[Z]);
                    

                    if( j == 0 || j == actComplexity[X] )
                    {
                        vertices.push(-m.scale[X] * Math.sin((i + 2) * piece[Y]));
                        vertices.push(0.0);
                    }
                    else
                    {
                        vertices.push(-Math.cos(j * piece[X]) * m.scale[X] * Math.sin((i + 2) * piece[Y]));
                        vertices.push(-Math.sin(j * piece[X]) * m.scale[Y] * Math.sin((i + 2) * piece[Y]));

                    }
                    vertices.push(Math.cos((i + 2) * piece[Y]) * m.scale[Z]);

                    
                }

            }
      
        }

        const body = Float32Array.from(vertices);
        vertices = [];

        //top
        vertices.push(0.0);
        vertices.push(0.0);
        vertices.push(m.scale[Z]);
        for(var j = 0; j < actComplexity[X]+1; ++j){
            if( j == 0 || j == actComplexity[X] ){
                vertices.push(-m.scale[X] * Math.sin(piece[Y]));
                vertices.push(0.0);
            }
            else
            {
                vertices.push(-Math.cos(j * piece[X]) * m.scale[X] * Math.sin(piece[Y]));
                vertices.push(-Math.sin(j * piece[X]) * m.scale[Y] * Math.sin(piece[Y]));
            }
            vertices.push(Math.cos(piece[Y]) * m.scale[Z]);
        }

        const top = Float32Array.from(vertices);
        vertices = [];

        //bottom
        vertices.push(0.0);
        vertices.push(0.0);
        vertices.push(-m.scale[Z]);
        for(var j = actComplexity[X]; j >= 0; --j){
            if( j == 0 || j == actComplexity[X] ){
                vertices.push(-m.scale[X] * Math.sin(piece[Y]));
                vertices.push(0.0);
            }
            else
            {
                vertices.push(-Math.cos(j * piece[X]) * m.scale[X] * Math.sin(piece[Y]));
                vertices.push(-Math.sin(j * piece[X]) * m.scale[Y] * Math.sin(piece[Y]));
            }
            vertices.push(-Math.cos(piece[Y]) * m.scale[Z]);
           }

        const bottom = Float32Array.from(vertices);
        
        var bodyGeom = new THREE.BufferGeometry();
        var topGeom = new THREE.BufferGeometry();
        var bottomGeom = new THREE.BufferGeometry();

        bodyGeom.addAttribute('position', new THREE.BufferAttribute(body, 3));
        topGeom.addAttribute('position', new THREE.BufferAttribute(top, 3));
        bottomGeom.addAttribute('position', new THREE.BufferAttribute(bottom, 3));

        var ellipsoidGeoms = [bodyGeom, topGeom, bottomGeom]
        
        return ellipsoidGeoms;

    }
 

    sampleShape(){

        var shapeModel = new this.ShapeModel(2, 1, 3);
        
        var geometries = this.genShapeGeometry(this.shapes.ELLIPSOID, shapeModel)
        var material = new THREE.MeshLambertMaterial({color: 0xF7F7F7});   

        

        var bodymesh = new THREE.Mesh(geometries[0], material);
        bodymesh.drawMode = THREE.TriangleStripDrawMode;

        var topmesh = new THREE.Mesh(geometries[1], material);
        var bottommesh = new THREE.Mesh(geometries[2], material);

        topmesh.drawMode = THREE.TriangleFanDrawMode;
        bottommesh.drawMode = THREE.TriangleFanDrawMode;

        this.meshes.push(bodymesh);
        this.meshes.push(topmesh);
        this.meshes.push(bottommesh);



        // for(var i = 0; i<15;i++) {
        //     var mesh = new THREE.Mesh(geometry, material);
        //     mesh.position.x = (Math.random() - 0.5) * 10;
        //     mesh.position.y = (Math.random() - 0.5) * 10;
        //     mesh.position.z = (Math.random() - 0.5) * 10;

        //     this.meshes[i] = mesh;
        // }
    }

    setMeshes(scene){
        for(let m of this.meshes){
            scene.add(m);
        }

    }

    ShapeModel = class ShapeModel {
        levels = 10;

        maxComplexity = [12, 4]
        minComplexity = [4, 0]

        scale;

        constructor(x, y, z){
            this.scale = [x, y, z];
        }
    }

}

var scene = new THREE.Scene();
var view = new View();
var model = new Model();

var renderer = new THREE.WebGLRenderer({antialias: true}); // TODO  toggle antialias
renderer.setClearColor(view.bgColour);
renderer.setSize(window.innerWidth,window.innerHeight);

model.setMeshes(scene);
view.setLighting(scene);

document.body.appendChild(renderer.domElement);

document.onkeydown = checkKey;

function checkKey(e) {
    e = e || window.event;

    if (e.keyCode == '38') {
        view.adjustCamera('up');
    }
    else if (e.keyCode == '40') {
        view.adjustCamera('down');
    }
    else if (e.keyCode == '37') {
        view.adjustCamera('left');
    }
    else if (e.keyCode == '39') {
       view.adjustCamera('right');
    }
}


var render = function() {
    requestAnimationFrame(render);
    renderer.render(scene, view.camera);
}

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    view.camera.aspect = window.innerWidth / window.innerHeight;
    view.camera.updateProjectionMatrix();
})

render();