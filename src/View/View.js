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
    static PointLightState;
    static DirectionalLightState;

    constructor(m) {
        this.model = m;
        this.header = <Top fps={60} />;
        this.sidebar = <Side model={this.model} />;

        View.VisualElementsState = this.VisualElementsDefaultState;
        View.AmbientLightState = this.AmbientLightDefaultState;
        View.PointLightState = this.PointLightDefaultState;
        View.DirectionalLightState = this.DirectionalLightDefaultState;
    }

    PointLightDefaultState = {
        reset : 0,
        active: 'point',
        enabled: true,
        colour: {
            r: 255,
            g: 255,
            b: 255,
            i: 100
        },
        position: {
            x: 0,
            y: 0,
            z: 0
        }
    }

    DirectionalLightDefaultState = {
        reset : 0,
        active: 'directional',
        enabled: false,
        colour: {
            r: 70,
            g: 80,
            b: 90,
            i: 100
        },
        position: {
            x: 0,
            y: 0,
            z: 0
        }

    }

    VisualElementsDefaultState = {
        boundingShapeEnabled: false,
        activeShape: 'box',
        showAxes: false,
        showGrid: false,
        gridColour: {
            r: 50,
            g: 90,
            b: 90,
        },
        size: 50,

    }

    AmbientLightDefaultState = {
        ambientLightColour: {
            r: 50,
            g: 50,
            b: 50,
            i: 90
        },
        backgroundColour: {
            r: 0,
            g: 0,
            b: 0
        }
    }

}

export default View;