import React, { useState, Suspense } from 'react';
import { Tab, Nav, Row, Col, Spinner } from 'react-bootstrap';


export function Tabs() {
    const [activeKey, setActiveKey] = useState("first")
    const [Tab2Component, setTab2Component] = useState(null);
    if (activeKey === "second" && !Tab2Component) {
        import("./Tab2").then(module => {
            setTab2Component(() => module.Tab2)
        })
    }
    return (
        <Tab.Container activeKey={activeKey} onSelect={(eventKey) => setActiveKey(eventKey)}>
            <Row className="mb-3">
                <Col>
                    <Nav variant="underline" className="dashboard-tabs">
                        <Nav.Item>
                            <Nav.Link eventKey="first" className="custom-tab">Tab 1</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="second" className="custom-tab">Tab 2</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="third" className="custom-tab">Tab 3</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            Content for Tab 1
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            {Tab2Component
                                ? (
                                    <Suspense fallback={<Spinner animation="border" />}>
                                        <Tab2Component />
                                    </Suspense>
                                )
                                : null
                            }
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                            Content for Tab 3
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
}

