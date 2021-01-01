import {
    GridHelper,
    LineBasicMaterial,
    Vector3, 
    BufferGeometry,
    Line} from 'three';
export class Grid {
    subGrid;
    axes = [];

    size;
    colour;

    constructor(s, c){
        this.size = s;
        this.colour = c;
        this.subGrid = new GridHelper(s, s, c, c);
        this.genAxes();
        
    }

    genAxes(){
        var axesMaterial = new LineBasicMaterial( {
            color: this.colour,
            linewidth: 3
        } );

        let axesSize = this.size /2;
        this.axes.push(new Line(new BufferGeometry().setFromPoints([new Vector3(-axesSize, 0, 0), new Vector3(axesSize, 0, 0)]), axesMaterial));
        this.axes.push(new Line(new BufferGeometry().setFromPoints([new Vector3(0, -axesSize, 0), new Vector3(0, axesSize, 0)]), axesMaterial));
        this.axes.push(new Line(new BufferGeometry().setFromPoints([new Vector3(0, 0, -axesSize), new Vector3(0, 0, axesSize)]), axesMaterial));
    }

}

export default Grid;