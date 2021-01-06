
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

    constructor(props) {
        super();
        this.state = View.PointLightState;
        this.model = props.model;
        this.reset = 0;
        this.handleSelect = this.handleSelect.bind(this);
        this.updateColour = this.updateColour.bind(this);
        this.updatePosition = this.updatePosition.bind(this);
        this.toggleLightEnabled = this.toggleLightEnabled.bind(this);
        
    }
    handleSelect() {
        if (this.state.active.localeCompare('point') == 0) {
            this.setState(View.DirectionalLightState);
        } else {
            this.setState(View.PointLightState);
        }
        if (this.reset > 5){
            this.reset = 0;
        }

        this.setState({reset: ++this.reset});
    }
    toggleLightEnabled() {
        let enabled = !this.state.enabled;
        this.setState({
            enabled: enabled
        });
        if (this.state.active.localeCompare('point') == 0) {
            View.PointLightState.enabled = enabled;
        } else {
            View.DirectionalLightState.enabled = enabled;
        }

        if(enabled){
            this.updateColour(60, 'i');
        }else{
            this.updateColour(0, 'i');
        }
        this.setState({reset: ++this.reset});
    }
    updateColour(value, type) {
        let colour = this.state.colour;

        switch (type) {
            case 'r':
                colour.r = value;
                break;
            case 'g':
                colour.g = value;
                break;
            case 'b':
                colour.b = value;
                break;
            case 'i':
                colour.i = value;
                break;
            default:
                break;
        }

        if (this.state.active.localeCompare('point') == 0) {
            this.model.updateLight(2, colour);
            View.PointLightState.colour = colour;
        } else {
            this.model.updateLight(1, colour);
            View.DirectionalLightState.colour = colour;
        }
    }
    updatePosition(value, type) {
        let position = this.state.position;

        switch (type) {
            case 'x':
                position.x = value;
                break;
            case 'y':
                position.y = value;
                break;
            case 'z':
                position.z = value;
                break;
        }

        if (this.state.active.localeCompare('point') == 0) {
            this.model.updateLightPosition(2, position);
            View.PointLightState.position = position;
        } else {
            this.model.updateLightPosition(1, position);
            View.DirectionalLightState.position = position;
        }
    }

    render() {
        const active = this.state.active;

        const lightState = this.state;

        return (

            <div key={lightState.reset}>
                <br />
                <AdditionalLightsNav active={active} onSelect={this.handleSelect} />
                <br />
                <Grid fluid>
                    <Row className="show-grid">
                        <Col xs={1} />
                        <Col xs={12}>
                            <Checkbox checked={lightState.enabled} onClick={this.toggleLightEnabled}> <strong>Enabled </strong> </Checkbox>
                            <br />
                        </Col>
                    </Row>
                </Grid>

                <p style={{ marginLeft: TITLE_LEFT_MARGIN }}> RGB </p>
                <CustomSlider disabled={!lightState.enabled} boundaries={[0, 255]} val={lightState.colour.r} f={this.updateColour} type={'r'}/>
                <CustomSlider disabled={!lightState.enabled} boundaries={[0, 255]} val={lightState.colour.g} f={this.updateColour} type={'g'}/>
                <CustomSlider disabled={!lightState.enabled} boundaries={[0, 255]} val={lightState.colour.b} f={this.updateColour} type={'b'}/>
                <p style={{ marginLeft: TITLE_LEFT_MARGIN }}> Intensity </p>
                <CustomSlider disabled={!lightState.enabled} boundaries={[0, 100]} val={lightState.colour.i} f={this.updateColour} type={'i'}/>
                <p style={{ marginLeft: TITLE_LEFT_MARGIN }}> Position XYZ </p>
                <CustomSlider disabled={!lightState.enabled} boundaries={[-50, 50]} val={lightState.position.x} f={this.updatePosition} type={'x'}/>
                <CustomSlider disabled={!lightState.enabled} boundaries={[-50, 50]} val={lightState.position.y} f={this.updatePosition} type={'y'}/>
                <CustomSlider disabled={!lightState.enabled} boundaries={[-50, 50]} val={lightState.position.z} f={this.updatePosition} type={'z'}/>

            </div>
        );
    }
}

export class AmbientLightOptions extends React.Component {

    constructor(props) {
        super();

        this.state = View.AmbientLightState;

        this.model = props.model;

        this.updateAmbientLightColour = this.updateAmbientLightColour.bind(this);
        this.updateBackgroundColour = this.updateBackgroundColour.bind(this);
    }
    updateAmbientLightColour(value, type) {
        let colour = this.state.ambientLightColour;

        switch (type) {
            case 'r':
                colour.r = value;
                break;
            case 'g':
                colour.g = value;
                break;
            case 'b':
                colour.b = value;
                break;
            case 'i':
                colour.i = value;
                break;
        }
        this.model.updateLight(0, colour);
        View.AmbientLightState.ambientLightColour = colour;
    }
    updateBackgroundColour(value, type) {
        let colour = this.state.backgroundColour;

        switch (type) {
            case 'r':
                colour.r = value;
                break;
            case 'g':
                colour.g = value;
                break;
            case 'b':
                colour.b = value;
                break;
        }
        this.model.updateBg(colour);
        View.AmbientLightState.backgroundColour = colour;
    }
    render() {
        const ambientLightColour = this.state.ambientLightColour;
        const backgroundColour = this.state.backgroundColour;
        return (
            <div>

                <Divider><strong style={dividerStyle}> Ambient Light </strong></Divider>
                <p style={{ marginLeft: TITLE_LEFT_MARGIN }}> RGB </p>
                <CustomSlider disabled={false} boundaries={[0, 255]} val={ambientLightColour.r} f={this.updateAmbientLightColour} type={'r'} />
                <CustomSlider disabled={false} boundaries={[0, 255]} val={ambientLightColour.g} f={this.updateAmbientLightColour} type={'g'} />
                <CustomSlider disabled={false} boundaries={[0, 255]} val={ambientLightColour.b} f={this.updateAmbientLightColour} type={'b'} />
                <p style={{ marginLeft: TITLE_LEFT_MARGIN }}> Intensity </p>
                <CustomSlider disabled={false} boundaries={[0, 100]} val={ambientLightColour.i} f={this.updateAmbientLightColour} type={'i'} />
                <Divider><strong style={dividerStyle}> Background Colour</strong></Divider>
                <p style={{ marginLeft: TITLE_LEFT_MARGIN }}> RGB </p>
                <CustomSlider disabled={false} boundaries={[0, 255]} val={backgroundColour.r} f={this.updateBackgroundColour} type={'r'} />
                <CustomSlider disabled={false} boundaries={[0, 255]} val={backgroundColour.g} f={this.updateBackgroundColour} type={'g'} />
                <CustomSlider disabled={false} boundaries={[0, 255]} val={backgroundColour.b} f={this.updateBackgroundColour} type={'b'} />
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
        this.updateGridColour = this.updateGridColour.bind(this);
        this.updateGridSize = this.updateGridSize.bind(this);

    }
    updateGridColour(value, type) {
        let rgb = this.state.gridColour;

        switch (type) {
            case 'r':
                rgb.r = value;
                break;
            case 'g':
                rgb.g = value;
                break;
            case 'b':
                rgb.b = value;
                break;
        }
        this.model.updateGridColour(rgb);
        View.VisualElementsState.gridColour = rgb;
    }
    updateGridSize(value) {
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
        const colour = this.state.gridColour;
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
                <CustomSlider disabled={false} boundaries={[0, 255]} val={colour.r} f={this.updateGridColour} type={'r'} />
                <CustomSlider disabled={false} boundaries={[0, 255]} val={colour.g} f={this.updateGridColour} type={'g'} />
                <CustomSlider disabled={false} boundaries={[0, 255]} val={colour.b} f={this.updateGridColour} type={'b'} />
                <p style={{ marginLeft: TITLE_LEFT_MARGIN }}> Size </p>
                <CustomSlider disabled={false} boundaries={[0, 100]} val={size} f={this.updateGridSize} />

                <br />
            </div>
        );
    }
}