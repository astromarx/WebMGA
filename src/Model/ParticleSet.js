import {Mesh,
    MeshLambertMaterial,
    Vector3,
    Quaternion,
    Euler
    } from 'three';
import * as SHAPE from './Shapes.js';

export class ParticleSet{
    name;
    shape;
    shapeType;
    display;
    material;
    parameters;
    colour;
    orientationType;

    particles = []
    meshes = [];

    constructor(n, ot, d){
        this.name = n;
        this.orientationType = ot;
        this.setDefaults();
        this.genParticles(d);
        this.genMeshes();
    }

    genMeshes(){
        let m;
        for(let p of this.particles){
            for(let g of p.geometries){
                m = new Mesh(g, this.material);
                this.meshes.push(m);
            }
        }
    }

    genParticles(particles){

        let position, orientation, attributes, euler, nP;
        let geoms = [], temp = [];

        let i = 1;
        for(let p of particles){
            attributes = p.split(" ");

            for(let a of attributes){
                temp.push(parseFloat(a));
            }

            attributes = temp;
            temp = [];
            console.log(attributes.length);

            if (attributes.length != 7){break;}
            
            position = attributes.slice(0, 3);
            orientation = attributes.slice(3);

            euler = this.getRotations(this.orientationType, orientation);

            // console.log(i);
            // i++;
            // console.log('attributes');
            // console.log(attributes);

            geoms.push(this.shape.stripGeometry.clone());
            geoms.push(this.shape.fanGeometries[0].clone());
            geoms.push(this.shape.fanGeometries[1].clone());
            
            this.translate(position, geoms);
            this.rotate(euler, geoms);

            nP = new this.Particle(geoms);
            this.particles.push(nP);

            geoms = [];

        }
    }

    setDefaults(){
        this.shapeType = 'ellipsoid';
        this.display = 'model';
        this.colour =  0xF7F7F7;
        this.material = new MeshLambertMaterial({color: this.colour});
        this.parameters = (2, 3);
        this.genGeometries();
    }

    genGeometries(){
        switch(this.shapeType){
            case 'ellipsoid':
                this.shape = new SHAPE.Ellipsoid(0.5, 0.3, 0.7);
                break;
            case 'spherocylinder':
                this.shape = new SHAPE.Spherocylinder(0.5,8);
                break;
            case 'spheroplatelet':
                this.shape = new SHAPE.Spheroplatelet(0.5,0.7);
                break;
            case 'cutsphere':
                this.shape = new SHAPE.CutSphere(this.parameters);
                break;
            case 'sphere':
                this.shape = new SHAPE.CutSphere(this.parameters, this.parameters);
                break;
        }
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

    getRotations(type, rot){
        let q = new Quaternion();
        let e = new Euler();

        switch (type){
            case 'v':
                let defaultVector = new Vector3(0,0,1);
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

    Particle = class Particle{
        geometries;
        constructor(g){
            this.geometries = g;
        }

    }
}

export default ParticleSet;