import Model  from "./Model/Model";
import View from "./View/View"
import 'rsuite/dist/styles/rsuite-dark.css';
import sample from './Samples/sample1.txt';

class Controller {
    model;
    view;
    io;

    constructor() {
        this.io = [this.save, this.load, this.export];
        this.model = new Model();
        this.view = new View(this.model, this.io);
        //this.stats = new Stats();
    }


    download = (data, filename, type) => {
        var file = new Blob([data], {type: type});
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        else { // Others
            var a = document.createElement("a"),
                    url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);  
            }, 0); 
        }
    }

    save = () => {
        let data = this.model.toJSON();
        this.download(data, 'visualisation data', 'webmga');
        //file.push(this.view.statesToJSON());
        
    }

    load = () => {
        console.log('load');
    }

    export = () => {
        console.log('export');
    }

    start = () => {
        this.addListeners();
        this.loadSample();
        this.render();
    }

    getHeader = () => {
        return this.view.header;
    }

    getSiderbar = () => {
        return this.view.sidebar;
    }

    getDomElement = () => {
        return this.model.renderer.domElement;
    }

    render = () => {
        //this.stats.begin();
        this.model.update();
        //this.stats.end();
        //this.updateFPS();
        requestAnimationFrame(this.render);
    }

    loadSample = () => {
        fetch(sample)
            .then(res => res.text())
            .then(configData => {
                this.model.load(configData);
            });
    }

    addListeners = () => {

        document.body.style.overflow = "hidden";

        window.addEventListener('resize', () => {
            this.model.updateDimensions();
            this.model.updateCamera();
        });

        document.addEventListener('fullscreenchange', () => {
            this.model.updateDimensions();
            this.model.updateCamera();
        });


        document.body.onkeydown = (e) => {
            var key = e.keyCode;
            // //spacebar
            // if (key == 32) {
            //     this.model.toggleCameraRotation();
            // }
            // //a
            // if (key == 65) {
            //     this.model.toggleAxes();
            // }
            // //g
            // if (key == 71) {
            //     this.model.toggleGrid();
            // }
            // if (key == 69) {
            //     this.view.toggleSidebar();
            // }
        }
    }


}



export default Controller;


var Stats = function () {

    var fps = 10;
    var frames = 0;
    var prevTime;
  
    return {
      getFPS: function () {
        return fps;
      },
      begin: function () {
        prevTime = Date.now();
      },
      end: function () {
        frames++;
        var time = Date.now();
  
        if (time > prevTime + 1000) {
          fps = (frames * 1000) / (time - prevTime);
          prevTime = time;
          frames = 0;
          console.log(fps);
        }
      },
  
    };
  
  };
  
  