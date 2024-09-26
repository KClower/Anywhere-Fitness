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
                console.log("the data was not returned", error)
            })
    }, [])

    const noFilterApplied = appliedFilters.classtype === "" && appliedFilters.instructor === "" && appliedFilters.intensity === ""

    const filteredWorkouts = classes.filter((workout) => {
        // Filter based on search criteria
        const matchClassType = appliedFilters.classtype === '' || workout.classtype === appliedFilters.classtype;
        const matchInstructor = appliedFilters.instructor === '' || workout.instructor === appliedFilters.instructor;
        const matchIntensity = appliedFilters.intensity === '' || workout.intensity === appliedFilters.intensity;

        return matchClassType && matchInstructor && matchIntensity;
    });

    const searchFilter = (filter) => {
        setAppliedFilters({ ...appliedFilters, [filter.field]: filter.value })
    }

    const dataSource = noFilterApplied ? classes : filteredWorkouts

    return (
        <>
            <WorkoutHeader>
                <h2>Available Classes</h2>
                <SearchForm searchFilter={searchFilter} />
            </WorkoutHeader>

            <WorkoutWrapper>
                {dataSource.map(classes => {

                    return (
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>{classes.class_type_id}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{classes.class_name}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">Instructor: {classes.instructor_name}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">Price: ${classes.price}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">Date & Time: {classes.start_time}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">Duration: {classes.duration}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">Intensity Level: {classes.intensity_id}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">Location: {classes.location}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">Max # of attendies: {classes.class_capacity}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">Current # of attendies: {classes.class_size}</Card.Subtitle>

                                <Card.Link as={NavLink} to={`/WorkoutCard/${classes.id}`}>Join Class</Card.Link>

                            </Card.Body>
                        </Card>
                    );


                    // return (
                    //     <WorkoutCardStyle class={classes.id}>
                    //         <p>{classes.class_type_id}</p>
                    //         <p>{classes.class_name}</p>
                    //         <p>Instructor: {classes.instructor_name}</p>
                    //         <p>Price: ${classes.price}</p>
                    //         <p>Date & Time: {classes.start_time}</p>
                    //         <p>Duration: {classes.duration}</p>
                    //         <p>Intensity Level: {classes.intensity_id}</p>
                    //         <p>Location: {classes.location}</p>
                    //         <p>Max # of attendies: {classes.class_capacity}</p>
                    //         <p>Current # of attendies: {classes.class_size}</p>
                    //         <Link to={`/WorkoutCard/${classes.id}`}>
                    //             <ChooseBtn>Choose Class</ChooseBtn>
                    //         </Link>
                    //     </WorkoutCardStyle>
                    // )
                })}
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


