
import { Header, Dropdown, FormGroup, FlexboxGrid, Nav, Navbar, Icon, Button, ButtonToolbar, Slider, Form, ControlLabel, Whisper, Tooltip } from 'rsuite';
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
        
        <Dropdown.Item eventKey={1}>Sample 1</Dropdown.Item>
        <Dropdown.Item eventKey={2}>Sample 2</Dropdown.Item>
        <Dropdown.Item panel style={{ padding: 5, width: 120 }}></Dropdown.Item>

        
    </Dropdown>
);

class PerformanceDropdown extends React.Component {

    constructor(props) {
        super(props);
        this.model = props.model;
        this.state = {val: props.model.lod + 1};

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


const Top = ({ ...props }) => {

    return (
        <div>
            <Header style={{ height: 56 }}>
                <Navbar>
                    <Navbar.Body>
                        <Nav pullRight >
                            <ButtonToolbar>
                                <Nav.Item active>fps {props.fps}</Nav.Item>
                                <Nav.Item appearance="subtle" icon={<Icon icon="info-circle" />}>Manual</Nav.Item>
                                <PerformanceDropdown model={props.model} />
                                <SamplesDropdown title="Samples" trigger='click' f={props.functions[3]} placement="bottomEnd" icon={<Icon icon="folder-o" />} />
                                <ExportDropdown f={props.functions[2]} />
                                <Nav.Item appearance="subtle" icon={<Icon icon="file-download" />} onSelect={props.functions[0]}>Save</Nav.Item>
                                <input type="file"
                                    id="upload-btn"
                                    style={{ display: 'none' }}
                                    className='input-file'
                                    accept='.json,.webmga'
                                    onChange={e => props.functions[1](e.target.files[0])} />
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
        </div>
    );
};

export default Top;