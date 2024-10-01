import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import SearchForm from "./SearchForm";
import styled from "styled-components";
import Card from 'react-bootstrap/Card';







const WorkoutList = () => {

    const [classes, setClasses] = useState([]);
    const [appliedFilters, setAppliedFilters] = useState({
        classtype: "",
        instructor: "",
        intensity: "",
    })

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
                {dataSource.length > 0 ? (

                    dataSource.map(workout => (


                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>{workout.class_type}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{workout.class_name}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">Instructor: {workout.instructor_name}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">Price: ${workout.price}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">Date & Time: {workout.start_time}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">Duration: {workout.duration}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">Intensity Level: {workout.intensity}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">Location: {workout.location}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">Max # of attendies: {workout.class_capacity}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">Current # of attendies: {workout.class_size}</Card.Subtitle>

                                <Card.Link as={NavLink} to={`/WorkoutSignup/${workout.id}`} state={{ workout }}>Join Class</Card.Link>

                            </Card.Body>
                        </Card>
                    ))

                ) : (
                    <p>NO RESULTS</p>
                )}
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


