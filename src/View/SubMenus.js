
import { Dropdown, Sidebar, Sidenav, Nav, Icon, Navbar, ButtonGroup, Tooltip, Whisper, Divider, Container, Checkbox, InputNumber, Content, Panel, HelpBlock, FormGroup, RadioGroup, Radio, Grid, Row, Col, Header, Footer, Button, FlexboxGrid, Form, ControlLabel, FormControl, Slider, IconButton } from 'rsuite';
import React, { Component, useState } from "react";
import { SliderSet, SliceSlider, ParameterInput, ParameterSet } from './Tools'

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
        <SliderSet titles={["RGB"]} rgb />

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

        <ParameterSet titles={["X position", "Y position", "Z position"]}/>
        <br/>

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
                <SliderSet titles={["RGB", "Intensity"]} additionalSlider rgb />
                <SliderSet titles={["Position XYZ"]} pos />


            </div>
        );
    }
}

export const AmbientLightOptions = ({ ...props }) => {

    return (
        <div {...props}>

            <Divider><strong style={dividerStyle}> Ambient Light </strong></Divider>
            <SliderSet titles={["RGB", "Intensity"]} additionalSlider rgb />
            <Divider><strong style={dividerStyle}> Background Colour</strong></Divider>
            <SliderSet titles={["RGB"]} rgb />



        </div>
    );
}


export const VisualElementsOptions = ({ ...props }) => {

    return (
        <div>
            <Divider><strong style={dividerStyle}> Bounding Shape </strong></Divider>

            <Grid fluid>

                <Row className="show-grid">
                    <Col xs={1} />
                    <Col xs={12}>

                        <Checkbox> Enabled </Checkbox>
                        <br />

                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={2} />
                    <Col xs={12}>
                        <FormGroup controlId="radioList">
                            <RadioGroup name="radioList">
                                <p>Shapes</p>
                                <Radio value="A">Box </Radio>
                                <Radio value="B">Sphere </Radio>
                                <Radio value="B">Cylinder </Radio>
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
                        <Checkbox> Show Axes</Checkbox>
                        <Checkbox> Show Grid</Checkbox>
                    </Col>
                </Row>
            </Grid>



            <br />
            <SliderSet titles={["RGB", "Size"]} additionalSlider rgb />
            <br />
        </div>
    );
}