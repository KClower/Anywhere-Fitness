import CreateClassModal from "../Modals/CreateClassModal";
import UpdateClassModal from "../Modals/UpdateClassModal";
import { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import styled from 'styled-components';
import Col from 'react-bootstrap/Col';
import { formatDate } from "../../utils";
import { useAuthStore } from "../../stores/useAuthStore";
import { deleteInstructorClassByClassId, getInstructorClassesByInstructorId } from "../../Services/Anywhere-Fitness-Service";



const InstructedClasses = (props) => {
    const { hideCreateClassModal, showCreateClassModal } = props
    const [createdClasses, setCreatedClasses] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    // const navigate = useNavigate();
    const { user } = useAuthStore()

    useEffect(() => {
        getInstructorClassesByInstructorId(user)
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
            const res = await deleteInstructorClassByClassId(classId)
            if (res.data.Removed) {

                const filteredClasses = createdClasses.filter(workout => workout.class_id !== classId)

                setCreatedClasses(filteredClasses);
            }
        } catch (error) {
            console.log("Error removing class.", error)
        }
    }



    const handleUpdateClick = (classData) => {
        setSelectedClass(classData);
        setModalShow(true);
    };

    const handleClassCreate = (newWorkout) => {
        console.log(newWorkout)
        const newClass = {

            class_id: newWorkout.class_id,
            class_type: newWorkout.class_type,
            class_name: newWorkout.class_name,
            intensity: newWorkout.intensity_id,
            start_time: newWorkout.start_time,
            duration: newWorkout.duration,
            location: newWorkout.location,
            price: newWorkout.price,
            class_capacity: newWorkout.class_capacity,
        }
        setCreatedClasses([...createdClasses, newClass])
    }

    const handleClassUpdate = (updatedWorkout) => {

        const updatedClasses = createdClasses.map(workout => {
            if (workout.class_id !== updatedWorkout.class_id) {
                return workout
            }

            return {
                class_id: updatedWorkout.class_id,
                class_type: updatedWorkout.class_type,
                class_name: updatedWorkout.class_name,
                intensity: updatedWorkout.intensity_id,
                start_time: updatedWorkout.start_time,
                duration: updatedWorkout.duration,
                location: updatedWorkout.location,
                price: updatedWorkout.price,
                class_capacity: updatedWorkout.class_capacity,
            }
        })

        setCreatedClasses(updatedClasses)
    }

    return (
        <WorkoutWrapper>


            {createdClasses.map(workout => (
                <Col key={workout.id} xs={12} sm={6} md={4} lg={3} className=" mt-4">

                    <Card className="ms-3">
                        <Card.Body className="m-1">
                            <Card.Title>{workout.class_type}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{workout.class_name}</Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-muted">Price: ${workout.price}</Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-muted">Date & Time: {formatDate(workout.start_time)}</Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-muted">Duration: {workout.duration}</Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-muted">Intensity Level: {workout.intensity}</Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-muted">Location: {workout.location}</Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-muted">Max # of attendies: {workout.class_capacity}</Card.Subtitle>
                            <Card.Subtitle className="mb-4 text-muted">Current # of attendies: {workout.class_size}</Card.Subtitle>

                            <UpdateButton onClick={() => handleUpdateClick(workout)}>
                                Update Class
                            </UpdateButton>

                            <RemoveButton onClick={() => removeClass(workout.class_id)}>
                                Remove Class
                            </RemoveButton>
                        </Card.Body>
                    </Card>
                </Col>
            ))}

            <CreateClassModal
                onSuccess={handleClassCreate}
                show={showCreateClassModal}
                onHide={hideCreateClassModal}
            />

            {modalShow && (
                <UpdateClassModal
                    onSuccess={handleClassUpdate}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    classData={selectedClass}
                />
            )}

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

const UpdateButton = styled.button`
  background-color: #00FFFF;
  color: black;
  padding: 5px 22.5px;
  margin-right: 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    color:white;
    background-color: #008B8B;
  }
`;

export default InstructedClasses;





