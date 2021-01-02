
import { Dropdown, Sidebar, Sidenav, Nav, Icon, Navbar, ButtonGroup, Tooltip, Whisper, Divider, Container, Checkbox, InputNumber, Content, Panel, HelpBlock, FormGroup, RadioGroup, Radio, Grid, Row, Col, Header, Footer, Button, FlexboxGrid, Form, ControlLabel, FormControl, Slider, IconButton } from 'rsuite';
import React, { Component, useState } from "react";
import { SliceSlider, ParameterInput, ParameterSet, CustomSlider } from './Tools'
import View from './View'

const TITLE_LEFT_MARGIN = 30;
const dividerStyle = {
    color: '#A4A9A3'
}

const LODToolTip = (
    <Tooltip>
        Decreasing LOD will increase rendering speed.
    </Tooltip>
);

export const ModelsOptions = ({ ...props }) => (


    <div>
        <Divider><strong style={dividerStyle}> Configuration</strong></Divider>
        <ParameterInput title="Set" values={["Set A", "Set B", "Set C", "Set D"]} active={"Set C"} />
        <ParameterInput title="Shape" values={["Ellipsoid", "Sphere", "Spherocylinder", "Spheroplatelet", "Cut Sphere", "Cone", "Cylinder"]} active={"Spheroplatelet"} />
        <ParameterInput title="Material" values={["Basic", "Lambert", "Phong", "Matcap"]} active={"Lambert"} />
        <ParameterInput title="Display As" values={["Figure", "Line", "Wireframe"]} active={"Figure"} />
        <br />
        <Divider><strong style={dividerStyle}>  Parameters </strong></Divider>
        <ParameterSet titles={["Radius", "Length"]} values={[4.0, 3.0]} />
        <Divider><strong style={dividerStyle}>  Colour </strong></Divider>
        <Row className="show-grid">
            <Col xs={1} />
            <Col xs={20}>

                <Checkbox> Set from Director </Checkbox>
                <br />

            </Col>
        </Row>

        <p style={{ marginLeft: TITLE_LEFT_MARGIN }}> RGB </p>
        <CustomSlider disabled={false} boundaries={[1, 256]} val={20} />
        <CustomSlider disabled={false} boundaries={[1, 256]} val={40} />
        <CustomSlider disabled={false} boundaries={[1, 256]} val={90} />

    </div>
);

export const ViewOptions = ({ ...props }) => (
    <div {...props}>

        <Divider><strong style={dividerStyle}> Camera </strong></Divider>
        <Grid fluid>
            <Row className="show-grid">
                <Col xs={2} />
                <Col xs={12}>

                    <FormGroup controlId="radioList">
                        <RadioGroup name="radioList">
                            <p>Type</p>
                            <Radio value="A">Perspective </Radio>
                            <Radio value="B">Orthographic </Radio>
                        </RadioGroup>
                    </FormGroup>

                </Col>
            </Row>
            <Row className="show-grid">
                <Col xs={1} />
                <Col xs={12}>
                    <br />
                    <Checkbox> AutoRotate</Checkbox>
                </Col>
            </Row>
            <Row className="show-grid">
                <Col xs={2} />
                <Col xs={12}>
                    <br />
                    <p> Look at</p>
                </Col>
            </Row>
        </Grid>

        <ParameterSet titles={["X position", "Y position", "Z position"]} />
        <br />

        <Grid fluid>

        </Grid>

        <Divider><strong style={dividerStyle}> Perfomance Tuning </strong></Divider>

        <Grid fluid>

            <Row className="show-grid">
                <Col xs={1} />
                <Col xs={12}>
                    <Checkbox> Antialiasing </Checkbox>
                </Col>
            </Row>
        </Grid>

        <br />

        <Form style={{ marginLeft: TITLE_LEFT_MARGIN }} layout="inline">
            <FormGroup>
                <ControlLabel>Level of Detail</ControlLabel>
                <Whisper placement="top" trigger="hover" speaker={LODToolTip}>
                    <Icon circle icon="question-circle" size="md" style={{ marginTop: 12 }} />
                </Whisper>
            </FormGroup>
        </Form>

        <Slider

            min={1}
            step={1}
            max={5}
            defaultValue={4}
            graduated
            progress
            style={{ width: 220, marginLeft: 40 }}
            renderMark={mark => {
                return mark;
            }}
        />

    </div>
);

export const SlicingOptions = ({ ...props }) => {

    return (
        <div>
            <SliceSlider title="X : " />
            <SliceSlider title="Y : " />
            <SliceSlider title="Z : " />
        </div>
    );

}

export const AdditionalLightsNav = ({ active, onSelect }) => {
    return (
        <Nav activeKey={active} onSelect={onSelect} style={{ margin: 10, width: 280 }} justified appearance="tabs">
            <Nav.Item eventKey="point">Point</Nav.Item>
            <Nav.Item eventKey="directional">Directional</Nav.Item>
        </Nav>
    );
};

export class AdditionalLightOptions extends React.Component {

    constructor() {
        super();
        this.state = {
            active: 'point'
        };
        this.handleSelect = this.handleSelect.bind(this);
    }
    handleSelect(activeKey) {
        this.setState({ active: activeKey });
    }
    render() {
        const { active } = this.state;
        return (

            <div >
                <AdditionalLightsNav active={active} onSelect={this.handleSelect} />
                <br />
                <Grid fluid>
                    <Row className="show-grid">
                        <Col xs={1} />
                        <Col xs={12}>
                            <Checkbox> <strong>Enabled </strong> </Checkbox>
                            <br />
                        </Col>
                    </Row>
                </Grid>

                <p style={{ marginLeft: TITLE_LEFT_MARGIN }}> RGB </p>
                <CustomSlider disabled={false} boundaries={[1, 256]} val={20} />
                <CustomSlider disabled={false} boundaries={[1, 256]} val={40} />
                <CustomSlider disabled={false} boundaries={[1, 256]} val={90} />
                <p style={{ marginLeft: TITLE_LEFT_MARGIN }}> Intensity </p>
                <CustomSlider disabled={false} boundaries={[0, 100]} val={70} />
                <p style={{ marginLeft: TITLE_LEFT_MARGIN }}> Position XYZ </p>
                <CustomSlider disabled={false} boundaries={[-50, 50]} val={20} />
                <CustomSlider disabled={false} boundaries={[-50, 50]} val={40} />
                <CustomSlider disabled={false} boundaries={[-50, 50]} val={-30} />

            </div>
        );
    }
}

export class AmbientLightOptions extends React.Component {
    
    constructor(props) {
        super();

        this.state = View.AmbientLightState;

        this.model = props.model;

        this.updateAR = this.updateAR.bind(this);
        this.updateAG = this.updateAG.bind(this);
        this.updateAB = this.updateAB.bind(this);
        this.updateI = this.updateI.bind(this);
        this.updateBR = this.updateBR.bind(this);
        this.updateBG = this.updateBG.bind(this);
        this.updateBB = this.updateBB.bind(this);
    }
    updateAR(value) {
        this.setState({
            aR: value
        });
        this.model.updateLight(0, value, this.state.aB, this.state.aG, this.state.i);
        View.AmbientLightState.aR = value;
    }
    updateAG(value) {
        this.setState({
            aG: value
        });
        this.model.updateLight(0, this.state.aR, value, this.state.aG, this.state.i);
        View.AmbientLightState.aG = value;
    }
    updateAB(value) {
        this.setState({
            aB: value
        });
        this.model.updateLight(0, this.state.aR, this.state.aB, value, this.state.i);
        View.AmbientLightState.aB = value;
    }
    updateI(value) {
        this.setState({
            i: value
        });
        this.model.updateLight(0, this.state.aR, this.state.aB, this.state.aG, value);
        View.AmbientLightState.i = value;
    }
    updateBR(value) {
        this.setState({
            bR: value
        });
        this.model.updateBg(value, this.state.bG, this.state.bB);
        View.AmbientLightState.bR = value;
    }
    updateBG(value) {
        this.setState({
            bG: value
        });
        this.model.updateBg(this.state.bR, value, this.state.bB);
        View.AmbientLightState.bG = value;
    }
    updateBB(value) {
        this.setState({
            bB: value
        });
        this.model.updateBg(this.state.bR, this.state.bG , value);
        View.AmbientLightState.bB = value;
    }

    render() {
        const aR = this.state.aR;
        const aB = this.state.aB;
        const aG = this.state.aG;
        const i = this.state.i;
        const bR = this.state.bR;
        const bG = this.state.bG;
        const bB = this.state.bB;
        return (
            <div>

                <Divider><strong style={dividerStyle}> Ambient Light </strong></Divider>
                <p style={{ marginLeft: TITLE_LEFT_MARGIN }}> RGB </p>
                <CustomSlider disabled={false} boundaries={[0, 255]} val={aR} f={this.updateAR} />
                <CustomSlider disabled={false} boundaries={[0, 255]} val={aB} f={this.updateAG} />
                <CustomSlider disabled={false} boundaries={[0, 255]} val={aG} f={this.updateAB} />
                <p style={{ marginLeft: TITLE_LEFT_MARGIN }}> Intensity </p>
                <CustomSlider disabled={false} boundaries={[0, 100]} val={i} f={this.updateI} />
                <Divider><strong style={dividerStyle}> Background Colour</strong></Divider>
                <p style={{ marginLeft: TITLE_LEFT_MARGIN }}> RGB </p>
                <CustomSlider disabled={false} boundaries={[0, 255]} val={bR} f={this.updateBR}/>
                <CustomSlider disabled={false} boundaries={[0, 255]} val={bG} f={this.updateBG}/>
                <CustomSlider disabled={false} boundaries={[0, 255]} val={bB} f={this.updateBB}/>
            </div>
        );
    }
}


export class VisualElementsOptions extends React.Component {

    constructor(props) {
        super();
        this.state = View.VisualElementsState;

        this.model = props.model;
        this.toggleBoundingShapeEnabled = this.toggleBoundingShapeEnabled.bind(this);
        this.selectShape = this.selectShape.bind(this);
        this.toggleAxes = this.toggleAxes.bind(this);
        this.toggleGrid = this.toggleGrid.bind(this);
        this.updateR = this.updateR.bind(this);
        this.updateG = this.updateG.bind(this);
        this.updateB = this.updateB.bind(this);
        this.updateSize = this.updateSize.bind(this);

    }
    updateR(value) {
        this.setState({
            r: value
        });
        this.model.updateGridColour(value, this.state.g, this.state.b);
        View.VisualElementsState.r = value;
    }
    updateG(value) {
        this.setState({
            g: value
        });
        this.model.updateGridColour(this.state.r, value, this.state.b);
        View.VisualElementsState.g = value;
    }
    updateB(value) {
        this.setState({
            b: value
        });
        this.model.updateGridColour(this.state.r, this.state.g, value);
        View.VisualElementsState.b = value;
    }
    updateSize(value) {
        this.setState({
            size: value
        });
        this.model.updateGridSize(value);
        View.VisualElementsState.size = value;
    }
    toggleBoundingShapeEnabled() {
        this.setState({
            boundingShapeEnabled: !this.state.boundingShapeEnabled
        });
        View.VisualElementsState.boundingShapeEnabled = !View.VisualElementsState.boundingShapeEnabled;
    }
    selectShape(value) {
        this.setState({
            activeShape: value
        });
        View.VisualElementsState.activeShape = value;
    }
    toggleAxes() {
        this.setState({
            showAxes: !this.state.showAxes
        });
        this.model.toggleAxes();
        View.VisualElementsState.showAxes = !View.VisualElementsState.showAxes;
    }
    toggleGrid() {
        this.setState({
            showGrid: !this.state.showGrid
        });
        this.model.toggleGrid();
        View.VisualElementsState.showGrid = !View.VisualElementsState.showGrid;
    }

    render() {
        const enabled = this.state.boundingShapeEnabled;
        const activeShape = this.state.activeShape;
        const showAxes = this.state.showAxes;
        const showGrid = this.state.showGrid;
        const r = this.state.r;
        const g = this.state.g;
        const b = this.state.b;
        const size = this.state.size;
        return (
            <div>
                <Divider><strong style={dividerStyle}> Bounding Shape </strong></Divider>

                <Grid fluid>

                    <Row className="show-grid">
                        <Col xs={1} />
                        <Col xs={12}>
                            <Checkbox checked={enabled} onClick={this.toggleBoundingShapeEnabled}> Enabled </Checkbox>
                            <br />

                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={2} />
                        <Col xs={12}>
                            <FormGroup controlId="radioList">
                                <RadioGroup name="radioList" value={activeShape} onChange={this.selectShape}>
                                    <p>Shapes</p>
                                    <Radio disabled={!enabled} value="box"  >Box </Radio>
                                    <Radio disabled={!enabled} value="sphere" >Sphere </Radio>
                                    <Radio disabled={!enabled} value="cylinder" >Cylinder </Radio>
                                </RadioGroup>
                            </FormGroup>
                            <br />
                        </Col>
                    </Row>
                </Grid>
                <p style={{ marginLeft: TITLE_LEFT_MARGIN }}> PRINT SHAPE INFO HERE</p>

                <Divider><strong style={dividerStyle}> Grid </strong></Divider>
                <Grid fluid>
                    <Row className="show-grid">
                        <Col xs={1} />
                        <Col xs={12}>
                            <Checkbox checked={showAxes} onClick={this.toggleAxes}> Show Axes</Checkbox>
                            <Checkbox checked={showGrid} onClick={this.toggleGrid}> Show Grid</Checkbox>
                        </Col>
                    </Row>
                </Grid>

                <br />
                <p style={{ marginLeft: TITLE_LEFT_MARGIN }}> RGB </p>
                <CustomSlider disabled={false} boundaries={[0, 255]} val={r} f={this.updateR} />
                <CustomSlider disabled={false} boundaries={[0, 255]} val={g} f={this.updateG} />
                <CustomSlider disabled={false} boundaries={[0, 255]} val={b} f={this.updateB} />
                <p style={{ marginLeft: TITLE_LEFT_MARGIN }}> Size </p>
                <CustomSlider disabled={false} boundaries={[0, 100]} val={size} f={this.updateSize} />

                <br />
            </div>
        );
    }
}