
import { Header, Dropdown, FormGroup, Drawer, Nav, Navbar, Icon, Button, ButtonToolbar, Slider, Form, ControlLabel, Whisper, Tooltip } from 'rsuite';
import { ParameterSet } from './Tools';
import React from "react";
import View from './View';

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
                        { marginLeft: 15 },
                        { marginTop: 18, marginLeft: 35 }
                    ]} />

                <Button style={{ width: 180, marginLeft: 25, marginRight: 25, marginTop: 15, marginBottom: 15 }} appearance='primary' onClick={this.export}> Export </Button>
            </Dropdown>);
    }

};

const SamplesDropdown = ({ ...props }) => (

    <Dropdown {...props} onSelect={props.f}>

        <Dropdown.Item eventKey={1}>Sample (Unit Vector Orientations)</Dropdown.Item>
        <Dropdown.Item eventKey={2}>Sample (Quaternion Orientations)</Dropdown.Item>
        <Dropdown.Item eventKey={3}>Fig1: Large Conf (Position Error)</Dropdown.Item>
        <Dropdown.Item eventKey={4}>HBC (Position Error)</Dropdown.Item>
        <Dropdown.Item panel style={{ padding: 5, width: 120 }}></Dropdown.Item>


    </Dropdown>
);

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
            <Dropdown title="Performance" trigger='click' placement="bottomEnd" icon={<Icon icon="dashboard" />}>
                <Form style={{ marginLeft: 20, marginTop: 20 }} layout="inline">
                    <FormGroup>
                        <ControlLabel>Level of Detail</ControlLabel>
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

        this.state = { fps: 50.00, showDrawer: false };
        this.updateFPS = this.updateFPS.bind(this);
        this.toggleDrawer = this.toggleDrawer.bind(this);

        this.chronometer = props.chronometer;
        this.chronometer.f = this.updateFPS;
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
        return (
            <div>
                <Header style={{ height: 56 }}>
                    <Navbar>
                        <Navbar.Body>
                            <Nav pullRight >
                                <ButtonToolbar>
                                    <Nav.Item active>fps: {fps}</Nav.Item>
                                    <Nav.Item appearance="subtle" disabled={true} icon={<Icon icon="info-circle" />}>Manual</Nav.Item>
                                    <PerformanceDropdown model={this.model} />
                                    <SamplesDropdown title="Library" trigger='click' f={this.functions[3]} placement="bottomEnd" icon={<Icon icon="folder-o" />} />
                                    <Nav.Item onClick={this.toggleDrawer} appearance="subtle" icon={<Icon icon="book" />}>Notes</Nav.Item>
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
                    Coarse-grained modeling of molecular fluids is often based on non-spherical convex rigid bodies like ellipsoids or spherocylinders representing rodlike or platelike molecules or groups of atoms, with site-site interaction potentials depending both on the distance among the particles and the relative orientation. In this category of potentials, the Gay-Berne family has been studied most extensively.<br/><br/>
                     However, conventional molecular graphics programs are not designed to visualize such objects. Usually the basic units are atoms displayed as spheres, or as vertices in a graph. Atomic aggregates can be highlighted through an increasing amount of stylized representations, e.g., Richardson ribbon diagrams for the secondary structure of a protein, Connolly molecular surfaces, density maps, etc., but ellipsoids 
                     and spherocylinders are generally missing, especially as elementary simulation units. <br/><br/> We fill this gap providing and discussing a customized OpenGL-based program for the interactive, rendered representation of large ensembles of convex bodies, useful especially in liquid crystal research. We pay particular attention to the performance issues for typical system sizes in this feld. The code is distributed as open source. 
                    <br/><br/>
                    <a href="http://qmga.sourceforge.net/" target="_blank" rel="noopener noreferrer">QMGA Homepage</a>
                    <br/><br/>
                    <a href="https://pubs.acs.org/doi/10.1021/ct700192z" target="_blank" rel="noopener noreferrer">DOI 10.1021/ct700192z</a>
                    </Drawer.Body>
                </Drawer>
            </div>
        );
    }
};

export default Top;