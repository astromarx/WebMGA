
import { Sidebar, Whisper, Tooltip, Nav, Icon, Row, Col, Navbar, Container, Content, IconButton } from 'rsuite';
import React, { Component } from "react";
import { ViewOptions, AdditionalLightOptions, AmbientLightOptions, VisualElementsOptions, SlicingOptions, ModelsOptions } from './SubMenus'


const NavToggle = ({ expand, onChange }) => {
    return (
        <Navbar appearance="subtle" className="nav-toggle">
            <Navbar.Body>
                <Nav pullRight>
                    <IconButton
                        circle
                        style={{ textAlign: 'center', margin: 10 }}
                        onClick={onChange}
                        appearance="default"
                        icon={<Icon icon={expand ? 'angle-left' : 'angle-right'} />} />
                </Nav>
            </Navbar.Body>
        </Navbar>
    );
};

const navItemStyle = { margin: 6.5 };

const CustomNav = ({ active, onSelect, ...props }) => {
    return (
            <Nav {...props} activeKey={active} onSelect={onSelect} style={{ backgroundColor: '#101010' }}>
                <Nav.Item title="Models" tooltip eventKey="Models" icon={<Icon style={navItemStyle} size="lg" icon="shapes" />}>
                </Nav.Item>
                {/* <Whisper placement="right" trigger="hover" speaker={(<Tooltip>View</Tooltip>)}> */}
                <Nav.Item eventKey="View" icon={<Icon style={navItemStyle} size="lg" icon="eye" />} />
                {/* </Whisper> */}
                {/* <Whisper placement="right" trigger="hover" speaker={(<Tooltip>Ambient Light</Tooltip>)}> */}
                    <Nav.Item eventKey="Ambient Light" icon={<Icon style={navItemStyle} size="lg" icon="sun-o" />} />
                {/* </Whisper> */}
                {/* <Whisper placement="right" trigger="hover" speaker={(<Tooltip>Other Lighting</Tooltip>)}> */}
                    <Nav.Item eventKey="Other Lighting" icon={<Icon style={navItemStyle} size="lg" icon="creative" />} />
                {/* </Whisper> */}
                {/* <Whisper placement="right" trigger="hover" speaker={(<Tooltip>Slicing</Tooltip>)}> */}
                    <Nav.Item eventKey="Slicing" icon={<Icon style={navItemStyle} size="lg" icon="cut" />} />
                {/* </Whisper> */}
                {/* <Whisper placement="right" trigger="hover" speaker={(<Tooltip>Visual Elements</Tooltip>)}> */}
                    <Nav.Item eventKey="Visual Elements" icon={<Icon style={navItemStyle} size="lg" icon="cube" />} />
                {/* </Whisper> */}
                <Nav.Item panel style={{ height: 800 }} />
            </Nav>
    );
};

const MenuContent = ({ active, expand, onChange }) => {

    var menuContent = [];

    if (!expand) {
        menuContent.push(<NavToggle expand={expand} onChange={onChange} />);
    } else {
        menuContent.push(
            <Nav>
                <Navbar appearance="subtle">
                    <Nav pullLeft>
                        <h3 style={{ marginTop: 15, marginLeft: 30 }}>{active}</h3>
                    </Nav>
                    <Nav pullRight>
                        <NavToggle expand={expand} onChange={onChange} />
                    </Nav>
                </Navbar>

            </Nav>
        );
    }

    if (expand) {
        switch (active) {
            case "Models":
                menuContent.push(<ModelsOptions />);
                break;
            case "View":
                menuContent.push(<ViewOptions />);
                break;
            case "Ambient Light":
                menuContent.push(<AmbientLightOptions />);
                break;
            case "Other Lighting":
                menuContent.push(<AdditionalLightOptions />);
                break;
            case "Slicing":
                menuContent.push(<SlicingOptions />);
                break;
            case "Visual Elements":
                menuContent.push(<VisualElementsOptions />);
                break;
        }
    }

    return menuContent;

}


class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expand: true,
            active: 'Models'
        };
        this.toggleExpanded = props.f;
        this.handleToggle = this.handleToggle.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }
    handleToggle() {
        this.setState({
            expand: !this.state.expand
        });
        this.toggleExpanded();
    }
    
    handleSelect(activeKey) {
        this.setState({
            active: activeKey
        });

        if (!this.state.expand){
            this.handleToggle();
        }

    }
    render() {
        const { expand } = this.state;
        const { active } = this.state;
        return (
            <div>
                <Sidebar
                    style={{ display: 'flex', flexDirection: 'column' }}
                    width={expand ? 356 : 56}
                    collapsible
                >
                    <Container>
                        <Sidebar width={56} >
                            <CustomNav vertical appearance="subtle" active={active} onSelect={this.handleSelect} />
                        </Sidebar>
                        <Content >
                            <MenuContent active={active} expand={expand} onChange={this.handleToggle} />
                        </Content>

                    </Container>

                </Sidebar>
            </div>

        );
    }
}


export default SideMenu;