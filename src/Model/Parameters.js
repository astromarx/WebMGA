

export var Parameters = {
    Ellipsoid: {
        names: ['X', 'Y', 'Z'],
        vals: [0.5, 0.2, 0.2]
    },
    Spherocylinder:{
        names: ['Radius', 'Length'],
        vals: [0.5, 0.75]
    },
    Spheroplatelet:{
        names: ['RadSphere','RadCircle'],
        vals:[1.0,0.2]
    },
    CutSphere: {
        names: ['Radius','zCut'],
        vals: [0.8, 0.2]
    },
    Sphere: {
        names: ['Radius'],
        vals: [0.6]
    },
    Cone: {
        names: ['Radius','Height'],
        vals: [0.8, 1.2]
    },
    Cylinder: {
        names: ['RadiusTop', 'RadiusBottom', 'Height'],
        vals: [0.5,0.5,2.0]
    },
    Torus:{
        names:['Radius','Tube','Arc'],
        vals:[1.0,0.3,6.3]
    }
}

export default Parameters;