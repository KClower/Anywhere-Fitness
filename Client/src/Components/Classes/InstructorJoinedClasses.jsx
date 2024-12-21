import { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import styled from 'styled-components';
import Col from 'react-bootstrap/Col';
import { formatDate } from "../../utils";
import { useAuthStore } from "../../stores/useAuthStore";
import { getClassesByUserId, removeClassByUserId } from "../../Services/Anywhere-Fitness-Service";



export function InstructorJoinedClasses() {

    const [joinedClasses, setJoinedClasses] = useState([]);


    const { user } = useAuthStore()

    useEffect(() => {
        getClassesByUserId(user)
            .then(res => {
                console.log("joined up classes", res.data.classes)
                setJoinedClasses(res.data.classes)
            })
            .catch(error => {
                console.log("The data was not returned", error)
            })
    }, [user])

    const removeClass = (classId) => {
        removeClassByUserId(user, classId)
            .then(() => {
                setJoinedClasses(joinedClasses.filter(workout => workout.class_id !== classId));
            })
            .catch(error => {
                console.error("Error removing class.", error);
            });
    };

    return (
        <WorkoutWrapper>

            {joinedClasses.map(workout => (
                <Col key={workout.id} xs={12} sm={6} md={4} lg={3} className=" mt-4">

                    <Card className="ms-3">
                        <Card.Body className="m-1">
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