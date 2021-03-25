import Model from "./Model/Model";
import View from "./View/View"
import 'rsuite/dist/styles/rsuite-dark.css';

import sample1 from './Samples/dummy-vector.json';
import sample2 from './Samples/dummy-quaternion.json';
import sample3 from './Samples/sc4-isotropic.json';
import sample4 from './Samples/sc4-nematic.json';
import sample5 from './Samples/sc4-smectic.json';
import sample6 from './Samples/e5-isotropic.json';
import sample7 from './Samples/e5-nematic.json';
import sample8 from './Samples/o5-isotropic.json';
import sample9 from './Samples/o5-nematic.json';
import sample10 from './Samples/bx-crystal.json';
import sample11 from './Samples/bx-crystal-2.json';
import sample12 from './Samples/fig1.json';
import sample13 from './Samples/hbc.json';

import { Alert, Notification } from 'rsuite'

class Controller {
    model;
    view;
    io;

    constructor() {
        this.io = [this.save, this.load, this.export, this.loadSample, this.toggleAutorotate];
        this.chronometer = new this.Chronometer();
        this.externalToggle = new this.ExternalToggle();
        this.model = new Model(this.chronometer);
        this.view = new View(this.model, this.io, this.chronometer, this.externalToggle);

        Alert.config(
            ({
                top: 70,
                duration: 8000
            })
        );
    }

    ExternalToggle = class ExternalToggle {
        closeSidemenu = () => { }
        autorotate = () => { }
    }

    Chronometer = class Chronometer {

        constructor() {
            this.fps = 0;
            this.frames = 0;
            this.prevTime = Date.now();
        }

        f = (n) => {
            //is initialised in Header React Component
        }

        fps = () => {
            return this.fps;
        }

        begin = () => {
            this.prevTime = Date.now();
        }

        click = () => {
            this.frames++;
            var time = Date.now();

            if (time > this.prevTime + 1000) {
                this.fps = (this.frames * 1000) / (time - this.prevTime);
                this.prevTime = time;
                this.frames = 0;
                this.f(this.fps);
            }
        }
    };

    start = () => {

        this.generate(sample2, true);
        this.addListeners();
        this.chronometer.begin();
        this.render();
        this.notify('info', 'Welcome!',
            (<p style={{ width: 320 }} >
                This application works best on the Chrome browser. Check out Liquid Crystal configurations in the Library!
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
        this.model.genSets(data.model.sets);
        if (data.state == null) {
            Alert.info("Setting default viewing state.");
            this.view.setDefaultStates(starting);
        } else {
            this.view.setState(data.state);
        }
        this.model.update();
        this.externalToggle.closeSidemenu();

    }

    load = (file) => {
        let fileReader = new FileReader();
        const read = () => {
            var data = JSON.parse(fileReader.result);
            try {
                this.generate(data, false);
                Alert.success('File loaded successfully.');
            } catch {
                Alert.error('Error: Please review uploaded file. See manual for help.');
                return;
            }
        }
        fileReader.onloadend = read;
        fileReader.readAsText(file);

    }

    loadSample = (id) => {
        let sample;

        switch (id) {
            case 1:
                sample = sample1;
                break;
            case 2:
                sample = sample2;
                break;
            case 3:
                sample = sample3;
                break;
            case 4:
                sample = sample4;
                break;
            case 5:
                sample = sample5;
                break;
            case 6:
                sample = sample6;
                break;
            case 7:
                sample = sample7;
                break;
            case 8:
                sample = sample8;
                break;
            case 9:
                sample = sample9;
                break;
            case 10:
                sample = sample10;
                break;
            case 11:
                sample = sample11;
                break;
            case 12:
                sample = sample12;
                break;
            case 13:
                sample = sample13;
                break;
            default:
                Alert.error('Error: File does not exist');
                return;
        }

        this.generate(sample, false);
        Alert.success('File loaded successfully.');
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
                <a href="https://www.ucl.ac.uk/prospective-students/undergraduate/degrees/computer-science-bsc" target="_blank" rel="noopener noreferrer">Here</a>
            </div>
        ));
    }

    getHeader = () => {
        return this.view.header;
    }

    getSidebar = () => {
        return this.view.sidebar;
    }

    getDomElement = () => {
        return this.model.renderer.domElement;
    }

    render = () => {
        this.model.update();
    }

    addListeners = () => {

        this.model.controls.addEventListener('change', this.render);

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
                this.externalToggle.autorotate();
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

