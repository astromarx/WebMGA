import React, { Component } from "react";
import Top from './Top';
import Side from './Side';

export class View {
    header;
    sidebar;
    model;
    expanded;

    static VisualElementsState;
    static AmbientLightState;

    constructor(m) {
        this.model = m;
        this.header = <Top fps={20} />;
        this.sidebar = <Side model={this.model} />;

        View.VisualElementsState = this.VisualElementsDefaultState;
        View.AmbientLightState = this.AmbientLightDefaultState;
    }

    VisualElementsDefaultState = {
        boundingShapeEnabled: false,
        activeShape: 'box',
        showAxes: false,
        showGrid: false,
        r : 50,
        g : 90,
        b : 90,
        size: 50
    }

    AmbientLightDefaultState = {
        aR: 90,
        aG: 200,
        aB: 100,
        i: 90,
        bR: 0,
        bG: 0,
        bB: 0 
    }

}

export default View;