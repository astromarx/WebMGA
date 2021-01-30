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
    static ViewOptionsState;
    static ModelState;
    static SlicingState; 

    constructor(m) {
        this.model = m;
        this.header = <Top fps={60} />;
        this.sidebar = <Side model={this.model} />;
        this.setDefaultStates();
    }

    setDefaultStates() {
        View.VisualElementsState = this.VisualElementsDefaultState;
        View.AmbientLightState = this.AmbientLightDefaultState;
        View.PointLightState = this.PointLightDefaultState;
        View.DirectionalLightState = this.DirectionalLightDefaultState;
        View.ViewOptionsState = this.ViewOptionsDefaultState;
        View.ModelState = this.ModelDefaultState;
        View.SlicingState = this.SlicingDefaultState;

        for (let i in View.ModelState.sets) {
            let c = JSON.parse(JSON.stringify(this.ConfigurationDefaultState));
            c.title = View.ModelState.sets[i];
            View.ModelState.configurations.push(c);
        }
    }

    SlicingDefaultState = {
        clipIntersection : false,
        helpers : [false, false, false],
        x : [-50, 50],
        y : [-50, 50],
        z : [-50, 50]
    }

    ModelDefaultState = {
        active: 0,
        reset: 0,
        sets: ['Set A', 'Set B', 'Set C'],
        configurations: []
    }

    ConfigurationDefaultState = {
        title: '',
        shape: 'Ellipsoid',
        parameters: {
            names: ['X', 'Y', 'Z'],
            vals: [0.5, 0.2, 0.2]
        },
        colour: {
            r: 255,
            g: 255,
            b: 255
        },
        envMap: 'None',
        shininess: 30,
        reflectivity: 0.5,
        refractivity: 0.5,
        colourFromDirector: true,
        displayAsWireframe: true
    }

    ViewOptionsDefaultState = {
        rotating: false,
        type: 'perspective',
        lookAt: {
            x: 0,
            y: 0,
            z: 0
        },
        LOD: 4
    }

    PointLightDefaultState = {
        reset: 0,
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
        reset: 0,
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