var scene = new THREE.Scene();
var model = new Model();
var view = new View();

var renderer = new THREE.WebGLRenderer({antialias: true}); // TODO  toggle antialias
renderer.setClearColor(view.bgColour);
renderer.setSize(window.innerWidth,window.innerHeight);

model.setShapes(scene);
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