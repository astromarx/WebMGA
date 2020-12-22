import { Model } from './model.js';
import { View } from './view.js';
import {Scene, WebGLRenderer} from './lib/three.module.js';

var scene = new Scene();
var model = new Model();
var view = new View();

var renderer = new WebGLRenderer({antialias: true}); // TODO  toggle antialias
renderer.setClearColor(view.bgColour);
renderer.setSize(window.innerWidth,window.innerHeight);

model.setShapes(scene);
view.setLighting(scene);
view.setControls(renderer.domElement);

document.body.appendChild(renderer.domElement);

var render = function() {
    requestAnimationFrame(render);
    view.controls.update();
    renderer.render(scene, view.camera);
}

document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        view.toggleRotation();
    }
}

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    view.camera.aspect = window.innerWidth / window.innerHeight;
    view.camera.updateProjectionMatrix();
})

render();


