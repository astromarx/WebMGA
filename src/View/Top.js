
import { Header, Dropdown, FormGroup, Drawer, Nav, Navbar, Icon, Button, ButtonToolbar, Slider, Form, ControlLabel, Whisper, Tooltip, Divider, Alert } from 'rsuite';
import { ParameterSet } from './Tools';
import React from "react";
import View from './View';
import { render } from '@testing-library/react';

class ExportDropdown extends React.Component {

    constructor(props) {
        super();
        this.dimensions = [1000, 1000];
        this.f = props.f;
        this.updateDimensions = this.updateDimensions.bind(this);
        this.export = this.export.bind(this);
    }

    updateDimensions(val, index) {
        this.dimensions[index] = parseInt(val);
    }

    export() {
        this.f(...this.dimensions);
    }

    render() {
        return (
            <Dropdown title="Export" trigger='click' placement="bottomEnd" icon={<Icon icon="export" />} >

                <ParameterSet f={this.updateDimensions} titles={['Height', 'Width']} values={this.dimensions} step={5} positive
                    styling={[
                        { marginRight: 25 },
                        { marginTop: 18, marginLeft: 35 }
                    ]} />

                <Button style={{ width: 180, marginLeft: 25, marginRight: 25, marginTop: 15, marginBottom: 15 }} appearance='primary' onClick={this.export}> Export </Button>
            </Dropdown>);
    }

};

class SamplesDropdown extends React.Component {

    constructor(props) {
        super(props);
        this.model = props.model;
        this.state = { active: 2 };
        this.f = props.f;

        this.updateKey = this.updateKey.bind(this);
    }

    updateKey(val) {
        this.setState({
            active: val
        });
    }

    render() {
        const state = this.state;
        return (
            <Dropdown 
            title="Library"
            trigger='click'
            placement="bottomEnd"
            icon={<Icon icon="database" />}
            appearance='subtle'
            onSelect={(eventKey) => {
                this.f(eventKey);

            }}>
                <Dropdown.Item eventKey={14}>Single Molecule</Dropdown.Item>
                <Dropdown.Menu title="Samples">
                    <Dropdown.Item eventKey={1}>Unit Vector Orientations</Dropdown.Item>
                    <Dropdown.Item eventKey={2}>Quaternion Orientations</Dropdown.Item>
                </Dropdown.Menu>
                <Dropdown.Menu title="Spherocylinders">
                    <Dropdown.Item eventKey={3}>SC4 Isotropic</Dropdown.Item>
                    <Dropdown.Item eventKey={4}>SC4 Nematic</Dropdown.Item>
                    <Dropdown.Item eventKey={5}>SC4 Smectic</Dropdown.Item>
                </Dropdown.Menu>
                <Dropdown.Menu title="Prolate and Oblate Ellipsoids">
                    <Dropdown.Item eventKey={6}>E5 Isotropic</Dropdown.Item>
                    <Dropdown.Item eventKey={7}>E5 Nematic</Dropdown.Item>
                    <Dropdown.Item eventKey={8}>O5 Isotropic</Dropdown.Item>
                    <Dropdown.Item eventKey={9}>O5 Nematic</Dropdown.Item>
                </Dropdown.Menu>
                <Dropdown.Menu title="Dense Crystal Packings">
                    <Dropdown.Item eventKey={10}>Box Crystal (Small)</Dropdown.Item>
                    <Dropdown.Item eventKey={11}>Box Crystal (Large)</Dropdown.Item>
                </Dropdown.Menu>
                <Dropdown.Menu title="Other">
                    <Dropdown.Item eventKey={12}>Fig1</Dropdown.Item>
                    <Dropdown.Item eventKey={13}>HBC</Dropdown.Item>
                </Dropdown.Menu>
                
                <Dropdown.Item panel style={{ padding: 5, width: 120 }}></Dropdown.Item>


            </Dropdown>
        );

    }
}

class PerformanceDropdown extends React.Component {

    constructor(props) {
        super(props);
        this.model = props.model;
        this.state = { val: props.model.lod + 1 };

        this.updateVal = this.updateVal.bind(this);
    }

    updateVal(val) {
        this.setState({
            val: val
        });
    }

    render() {
        const lod = this.state.val;
        return (
            <Dropdown title="Level of Detail" trigger='click' placement="bottomEnd" icon={<Icon icon="sliders" />}>
                <Form style={{ marginLeft: 20, marginTop: 20 }} layout="inline">
                    <FormGroup>
                        <ControlLabel>Adjust LOD</ControlLabel>
                        <Whisper placement="bottom" trigger="hover" speaker={
                            <Tooltip>
                                Decreasing LOD will increase rendering speed.
                            </Tooltip>
                        }>
                            <Icon icon="question-circle" size="lg" />
                        </Whisper>
                    </FormGroup>
                </Form>

                <Slider
                    min={1}
                    step={1}
                    max={5}
                    value={lod}
                    graduated
                    progress
                    style={{ width: 200, marginLeft: 30, marginRight: 30, marginBottom: 20 }}
                    onChange={(value) => {
                        this.model.updateLOD(value - 1);
                        this.updateVal(value);
                        this.model.update();
                    }}

                />
                <br />
            </Dropdown>
        );
    }

}

class Top extends React.Component {

    constructor(props) {
        super(props);
        this.model = props.model;
        this.functions = props.functions;
        this.toggler = props.toggler;
        this.state = { fps: 0, showDrawer: false, rotating: false };
        this.updateFPS = this.updateFPS.bind(this);
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.toggleAutorotate = this.toggleAutorotate.bind(this);
        this.runPerformanceTest = this.runPerformanceTest.bind(this);

        this.chronometer = props.chronometer;
        this.chronometer.f = this.updateFPS;

        this.toggler.autorotate = () => {
            this.toggleAutorotate();
        }


    }

    toggleAutorotate() {
        this.setState({
            rotating: !this.state.rotating
        });
        this.model.toggleAutorotate();
        if (this.model.rotating) {
            this.toggler.closeSidemenu();
        }
        this.continuousRender();
    }

    runPerformanceTest(){
        Alert.info("To modify testing parameters, see 'initTesting()' in Model class.");

        this.model.initTesting(this.chronometer.step);

        if(!this.state.rotating){
            this.toggleAutorotate();
        }

        this.chronometer.testing = true;
    }

    continuousRender = () => {
        this.model.update();
        this.chronometer.click();
        this.model.controls.update();
        if (this.model.rotating) {
            requestAnimationFrame(this.continuousRender);
        }
    }

    toggleDrawer() {
        this.setState({
            showDrawer: !this.state.showDrawer
        });
    }

    updateFPS(fps) {
        this.setState({
            fps: fps.toFixed(2)
        });
    }

    render() {
        const fps = this.state.fps;
        const showDrawer = this.state.showDrawer;
        const rotating = this.state.rotating;
        return (
            <div>
                <Header style={{ height: 56 }}>
                    <Navbar>
                        <Navbar.Body>
                            <Nav pullRight >
                                <ButtonToolbar>
                                    <Nav.Item active>fps: {fps}</Nav.Item>
                                    <Nav.Item active={rotating} onClick={this.toggleAutorotate} appearance="subtle" icon={<Icon icon="refresh" spin={rotating} />}>Autorotate</Nav.Item>
                                    <Nav.Item onClick={this.runPerformanceTest} appearance="subtle" icon={<Icon icon="dashboard" />}>Run Performance Test</Nav.Item>
                                    <PerformanceDropdown model={this.model} />
                                    <Nav.Item appearance="subtle" disabled={true} icon={<Icon icon="info-circle" />}>Manual</Nav.Item>
                                    <Nav.Item onClick={this.toggleDrawer} appearance="subtle" icon={<Icon icon="book" />}>Notes</Nav.Item>
                                    
                                    <SamplesDropdown f={this.functions[3]} />

                                    <ExportDropdown f={this.functions[2]} />
                                    <Nav.Item appearance="subtle" icon={<Icon icon="file-download" />} onSelect={this.functions[0]}>Save</Nav.Item>
                                    <input type="file"
                                        id="upload-btn"
                                        style={{ display: 'none' }}
                                        className='input-file'
                                        accept='.json,.webmga'
                                        onChange={e => this.functions[1](e.target.files[0])} />
                                    <label for="upload-btn">
                                        <Nav.Item icon={<Icon icon="file-upload" />}>Upload</Nav.Item>
                                    </label>

                                </ButtonToolbar>

                            </Nav>
                            <Nav pullLeft>
                                <h6 style={{ padding: 20 }}> WebMGA</h6>
                            </Nav>
                        </Navbar.Body>
                    </Navbar>
                </Header>
                <Drawer
                    size={'xs'}
                    placement={'right'}
                    show={showDrawer}
                    onHide={this.toggleDrawer}
                    backdrop={false}
                >
                    <Drawer.Header>
                        <Drawer.Title>Information About System</Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                        Coarse-grained modeling of molecular fluids is often based on non-spherical convex rigid bodies like ellipsoids or spherocylinders representing rodlike or platelike molecules or groups of atoms, with site-site interaction potentials depending both on the distance among the particles and the relative orientation. In this category of potentials, the Gay-Berne family has been studied most extensively.<br /><br />
                     However, conventional molecular graphics programs are not designed to visualize such objects. Usually the basic units are atoms displayed as spheres, or as vertices in a graph. Atomic aggregates can be highlighted through an increasing amount of stylized representations, e.g., Richardson ribbon diagrams for the secondary structure of a protein, Connolly molecular surfaces, density maps, etc., but ellipsoids
                     and spherocylinders are generally missing, especially as elementary simulation units. <br /><br /> We fill this gap providing and discussing a customized OpenGL-based program for the interactive, rendered representation of large ensembles of convex bodies, useful especially in liquid crystal research. We pay particular attention to the performance issues for typical system sizes in this feld. The code is distributed as open source.
                    <br /><br />
                        <a href="http://qmga.sourceforge.net/" target="_blank" rel="noopener noreferrer">QMGA Homepage</a>
                        <br /><br />
                        <a href="https://pubs.acs.org/doi/10.1021/ct700192z" target="_blank" rel="noopener noreferrer">DOI 10.1021/ct700192z</a>
                    </Drawer.Body>
                </Drawer>
            </div>
        );
    }
};

export default Top;