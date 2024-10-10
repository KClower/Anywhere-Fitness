import { useState, useEffect } from "react";
import JoinClassModal from "./Modals/JoinClassModal";
import axios from "axios";
import { NavLink } from "react-router-dom";
import SearchForm from "./SearchForm";
import styled from "styled-components";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import { formatDate } from "../utils";
import { useAuthStore } from "../stores/useAuthStore";
import { Toast, ToastContainer } from "react-bootstrap";


const WorkoutList = () => {
    const [showToast, setShowToast] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [classes, setClasses] = useState([]);
    const [showJoinClassModal, setShowJoinClassModal] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [appliedFilters, setAppliedFilters] = useState({
        classtype: "",
        instructor: "",
        intensity: "",
    })

    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        axios
            .get('http://localhost:9000/api/instructor/classes')
            .then(res => {

                setClasses(res.data)
            })
            .catch(error => {
                console.log("The data was not returned", error)
            })
    }, [])

    const noFilterApplied = appliedFilters.classtype === "" && appliedFilters.instructor === "" && appliedFilters.intensity === ""

    const filteredWorkouts = classes.filter((workout) => {
        // Filter based on search criteria
        const matchClassType = appliedFilters.classtype === '' || workout.class_type === appliedFilters.classtype;
        const matchInstructor = appliedFilters.instructor === '' || workout.instructor_name === appliedFilters.instructor;
        const matchIntensity = appliedFilters.intensity === '' || workout.intensity === appliedFilters.intensity;

        return matchClassType && matchInstructor && matchIntensity;
    });

    const searchFilter = (filter) => {
        setAppliedFilters((prevFilters) => ({ ...prevFilters, [filter.field]: filter.value }))
    }

    const resetSearch = () => {
        setAppliedFilters({
            classtype: "",
            instructor: "",
            intensity: "",
        })
    }

    const dataSource = noFilterApplied ? classes : filteredWorkouts

    const handleJoinClass = (updatedWorkout) => {
        setSelectedWorkout(workout);
        setShowJoinClassModal(true);

        const updatedWorkouts = classes.map(workout => {
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
        setClasses(updatedWorkouts)
    };

    const handleJoinError = (message) => {
        console.log(message)
        setErrorMessage(message)
        setShowToast(true)
        setShowJoinClassModal(false)
    }

    const handleJoinClassBtnClick = (workout) => {
        setSelectedWorkout(workout)
        setShowJoinClassModal(true)
    }

    return (
        <>
            <WorkoutHeader>
                <h2 style={({ color: "blue" })}>Available Classes</h2>
                <SearchForm searchFilter={searchFilter} resetSearch={resetSearch} />
            </WorkoutHeader>

            <WorkoutWrapper>

                {dataSource.length > 0 ? (

                    dataSource.map(workout => (
                        <Col key={workout.id} xs={12} sm={6} md={4} lg={3} className=" mt-4">

                            <Card className="ms-3" style={{ background: 'rgba(211, 211, 211, 0.5)' }}>
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

                                    {isAuthenticated
                                        ? (
                                            <JoinButton onClick={() => handleJoinClassBtnClick(workout)}>
                                                Join Class
                                            </JoinButton>
                                        )
                                        : (
                                            <Nav.Link as={NavLink} to="/SignIn">
                                                <JoinButton>
                                                    Sign In to join class
                                                </JoinButton>
                                            </Nav.Link>
                                        )
                                    }
                                </Card.Body>
                            </Card>
                        </Col>
                    ))

                ) : (
                    <p>NO RESULTS</p>
                )}

            </WorkoutWrapper>

            <ToastContainer position="sticky" className="p-3">
                <Toast bg="danger" show={showToast} onClose={() => setShowToast(false)}>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Error</strong>
                    </Toast.Header>
                    <Toast.Body>{errorMessage}</Toast.Body>
                </Toast>
            </ToastContainer>

            {
                showJoinClassModal
                    ? (
                        <JoinClassModal
                            onSuccess={handleJoinClass}
                            onError={handleJoinError}
                            show={showJoinClassModal}
                            onHide={() => setShowJoinClassModal(false)}
                            workout={selectedWorkout} // Pass the selected workout data to the modal
                        />
                    )
                    : null
            }


        </>
    )
}


const WorkoutHeader = styled.div`
text-align: center;
padding: 10px 0px;
`

const WorkoutWrapper = styled.div`
padding-right: 15px;
display: flex;
flex-wrap: wrap;
`
const JoinButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 5px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`


export default WorkoutList;


