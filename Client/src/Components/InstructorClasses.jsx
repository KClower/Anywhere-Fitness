import { useState, useEffect } from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import styled from 'styled-components';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { formatDate } from "../utils";
import { useAuthStore } from "../stores/useAuthStore";


const InstructorClasses = () => {
    const [createdClasses, setCreatedClasses] = useState([]);

    const { user } = useAuthStore()

    useEffect(() => {
        axios
            .get(`http://localhost:9000/api/instructor/classes/${user}`)
            .then(res => {
                console.log("created classes", res.data)
                setCreatedClasses(res.data)
            })
            .catch(error => {
                console.log("The data was not returned", error)
            })
    }, [user])

    const removeClass = async (classId) => {
        try {
            const res = await axios.delete(`http://localhost:9000/api/instructor/class/${classId}`);
            if (res.data.Removed) {
                setCreatedClasses(createdClasses.filter(workout => workout.id !== classId));
            }
        } catch (error) {
            console.log("Error removing class.", error)
        }
    }


    return (

        <WorkoutWrapper>
            <Row>
                {createdClasses.map(workout => (
                    <Col key={workout.id} md={8} className="mb-4, mt-4">

                        <Card style={{ width: '100%' }}>
                            <Card.Body className="m-3">
                                <Card.Title>{workout.class_type}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{workout.class_name}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">Price: ${workout.price}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">Date & Time: {formatDate(workout.start_time)}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">Duration: {workout.duration}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">Intensity Level: {workout.intensity}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">Location: {workout.location}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">Max # of attendies: {workout.class_capacity}</Card.Subtitle>
                                <Card.Subtitle className="mb-4 text-muted">Current # of attendies: {workout.class_size}</Card.Subtitle>

                                <UpdateButton onClick={() => updateClass(workout.class_id)}>
                                    Update Class
                                </UpdateButton>

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
background-color: pink;
display: flex;
flex-wrap: wrap;
`
const RemoveButton = styled.button`
  background-color: #dc3545;
  color: white;
  padding: 5px 20px;
  margin-right: 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

const UpdateButton = styled.button`
  background-color: #00FFFF;
  color: black;
  padding: 5px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    color:white;
    background-color: #008B8B;
  }
`;

export default InstructorClasses;





