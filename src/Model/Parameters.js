

export var Parameters = {
    Ellipsoid: {
        names: ['X', 'Y', 'Z'],
        vals: [0.5, 0.2, 0.2],
        lod: [6,10,14,20,30]
    },
    Spherocylinder:{
        names: ['Radius', 'Length'],
        vals: [0.5, 0.75],
        lod: [8,12,16,22,30]
    },
    Spheroplatelet:{
        names: ['RadSphere','RadCircle'],
        vals:[1.0,0.2],
        lod: [6,12,18,24,32]
    },
    CutSphere: {
        names: ['Radius','zCut'],
        vals: [0.8, 0.2],
        lod: [6,12,14,20,30]
    },
    Sphere: {
        names: ['Radius'],
        vals: [0.6],
        lod: [6,12,4,5,6]
    },
    Cone: {
        names: ['Radius','Height'],
        vals: [0.8, 1.2],
        lod: [6,12,4,5,6]
    },
    Cylinder: {
        names: ['RadiusTop', 'RadiusBottom', 'Height'],
        vals: [0.5,0.5,2.0],
        lod: [6,12,4,5,6]
    },
    Torus:{
        names:['Radius','Tube','Arc'],
        vals:[1.0,0.3,6.3],
        lod: [6,12,4,5,6]
    }
}

export default Parameters;