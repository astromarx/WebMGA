

import { Dropdown, RangeSlider, InputGroup, Sidebar, Sidenav, Nav, Icon, Navbar, Container, Checkbox, InputNumber, Content, Panel, HelpBlock, FormGroup, RadioGroup, Radio, Grid, Row, Col, Header, Footer, Button, FlexboxGrid, Form, ControlLabel, FormControl, Slider, ButtonToolbar } from 'rsuite';
import React, { Component, useState } from "react";

const TITLE_LEFT_MARGIN = 30;

export const ParameterSet = (props) => {
    var set = [];
    let val;
    for (let i = 0; i < props.titles.length; i++) {
        if (!props.values) {
            val = 0;
        } else {
            val = props.values[i];
        }
        set.push(
            <ParameterInput title={props.titles[i]} values={val} numerical />
            );
    }

    return set;
}

export const ParameterInput = (props) => {

    var InputBox;

    if (props.numerical) {
        const defaultVal = props.values;
        console.log(defaultVal);
        InputBox =
            (<div style={{ width: 140 }}>
                <InputNumber defaultValue={defaultVal} step={0.1} />
            </div>);
    } else {

        const vals = props.values;
        const active = props.active;

        var listItems = [];
        let act;

        for (let val of vals) {
            (active.localeCompare(val)) ? act = false : act = true;
            listItems.push(<Dropdown.Item active={act} >{val}</Dropdown.Item>);
        }

        listItems.push(<Dropdown.Item panel style={{ width: 150 }}></Dropdown.Item>);

        InputBox = (
            <ButtonToolbar style={{ width: 120}}>
                <Dropdown style={{ width: 200 }} title={props.active}>
                    {listItems}
                </Dropdown>
            </ButtonToolbar>
        );
    }

    return (
        <div style={{}}>
            <Row style={{marginTop: 15}}>

                <Col md={10}><p style={{ marginTop: 10, marginLeft: 30 }}>{props.title}</p></Col>
                <Col md={8} />
                <Col md={10}>{InputBox}</Col>

            </Row>
        </div>
    );
}


export const SliceSlider = (props) => {
    const [value, setValue] = React.useState([-50, 50]);


    return (
        <div>
            <br /><br />
            <Row>
                <Col md={5}>
                    <p style={{ marginTop: 10, marginLeft: 30 }}>{props.title}</p>
                </Col>
                <Col md={1} />
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

    var [value, setValue] = useState(props.start);
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
    var boundaries;
    var start;

    if (props.rgb) {
        boundaries = [1, 256];
        start = 1;
    } else if (props.pos) {
        boundaries = [-50, 50];
        start = 0;
    }

    var threeSet = (
        <div>
            <p style={{ marginLeft: TITLE_LEFT_MARGIN }}> {titles[0]} </p>
            <CustomSlider disabled={false} boundaries={boundaries} start={start} />
            <CustomSlider disabled={false} boundaries={boundaries} start={start} />
            <CustomSlider disabled={false} boundaries={boundaries} start={start} />
        </div>
    );

    var additional = (
        <div>
            <p style={{ marginLeft: TITLE_LEFT_MARGIN }}> {titles[1]} </p>
            <CustomSlider disabled={false} boundaries={[0, 100]} start={start} />
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