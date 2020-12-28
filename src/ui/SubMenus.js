
import { Dropdown, Sidebar, Sidenav, Nav, Icon, Navbar, Container, Checkbox, InputNumber, Content, Panel, HelpBlock, FormGroup, RadioGroup, Radio, Grid, Row, Col, Header, Footer, Button, FlexboxGrid, Form, ControlLabel, FormControl, Slider } from 'rsuite';
import React, { Component, useState } from "react";
import { SliderSet, PositionForm } from './Tools'

const TITLE_LEFT_MARGIN = 30;

export const CameraOptions = ({ ...props }) => (
    <Dropdown panel title="View" eventKey="2" icon={<Icon icon="eye" />} {...props}>
        <Dropdown.Item divider />
        <Dropdown.Item panel style={{ padding: 5, width: 300 }}></Dropdown.Item>

        <p style={{ marginLeft: TITLE_LEFT_MARGIN }}> Camera Type </p>
        <Grid fluid>

            <Row className="show-grid">
                <Col xs={2} />
                <Col xs={12}>

                    <Dropdown.Item panel style={{ padding: 5, width: 300 }}></Dropdown.Item>
                    <FormGroup controlId="radioList">
                        <RadioGroup name="radioList">
                            <Radio value="A">Perspective </Radio>
                            <Radio value="B">Orthographic </Radio>
                        </RadioGroup>
                    </FormGroup>
                    <Dropdown.Item panel style={{ padding: 5, width: 300 }}></Dropdown.Item>
                </Col>
            </Row>
        </Grid>

        <PositionForm title={"Look at"} />
        <Dropdown.Item divider />

    </Dropdown>
);

export const AdditionalLightOptions = ({ ...props }) => {

    return (
        <Dropdown panel title="Additional Lighting" eventKey="5" icon={<Icon icon="creative" />} {...props}>
            <Dropdown.Item divider />
            <Checkbox> <strong>Point Light</strong> </Checkbox>

            <Dropdown.Item panel style={{ padding: 5, width: 300 }}></Dropdown.Item>
            <SliderSet titles={["RGB", "Intensity"]} additionalSlider />
            <Dropdown.Item panel style={{ padding: 5, width: 300 }}></Dropdown.Item>

            <PositionForm title={"Position"} />

            <Dropdown.Item divider />
            <Checkbox> <strong> Directional Light</strong> </Checkbox>

            <Dropdown.Item panel style={{ padding: 5, width: 300 }}></Dropdown.Item>
            <SliderSet titles={["RGB", "Intensity"]} additionalSlider />
            <Dropdown.Item panel style={{ padding: 5, width: 300 }}></Dropdown.Item>

            <PositionForm title={"Position"} />
            <Dropdown.Item divider />

        </Dropdown>
    );
}

export const AmbientLightOptions = ({ ...props }) => {

    return (
        <Dropdown panel title="Ambient Lighting" eventKey="4" icon={<Icon icon="sun-o" />} {...props}>
            <Dropdown.Item divider />
            <strong>Ambient Light</strong>

            <Dropdown.Item panel style={{ padding: 5, width: 300 }}></Dropdown.Item>
            <SliderSet titles={["RGB", "Intensity"]} additionalSlider />
            <Dropdown.Item panel style={{ padding: 5, width: 300 }}></Dropdown.Item>

            <Dropdown.Item divider />
            <Checkbox> <strong> Background Color</strong> </Checkbox>

            <Dropdown.Item panel style={{ padding: 5, width: 300 }}></Dropdown.Item>
            <SliderSet titles={["RGB"]} />
            <Dropdown.Item panel style={{ padding: 5, width: 300 }}></Dropdown.Item>

            <Dropdown.Item divider />

        </Dropdown>
    );
}

export const GridOptions = ({ ...props }) => {

    return (
        <Dropdown panel title="Grid" eventKey="7" icon={<Icon icon="tree-open" />} {...props}>
            <Dropdown.Item divider />
            <Checkbox> <strong>Show Axes</strong> </Checkbox>
            <Checkbox> <strong>Show Grid</strong> </Checkbox>
            <Dropdown.Item panel style={{ padding: 5, width: 300 }}></Dropdown.Item>
            <SliderSet titles={["RGB", "Size"]} additionalSlider />
            <Dropdown.Item panel style={{ padding: 5, width: 300 }}></Dropdown.Item>
            <Dropdown.Item divider />
        </Dropdown>
    );
}

export const BoundingShapesOptions = ({ ...props }) => {

    return (
        <Dropdown panel title="Bounding Shapes" eventKey="10" icon={<Icon icon="cube" />} {...props}>
            <Dropdown.Item divider />
            <Checkbox> Enabled </Checkbox>
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
                        <Dropdown.Item panel style={{ padding: 5, width: 300 }}></Dropdown.Item>
                    </Col>
                </Row>
            </Grid>
            <p style={{ marginLeft: TITLE_LEFT_MARGIN }}> PRINT SHAPE INFO HERE</p>
            <Dropdown.Item panel style={{ padding: 5, width: 300 }}></Dropdown.Item>
            <Dropdown.Item divider />
        </Dropdown>
    );
}