
import {Sidebar, Sidenav, Nav, Icon, Navbar} from 'rsuite';
import React, { Component } from "react";
import {CameraOptions, AdditionalLightOptions, AmbientLightOptions, GridOptions, BoundingShapesOptions} from './SubMenus'


const NavToggle = ({ expand, onChange }) => {
    return (
        <Navbar appearance="subtle" className="nav-toggle">
            <Navbar.Body>

                <Nav pullRight>
                    <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
                        <Icon icon={expand ? 'angle-left' : 'angle-right'} />
                    </Nav.Item>
                </Nav>
            </Navbar.Body>
        </Navbar>
    );
};


class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expand: true
        };
        this.handleToggle = this.handleToggle.bind(this);
    }
    handleToggle() {
        this.setState({
            expand: !this.state.expand
        });
    }
    render() {
        const { expand } = this.state;
        return (
            <div>
                <Sidebar
                    style={{ display: 'flex', flexDirection: 'column' }}
                    width={expand ? 300 : 56}
                    collapsible
                >
                    <Sidenav
                        defaultOpenKeys={['3']}
                        appearance="subtle"
                        expanded={expand}
                    >
                        <Sidenav.Body>
                            <Nav>
                                <Nav.Item eventKey="1" icon={<Icon icon="shapes" />}>
                                    Models
                                </Nav.Item>
                                <CameraOptions/>
                                <AmbientLightOptions />
                                <AdditionalLightOptions />
                                <Nav.Item eventKey="2" icon={<Icon icon="cut" />}>
                                    Slicing
                                </Nav.Item>
                                <BoundingShapesOptions/>
                                <GridOptions/>
                                <Nav.Item eventKey="2" icon={<Icon icon="setting" />}>
                                    Performance Tuning
                                </Nav.Item>
                               
                            </Nav>
                        </Sidenav.Body>

                    </Sidenav>
                    <NavToggle expand={expand} onChange={this.handleToggle} />

                </Sidebar>
            </div>

        );
    }
}


export default SideMenu;