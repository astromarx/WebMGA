

import { Dropdown, RangeSlider, InputGroup, Sidebar, Sidenav, Nav, Icon, Navbar, Container, Checkbox, InputNumber, Content, Panel, HelpBlock, FormGroup, RadioGroup, Radio, Grid, Row, Col, Header, Footer, Button, FlexboxGrid, Form, ControlLabel, FormControl, Slider } from 'rsuite';
import React, { Component, useState } from "react";

const TITLE_LEFT_MARGIN = 30;

export const SliceSlider = (props) => {
    const [value, setValue] = React.useState([-50, 50]);
    return (
        <div>
            <br/><br/>
            <Row>
                <Col md={5}>
                    <p style={{ marginTop: 10, marginLeft: 30 }}>{props.title}</p>
                </Col>
                <Col md={1}/>
                <Col md={16}>
                    <InputGroup>
                        <InputNumber
                            min={-50}
                            max={50}
                            value={value[0]}
                            
                            onChange={nextValue => {
                                const [start, end] = value;
                                if (nextValue > end) {
                                    return;
                                }
                                setValue([nextValue, end]);
                            }}
                        />
                        <InputGroup.Addon>to</InputGroup.Addon>
                        <InputNumber
                            min={-50}
                            max={50}
                            value={value[1]}
                            onChange={nextValue => {
                                const [start, end] = value;
                                if (start > nextValue) {
                                    return;
                                }
                                setValue([start, nextValue]);
                            }}
                        />
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col md={21}>
                    <RangeSlider
                        min={-50}
                        max={50}
                        progress
                        style={{ marginLeft: 35, marginTop: 30 }}
                        value={value}
                        onChange={value => {
                            setValue(value);
                        }}
                    />
                </Col>

            </Row>
        </div>
    );
}

export const CustomSlider = (props) => {

    var [value, setValue] = useState(0);
    var [disabled, disable] = useState(false);

    disabled = props.disabled;
    const [min, max] = props.boundaries;

    return (

        <Row>
            <Col md={10}>
                <Slider
                    style={{ marginLeft: 25, marginTop: 16, width: 170 }}
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
                    style={{ marginLeft: 80, marginTop: 3, marginBottom: 3, width: 70, height: 35 }}
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
            <CustomSlider disabled={false} boundaries={[1, 256]} />
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
            <Panel style={{ height: 8 }} />
            <FlexboxGrid justify='center'>
                <Row className="show-grid">

                    <Form layout="inline">

                        <FormGroup>
                            <ControlLabel>x</ControlLabel>
                            <FormControl name="x" style={{ width: 55 }} />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>y</ControlLabel>
                            <FormControl name="y" style={{ width: 55 }} />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>z</ControlLabel>
                            <FormControl name="z" style={{ width: 55 }} />
                        </FormGroup>
                    </Form>
                </Row>
            </FlexboxGrid>
        </div>
    );
}