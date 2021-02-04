import {
    Mesh,
    MeshPhongMaterial,
    Vector3,
    Quaternion,
    Euler,
    Color,
    DoubleSide
} from 'three';
import * as SHAPE from './Shapes.js';
import Model from './Model';
import Parameters from './Parameters';

export class Set {
    name;
    shapeType;
    parameters;
    shape;
    orientationType;
    wireframe;
    shininess;
    userColour;
    colourByDirector;
    lod;
    clippingPlanes;
    clipIntersection;

    positions = [];
    orientations = [];
    elements = []
    meshes = [];

    constructor(n, ot, d, cp, ci) {
        this.name = n;
        this.orientationType = ot;
        this.clippingPlanes = cp;
        this.clipIntersection = ci;
        this.setDefaults();
        this.genElements(d);
        this.setElements();
        this.genMeshes();
    }

    updateSlicers(i, vals){
        this.clippingPlanes[2*i+1].constant = vals[1];
        this.clippingPlanes[2*i].constant = -vals[0];
    }

    toggleClipIntersection(toggle){
        this.clipIntersection = toggle;
        for(let mesh of this.meshes){
            mesh.material.clipIntersection = toggle;
        }
    }

    genMeshes() {
        let m;
        let c;
        let mat;

        for (let elem of this.elements) {
            if (this.colourByDirector) {
                c = new Color(elem.getColour());
            } else {
                c = this.userColour;
            }

            mat = new MeshPhongMaterial({ 
                color: c,
                side: DoubleSide,
                clippingPlanes: this.clippingPlanes,
                clipIntersection: this.clipIntersection
             });
            mat.wireframe = this.wireframe;
            mat.shininess = this.shininess;

            for (let g of elem.geometries) {
                m = new Mesh(g, mat);
                this.meshes.push(m);
            }
        }
    }

    setUserColour(hex){
        this.userColour = new Color(hex);
    }

    setElements() {
        let geoms = [];

        for (let elem of this.elements) {
            if (this.shape.isPreset) {
                geoms.push(this.shape.presetGeometry.clone());
            }
            else {
                geoms.push(this.shape.stripGeometry.clone());
                geoms.push(this.shape.fanGeometries[0].clone());
                geoms.push(this.shape.fanGeometries[1].clone());
            }

            this.translate(elem.position, geoms);
            this.rotate(elem.euler, geoms);
            elem.setGeometries(geoms);

            geoms = [];
        }
    }

    genElements(elements) {
        let position, orientation, attributes, euler, nP;
        let temp = [], colour = [];

        for (let elem of elements) {
            attributes = elem.split(" ");

            for (let a of attributes) {
                temp.push(parseFloat(a));
            }

            attributes = temp;
            temp = [];
            console.log(attributes.length);

            if (attributes.length != 7) { break; }

            position = attributes.slice(0, 3);
            orientation = attributes.slice(3);

            this.positions.push(position);
            this.orientations.push(orientation);

            euler = this.getRotations(this.orientationType, orientation);
            colour = this.colourFromOrientation(euler);

            nP = new this.Element(colour, position, euler);
            this.elements.push(nP);
        }
    }

    setDefaults() {
        this.userColour = new Color("#FFFFFF");
        this.colourByDirector = true;
        this.wireframe = true;
        this.shininess = 30;
        this.lod = 4;
        this.shapeType = 'Ellipsoid';
        this.parameters = Parameters.Ellipsoid.vals;
        this.genGeometries();
    }

    genGeometries() {
        switch (this.shapeType) {
            case 'Ellipsoid':
                this.shape = new SHAPE.Ellipsoid(...this.parameters);
                break;
            case 'Spherocylinder':
                this.shape = new SHAPE.Spherocylinder(...this.parameters);
                break;
            case 'Spheroplatelet':
                this.shape = new SHAPE.Spheroplatelet(...this.parameters);
                break;
            case 'Cut Sphere':
                this.shape = new SHAPE.CutSphere(...this.parameters);
                break;
            case 'Sphere':
                this.shape = new SHAPE.Preset('Sphere', this.parameters);
                break;
            case 'Cone':
                this.shape = new SHAPE.Preset('Cone', this.parameters);
                break;
            case 'Cylinder':
                this.shape = new SHAPE.Preset('Cylinder', this.parameters);
                break;
            case 'Torus':
                this.shape = new SHAPE.Preset('Torus', this.parameters);
                break;
        }

        this.shape.LOD = this.lod;
        this.shape.generate();
    }

    translate(pos, geoms) {
        for (let g of geoms) {
            g.translate(pos[0], pos[1], pos[2]);
        }
    }

    rotate(e, geoms) {
        for (let g of geoms) {
            g.rotateX(e.x);
            g.rotateY(e.y);
            g.rotateZ(e.z);
        }
    }

    colourFromOrientation(euler) {
        let colour = [];

        colour.push(Math.round((euler._x + Math.PI) / (2 * Math.PI) * (255)));
        colour.push(Math.round((euler._y + Math.PI) / (2 * Math.PI) * (255)));
        colour.push(Math.round((euler._z + Math.PI) / (2 * Math.PI) * (255)));
        return colour;
    }

    getRotations(type, rot) {
        let q = new Quaternion();
        let e = new Euler();

        switch (type) {
            case 'v':
                let defaultVector = new Vector3(0, 0, 1);
                q.setFromUnitVectors(defaultVector, new Vector3(rot[0], rot[1], rot[2]));
                e.setFromQuaternion(q);
                break;
            case 'q':
                q.fromArray(rot);
                e.setFromQuaternion(q);
                break;
            case 'a':
                q.setFromAxisAngle(new Vector3(rot[0], rot[1], rot[2]), rot[3]);
                e.setFromQuaternion(q);
                break;
            case 'e':
                e.fromArray(rot);
                break;
        }

        return e;

    }

    Element = class Element {
        geometries;
        colour;
        position;
        euler;

        constructor(c, p, e) {
            this.colour = c;
            this.position = p;
            this.euler = e;
        }

        getColour() {
            return Model.rgbToHex(this.colour[0], this.colour[1], this.colour[2]);
        }

        setGeometries(geoms) {
            this.geometries = geoms;
        }

    }
}

export default Set;