
import { Header, Dropdown, FormGroup, Radio, RadioGroup, FlexboxGrid, Nav, Navbar, Icon, Button, ButtonToolbar } from 'rsuite';

const ExportDropdown = ({ ...props }) => (
    <Dropdown {...props}>
        <FormGroup controlId="radioList">
            <Dropdown.Item>Export as...</Dropdown.Item>
            <Dropdown.Item divider />
            <RadioGroup name="radioList">
                <Radio value="A">Change </Radio>
                <Radio value="B">Rectangle</Radio>
            </RadioGroup>
            <Dropdown.Item panel style={{ padding: 5, width: 140 }}></Dropdown.Item>

            <Dropdown.Item >File Type</Dropdown.Item>
            <Dropdown.Item divider />

            <RadioGroup name="radioList">
                <Radio value="A">PNG</Radio>
                <Radio value="B">JPG</Radio>
            </RadioGroup>
            <Dropdown.Item panel style={{ padding: 5, width: 140 }}></Dropdown.Item>
        </FormGroup>

        <FlexboxGrid justify='center'>
            <Button appearance='primary'> Export </Button>
        </FlexboxGrid>

        <Dropdown.Item panel style={{ padding: 5, width: 140 }}></Dropdown.Item>

    </Dropdown>
);

const SamplesDropdown = ({ ...props }) => (

    <Dropdown {...props}>
        <Dropdown.Item >File Type</Dropdown.Item>
        <Dropdown.Item divider />
        <Dropdown.Item>Sample 1</Dropdown.Item>
        <Dropdown.Item>Sample 2</Dropdown.Item>
        <Dropdown.Item>Sample 3</Dropdown.Item>
        <Dropdown.Item>Sample 4</Dropdown.Item>
        <Dropdown.Item panel style={{ padding: 5, width: 140 }}></Dropdown.Item>
        <FlexboxGrid justify='center'>
            <Button appearance='primary'> Randomize </Button>
        </FlexboxGrid>

        <Dropdown.Item panel style={{ padding: 5, width: 140 }}></Dropdown.Item>
    </Dropdown>
);



const Top = ({ ...props }) => (
    <Header>
        <Navbar>
            <Navbar.Body>
                <Nav pullRight >
                    <ButtonToolbar>
                        <Nav.Item active>fps</Nav.Item>
                        <Nav.Item appearance="subtle" icon={<Icon icon="keyboard-o" />}>Reference</Nav.Item>
                        <Nav.Item appearance="subtle" icon={<Icon icon="question" />}>Manual</Nav.Item>
                        <SamplesDropdown title="Samples" trigger='click' placement="bottomEnd" icon={<Icon icon="folder-o" />} />
                        <ExportDropdown title="Export" trigger='click' placement="bottomEnd" icon={<Icon icon="export" />} />
                        <Nav.Item appearance="subtle" icon={<Icon icon="file-download" />}>Save</Nav.Item>
                        <Nav.Item icon={<Icon icon="file-upload" />} >Upload</Nav.Item>
                    </ButtonToolbar>
                </Nav>
                <Nav pullLeft>
                    <h6 style={{ padding: 20 }}> WebMGA</h6>
                </Nav>
            </Navbar.Body>
        </Navbar>
    </Header>
);

export default Top;