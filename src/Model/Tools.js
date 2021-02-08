import {
    GridHelper,
    LineBasicMaterial,
    Vector3,
    BufferGeometry,
    Line,
    Box3Helper,
    Box3,
    SphereBufferGeometry,
    MeshBasicMaterial,
    Mesh
} from 'three';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import {Alert} from 'rsuite';

export class Tools {
    subGrid;
    axes = [];
    boundingShape;
    boundingShapeType;
    setsGeometry;
    size;
    colour;
    material;

    constructor(s, c) {
        this.size = s;
        this.colour = c;

        this.material = new LineBasicMaterial({
            color: this.colour,
            linewidth: 3
        });

        this.genAxes();
        this.genSubgrid();

        this.boundingShapeType = 'box';
        this.setsGeometry = null;
    }

    genBoundingShape(type, sets) {
        this.boundingShapeType = type;

        this.boundingShape = null;

        if (this.setsGeometry == null) {
            let geometries = [];
            for (let set of sets) {
                for (let elem of set.elements) {
                    geometries.push(BufferGeometryUtils.mergeBufferGeometries(elem.geometries));
                }
            }
            this.setsGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries);
        }



        switch (type) {
            case 'box':
                let box = new Box3();
                this.setsGeometry.computeBoundingBox()
                box.copy(this.setsGeometry.boundingBox);
                this.boundingShape = new Box3Helper(box, this.colour);
                break;
            case 'sphere':
                this.setsGeometry.computeBoundingSphere();
                let sphere = this.setsGeometry.boundingSphere;
                let geom = new SphereBufferGeometry(sphere.radius, 10, 10);
                geom.translate(sphere.center.x, sphere.center.y, sphere.center.z);
                let material = new MeshBasicMaterial({ color: this.colour });
                material.wireframe = true;
                this.boundingShape = new Mesh(geom, material);
                break;
            case 'cylinder':
                // this.boundingShape.copy(this.setsGeometry.computeBoundingBox());
                 break;
            default:
            Alert.error('Error: Unknown bounding shape identifier');
        }



        return this.boundingShape;

    }


    updateColour(colour) {
        this.colour = colour;
        this.material = new LineBasicMaterial({
            color: this.colour,
            linewidth: 3
        });
        this.genAxes();
        this.genSubgrid();
    }

    updateSize(size) {
        this.size = size;
        this.genAxes();
        this.genSubgrid();
    }

    genSubgrid() {
        this.subGrid = new GridHelper(this.size, this.size, this.colour, this.colour);
    }

    genAxes() {
        this.axes = [];
        let axesSize = this.size / 2;
        this.axes.push(new Line(new BufferGeometry().setFromPoints([new Vector3(-axesSize, 0, 0), new Vector3(axesSize, 0, 0)]), this.material));
        this.axes.push(new Line(new BufferGeometry().setFromPoints([new Vector3(0, -axesSize, 0), new Vector3(0, axesSize, 0)]), this.material));
        this.axes.push(new Line(new BufferGeometry().setFromPoints([new Vector3(0, 0, -axesSize), new Vector3(0, 0, axesSize)]), this.material));
    }

}

export default Tools;