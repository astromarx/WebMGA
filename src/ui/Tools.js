

import { Dropdown, Sidebar, Sidenav, Nav, Icon, Navbar, Container, Checkbox, InputNumber, Content, Panel, HelpBlock, FormGroup, RadioGroup, Radio, Grid, Row, Col, Header, Footer, Button, FlexboxGrid, Form, ControlLabel, FormControl, Slider } from 'rsuite';
import React, { Component, useState } from "react";

const TITLE_LEFT_MARGIN = 30;

export const CustomSlider = (props) => {

    var [value, setValue] = useState(0);
    var [disabled, disable] = useState(false);

    disabled = props.disabled;
    const [min, max] = props.boundaries;

    return (

        <Row>
            <Col md={10}>
                <Slider
                    style={{ marginLeft: 25, marginTop: 16, width: 175 }}
                    value={value}
                    min={min}
                    max={max}
                    disabled={disabled}
                    onChange={value => {
                        setValue(value);
                    }}
                />
            </Col>
            <Col md={4}>
                <InputNumber
                    style={{ marginLeft: 85, width: 70 }}
                    min={min}
                    max={max}
                    value={value}
                    disabled={disabled}
                    onChange={value => {
                        setValue(value);
                    }}
                />
            </Col>
        </Row>
    );

}

export const SliderSet = (props) => {
    const titles = props.titles;
    const additionalSlider = props.additionalSlider;

    var threeSet = (
        <div>
            <p style={{ marginLeft: TITLE_LEFT_MARGIN }}> {titles[0]} </p>
            <CustomSlider disabled={false} boundaries={[1, 256]} />
            <Dropdown.Item panel style={{ padding: 5, width: 300 }}></Dropdown.Item>
            <CustomSlider disabled={false} boundaries={[1, 256]} />
            <Dropdown.Item panel style={{ padding: 5, width: 300 }}></Dropdown.Item>
            <CustomSlider disabled={false} boundaries={[1, 256]} />
        </div>
    );

    var additional = (
        <div>
            <p style={{ marginLeft: TITLE_LEFT_MARGIN }}> {titles[1]} </p>
            <CustomSlider disabled={false} boundaries={[0, 100]} />
        </div>
    );

    return (
        <div>
            <FormGroup>
                {threeSet}
                {additionalSlider ? additional : null}
            </FormGroup>
        </div>
    );

}

export const PositionForm = (props) => {
    const title = props.title;

    return (
        <div>
            <p style={{ marginLeft: TITLE_LEFT_MARGIN }}> {title} </p>
            <Dropdown.Item panel style={{ padding: 5, width: 300 }}></Dropdown.Item>
            <FlexboxGrid justify='center'>
                <Row className="show-grid">

                    <Form layout="inline">

                        <FormGroup>
                            <ControlLabel>x</ControlLabel>
                            <FormControl name="x" style={{ width: 50 }} />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>y</ControlLabel>
                            <FormControl name="y" style={{ width: 50 }} />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>z</ControlLabel>
                            <FormControl name="z" style={{ width: 50 }} />
                        </FormGroup>
                    </Form>
                </Row>
            </FlexboxGrid>
        </div>
    );
}