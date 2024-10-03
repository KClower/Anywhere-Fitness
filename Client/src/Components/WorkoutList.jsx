import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import SearchForm from "./SearchForm";
import styled from "styled-components";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import { formatDate } from "../utils";
import { useAuthStore } from "../stores/useAuthStore";



const WorkoutList = () => {

    const [classes, setClasses] = useState([]);

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
                console.log(res.data)
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

    return (
        <>
            <WorkoutHeader>
                <h2>Available Classes</h2>
                <SearchForm searchFilter={searchFilter} resetSearch={resetSearch} />
            </WorkoutHeader>

            <WorkoutWrapper>
                <Row>
                    {dataSource.length > 0 ? (

                        dataSource.map(workout => (
                            <Col key={workout.id} md={3} className="mb-4, mt-4">

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

                                        {isAuthenticated
                                            ? (
                                                <NavLink to={`/WorkoutSignup/${workout.id}`} state={{ workout }}>
                                                    <JoinButton>
                                                        Join Class
                                                    </JoinButton>
                                                </NavLink>

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
                </Row>
            </WorkoutWrapper>
        </>
    )
}


const WorkoutHeader = styled.div`
text-align: center;
background-color: lightblue;
padding: 10px 0px;
`

const WorkoutWrapper = styled.div`
background-color: pink;
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

// const WorkoutCardStyle = styled.div`
// background-color: white;
// width: 250px;
// border: 2px solid black;
// margin: 0 25px 25px 25px;

// `
// const ChooseBtn = styled.button`
// cursor: pointer;
// `

export default WorkoutList;


