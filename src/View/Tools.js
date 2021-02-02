

import { Dropdown, RangeSlider, InputGroup, Sidebar, Sidenav, Nav, Icon, Navbar, Container, Checkbox, InputNumber, Content, Panel, HelpBlock, FormGroup, RadioGroup, Radio, Grid, Row, Col, Header, Footer, Button, FlexboxGrid, Form, ControlLabel, FormControl, Slider, ButtonToolbar, Input } from 'rsuite';
import React, { Component, useState } from "react";
import View from './View';

const TITLE_LEFT_MARGIN = 30;

export const ParameterSet = (props) => {
    var set = [];

    for (let i = 0; i < props.titles.length; i++) {

        set.push(
            <ParameterInput title={props.titles[i]} values={props.values[i]} numerical f={props.f} index={i} />
        );
    }

    return set;
}

export class ParameterInput extends React.Component {


    constructor(props) {
        super();
        this.active = props.active;
        this.f = props.f;
        this.title = props.title;
        this.values = props.values;
        this.numerical = props.numerical;
        this.index = props.index;
        this.selectingSet = props.selectingSet;
        this.changeValue = this.changeValue.bind(this);
    }

    changeValue(value) {
        this.active = value;
        this.f(value, this.index);
    }

    render() {
        var InputBox;

        if (this.numerical) {
            const defaultVal = this.values;
            InputBox =
                (<div style={{ width: 130, marginLeft: 10 }}>
                    <InputNumber defaultValue={defaultVal} step={0.1} onChange={this.changeValue} />
                </div>);
        } else {

            var vals = this.values;
            var active = this.active;
            var listItems = [];
            let act;

            for (let val of vals) {
                (active.localeCompare(val)) ? act = false : act = true;
                listItems.push(<Dropdown.Item eventKey={val} active={act} onSelect={this.changeValue}>{val}</Dropdown.Item>);
            }

            listItems.push(<Dropdown.Item eventKey={'panel'} panel style={{ width: 150 }}></Dropdown.Item>);

            InputBox = (
                <ButtonToolbar style={{ width: 10, marginLeft: 0 }}>
                    <Dropdown style={{ width: 200 }} title={this.active}>
                        {listItems}
                    </Dropdown>
                </ButtonToolbar>
            );

        }

        return (
            <div >
                <Row style={{ marginTop: 15 }}>

                    <Col md={10}><p style={{ marginTop: 10, marginLeft: 30 }}>{this.title}</p></Col>
                    <Col md={14} />
                    <Col md={10}>{InputBox}</Col>

                </Row>
            </div>
        );
    }
}

export const SliceSlider = (props) => {
    const [value, setValue] = React.useState(props.vals);
    let f = props.f;
    let i = props.index;

    return (
        <div>
            <br/>
            <Row>
                <Col md={5}>
                    <p style={{ marginTop: 10, marginLeft: 30 }}>{props.title}</p>
                </Col>
                <Col md={1} />
                <Col md={16}>
                    <InputGroup>
                        <InputNumber
                            min={-50.0}
                            max={50.0}
                            value={value[0]}
                            step={0.1}
                            onChange={nextValue => {
                                const [start, end] = value;
                                if (parseFloat(nextValue) > end) {
                                    return;
                                }
                                setValue([parseFloat(nextValue), end]);
                                f(i, [parseFloat(nextValue),end]);
                            }}
                        />
                        <InputGroup.Addon>to</InputGroup.Addon>
                        <InputNumber
                            min={-50.0}
                            max={50.0}
                            value={value[1]}
                            step={0.1}
                            onChange={(nextValue) => {
                                const [start, end] = value;
                                if (start > parseFloat(nextValue)) {
                                    return;
                                }
                                setValue([start, parseFloat(nextValue)]);
                                f(i, [start, parseFloat(nextValue)]);
                            }}
                        />
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col md={21}>
                    <RangeSlider
                        min={-50.0}
                        max={50.0}
                        progress
                        style={{ marginLeft: 35, marginTop: 30 }}
                        value={value}
                        onChange={value => {
                            setValue(value);

                            f(i, value);
                        }}
                    />
                </Col>

            </Row>
        </div>
    );
}

export const CustomSlider = (props) => {

    var f = props.f;
    var [value, setValue] = useState(props.val);
    var [disabled, disable] = useState(false);

    var type, graduated, progress;

    if (props.type == null) {
        type = null;
    } else {
        type = props.type;
    }

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
                        f(value, type);
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
                        f(value, props.type)
                    }}
                />
            </Col>
        </Row>
    );

}