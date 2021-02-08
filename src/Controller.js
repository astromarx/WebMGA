import Model from "./Model/Model";
import View from "./View/View"
import 'rsuite/dist/styles/rsuite-dark.css';
import sample1 from './Samples/1.json';
import sample2 from './Samples/2.json';
import { Alert, Notification } from 'rsuite'

class Controller {
    model;
    view;
    io;

    constructor() {
        this.io = [this.save, this.load, this.export, this.loadSample];
        this.model = new Model();
        this.view = new View(this.model, this.io);
        Alert.config(
            ({
                top: 70,
                duration: 6000
            })
        );
    }

    start = () => {
        this.addListeners();
        this.generate(sample2, true);
        this.render();


        this.notify('info', 'Welcome!',
            (<p style={{ width: 320 }} >
                Use your mouse to control the camera. See 'Performance' tab if it's running slowly. Please check out both samples!
            </p>)
        );
    }

    notify(type, title, description) {
        Notification[type]({
            title: title,
            placement: 'bottomEnd',
            duration: 30000,
            description: description
        });
    }

    //from stackoverflow
    download = (data, filename, type) => {
        var file = new Blob([data], { type: type });
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        else { // Others
            var a = document.createElement("a"),
                url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    }

    save = () => {
        let data = {};
        data.model = this.model.getData();
        data.state = this.view.getData();
        this.download(JSON.stringify(data), 'visualisation.webmga', 'application/json');
    }

    generate = (data, starting) => {
        this.view.expanded = false;

        this.model.genSets(data.model.sets);

        if (data.state == null) {
            Alert.info("Set default viewing state.");
            this.view.setDefaultStates(starting);
        } else {
            this.view.setState(data.state);
        }
    }

    load = (file) => {
        let fileReader = new FileReader();
        const read = () => {
            var data = JSON.parse(fileReader.result);
            try {
                this.generate(data, false);
                Alert.info('File loaded successfully.');
            } catch (err) {
                Alert.error(err);
            }
        }
        fileReader.onloadend = read;
        fileReader.readAsText(file);

    }

    loadSample = (id) => {
        switch (id) {
            case 1:
                this.generate(sample1, false);
                Alert.info('File loaded successfully.');
                break;
            case 2:
                this.generate(sample2, false);
                Alert.info('File loaded successfully.');
                break;
            default:
                Alert.error('Error: File does not exist');
        }
    }

    convertQMGA = () => {
        // fetch(sample2)
        //     .then(res => res.text())
        //     .then(configData => {
        //         this.model.load(configData);
        //         this.view.setDefaultStates();
        //         console.log(this.model.sets);
        //     });
    }

    export = (height, width) => {
        // fix orthographic projection

        this.model.height = height;
        this.model.width = width;
        this.model.updateCamera();

        this.model.renderer.setSize(width, height);
        this.model.renderer.render(this.model.scene, this.model.camera);
        const dataURL = this.model.renderer.domElement.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");

        this.model.updateDimensions();
        this.model.updateCamera();

        
        var link = document.createElement('a');
        link.download = "WebMGA Visualisation.png";
        link.href = dataURL;
        link.click();

        this.model.updateDimensions();
        this.model.updateCamera();


        this.notify('success', 'Thank you!', (
            <div>
                <p style={{ width: 320 }} >
                    Please cite us!
                </p>
                <a href="https://www.ucl.ac.uk/prospective-students/undergraduate/degrees/computer-science-bsc" target="_blank" rel="noopener noreferrer">Here</a>
            </div>
        ));
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
            //TODO
            //spacebar
            if (key == 32) {
                this.view.expanded = false;
                View.state.camera.rotating = !View.state.camera.rotating;
                this.model.toggleCameraRotation();
            }
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

