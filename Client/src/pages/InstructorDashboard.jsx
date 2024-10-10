import InstructedClasses from "../Components/Classes/InstructedClasses";
import CreateClassModal from "../Components/Modals/CreateClassModal";
import styled from 'styled-components';
import React, { useState, Suspense } from 'react';
import { Tab, Nav, Row, Col } from 'react-bootstrap';






export function InstructorDashboard() {



    const [activeKey, setActiveKey] = useState("first")
    const [showCreateClassModal, setShowCreateClassModal] = useState(false);
    const [Tab2Component, setTab2Component] = useState(null);
    if (activeKey === "second" && !Tab2Component) {
        import("../Components/Classes/InstructorJoinedClasses").then(module => {
            setTab2Component(() => module.InstructorJoinedClasses)
        })
    }


    const hideCreateClassModal = () => setShowCreateClassModal(false)

    return (
        <>
            <DashboardHeader>
                <h2>Dashboard</h2>
                <CreateClassButton onClick={() => setShowCreateClassModal(true)}>Create Class</CreateClassButton>
            </DashboardHeader>

            <Tab.Container activeKey={activeKey} onSelect={(eventKey) => setActiveKey(eventKey)}>
                <Row className="mb-3">
                    <Col>
                        <Nav variant="underline" className="dashboard-tabs">
                            <Nav.Item className="ms-5">
                                <Nav.Link eventKey="first" className="custom-tab">Manage Classes</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second" className="custom-tab">Joined Classes</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                </Row>

                <Tab.Content className="pe-3">
                    <Tab.Pane eventKey="first">
                        <InstructedClasses
                            showCreateClassModal={showCreateClassModal}
                            hideCreateClassModal={hideCreateClassModal}
                        />
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                        {Tab2Component
                            ? (
                                <Suspense>
                                    <Tab2Component />
                                </Suspense>
                            )
                            : null
                        }
                    </Tab.Pane>
                </Tab.Content>

            </Tab.Container>



        </>
    );
}




const DashboardHeader = styled.div`
display: flex;
justify-content: space-around;
`

const CreateClassButton = styled.button`
    background-color: #007bff; 
    color: white; 
    border: none; 
    border-radius: 5px; 
    padding: 0 20px; 
    cursor: pointer; 
    
    &:hover {
        background-color: #0056b3; 
    }
`;