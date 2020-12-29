
import { Dropdown, Sidebar, Sidenav, Nav, Icon, Navbar, Tooltip, Whisper, Divider, Container, Checkbox, InputNumber, Content, Panel, HelpBlock, FormGroup, RadioGroup, Radio, Grid, Row, Col, Header, Footer, Button, FlexboxGrid, Form, ControlLabel, FormControl, Slider, IconButton } from 'rsuite';
import React, { Component, useState } from "react";
import { SliderSet, PositionForm, SliceSlider } from './Tools'

const TITLE_LEFT_MARGIN = 30;
const dividerStyle = {
    color: '#A4A9A3'
}

const LODToolTip = (
    <Tooltip>
        Decreasing LOD will increase rendering speed.
    </Tooltip>
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
                            <Radio value="A">Perspective </Radio>
                            <Radio value="B">Orthographic </Radio>
                        </RadioGroup>
                    </FormGroup>

                </Col>
            </Row>
        </Grid>
        <br />

        <PositionForm title={"Look at"} />

        <Grid fluid>
                <Row className="show-grid">
                    <Col xs={2} />
                    <Col xs={12}>
                        <Checkbox> AutoRotate</Checkbox>
                    </Col>
                </Row>
            </Grid>

        <Divider><strong style={dividerStyle}> Perfomance Tuning </strong></Divider>

        <Grid fluid>

            <Row className="show-grid">
                <Col xs={2} />
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
        <SliceSlider title="X : "/>
        <SliceSlider title="Y : "/>
        <SliceSlider title="Z : "/>
        </div>
    );

}

export const AdditionalLightOptions = ({ ...props }) => {

    return (
        <div {...props}>

            <Divider><strong style={dividerStyle}> Point Light </strong></Divider>

            <Checkbox> <strong>Enabled </strong> </Checkbox>

            <SliderSet titles={["RGB", "Intensity"]} additionalSlider />

            <PositionForm title={"Position"} />

            <Divider><strong style={dividerStyle}>  Directional Light </strong></Divider>

            <Checkbox> <strong> Enabled</strong> </Checkbox>

            <SliderSet titles={["RGB", "Intensity"]} additionalSlider />

            <PositionForm title={"Position"} />



        </div>
    );
}

export const AmbientLightOptions = ({ ...props }) => {

    return (
        <div {...props}>

            <Divider><strong style={dividerStyle}> Ambient Light </strong></Divider>
            <SliderSet titles={["RGB", "Intensity"]} additionalSlider />
            <Divider><strong style={dividerStyle}> Background Colour</strong></Divider>
            <SliderSet titles={["RGB"]} />



        </div>
    );
}


export const VisualElementsOptions = ({ ...props }) => {

    return (
        <div>
            <Divider><strong style={dividerStyle}> Bounding Shape </strong></Divider>
            <Grid fluid>
                <Row className="show-grid">
                    <Col xs={2} />
                    <Col xs={12}>
                        <Checkbox> Enabled </Checkbox>
                    </Col>
                </Row>
            </Grid>

            <Grid fluid>

                <Row className="show-grid">
                    <Col xs={2} />
                    <Col xs={12}>
                        <FormGroup controlId="radioList">
                            <RadioGroup name="radioList">
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
                    <Col xs={2} />
                    <Col xs={12}>
                        <Checkbox> Show Axes</Checkbox>
                        <Checkbox> Show Grid</Checkbox>
                    </Col>
                </Row>
            </Grid>



            <br />
            <SliderSet titles={["RGB", "Size"]} additionalSlider />
            <br />
        </div>
    );
}