import { useState, useEffect } from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import styled from 'styled-components';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { formatDate } from "../../utils";
import { useAuthStore } from "../../stores/useAuthStore";


const ClientClasses = () => {
    const [signedUpClasses, setSignedUpClasses] = useState([]);


    const { user } = useAuthStore()

    useEffect(() => {
        axios
            .get(`http://localhost:9000/api/client/classes/${user}`)
            .then(res => {
                console.log("signed up classes", res.data.classes)
                setSignedUpClasses(res.data.classes)
            })
            .catch(error => {
                console.log("The data was not returned", error)
            })
    }, [user])


    const removeClass = (classId) => {
        axios
            .delete('http://localhost:9000/api/client/class', {
                data: { clientId: user, classId }
            })
            .then(() => {
                setSignedUpClasses(signedUpClasses.filter(workout => workout.class_id !== classId));
            })
            .catch(error => {
                console.error("Error removing class.", error);
            });
    };


    return (

        <WorkoutWrapper>
            <Row>
                {signedUpClasses.map(workout => (
                    <Col key={workout.id} md={5} className="mb-4, mt-4">

                        <Card style={{ width: '100%' }}>
                            <Card.Body className="m-3">
                                <Card.Title>{workout.class_type}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{workout.class_name}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">Instructor: {workout.instructor_name}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">Price: ${workout.price}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">Date & Time: {formatDate(workout.start_time)}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">Duration: {workout.duration}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">Intensity Level: {workout.intensity}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">Location: {workout.location}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">Max # of attendies: {workout.class_capacity}</Card.Subtitle>
                                <Card.Subtitle className="mb-4 text-muted">Current # of attendies: {workout.class_size}</Card.Subtitle>
                                <RemoveButton onClick={() => removeClass(workout.class_id)}>
                                    Remove Class
                                </RemoveButton>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}


            </Row>
        </WorkoutWrapper>
    )



}

const WorkoutWrapper = styled.div`

display: flex;
flex-wrap: wrap;
`
const RemoveButton = styled.button`
  background-color: #dc3545;
  color: white;
  padding: 5px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

export default ClientClasses;




