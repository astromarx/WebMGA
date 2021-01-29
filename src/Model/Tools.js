import {
    GridHelper,
    LineBasicMaterial,
    Vector3,
    BufferGeometry,
    Line,
    WireframeGeometry,
    LineSegments,
    Box3Helper
} from 'three';
export class Tools {
    subGrid;
    axes = [];
    boundingShape;
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

        this.setsGeometry = null;
    }

    genBoundingShape(type, sets) {
        if (this.setsGeometry == null) {
            this.setsGeometry = new BufferGeometry();
            for (let set in sets) {
                for (let elem in set.elements) {
                    for (let geom in elem.geometries) {
                        this.setsGeometry.merge(geom);
                    }
                }
            }
        }

        this.boundingShape = new BufferGeometry();
        let helper;

        switch (type) {
            case 'box':
                this.boundingShape = this.setsGeometry.computeBoundingBox();
                helper = new Box3Helper( this.setsGeometry.computeBoundingBox(), 0xffff00 );
                break;
            case 'sphere':
                this.boundingShape.copy(this.setsGeometry.computeBoundingSphere());
                break;
            case 'cylinder':
                this.boundingShape.copy(this.setsGeometry.computeBoundingBox());
                break;
        }

        console.log(this.boundingShape);

        const wireframe = new WireframeGeometry(this.boundingShape);
        const line = new LineSegments(wireframe);
        
        return helper;

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