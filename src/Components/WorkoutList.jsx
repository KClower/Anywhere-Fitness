import { useState } from "react";
import { Link } from "react-router-dom";
import workouts from "../dummydata";
import SearchForm from "./SearchForm";
import styled from "styled-components";



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

const WorkoutCard = styled.div`
background-color: white;
width: 250px;
border: 2px solid black;
margin: 0 25px 25px 25px;

`
const ChooseBtn = styled.button`
cursor: pointer;
`



const WorkoutList = () => {

    const [classes, setClasses] = useState(workouts);
    const [appliedFilters, setAppliedFilters] = useState({
        classtype: "",
        instructor: "",
        intensity: "",
    })

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
                {dataSource.map(workout => {
                    return (
                        <WorkoutCard key={workout.id}>

                            <p>{workout.classtype}</p>
                            <p>Instructor: {workout.instructor}</p>
                            <p>Price: ${workout.price}</p>
                            <p>{workout.classname}</p>
                            <p>Starts at: {workout.classtime} / {workout.classdate}</p>
                            <p>Duration: {workout.duration}</p>
                            <p>Intensity Level: {workout.intensity}</p>
                            <p>Location: {workout.location}</p>
                            <p>Max # of attendies: {workout.maxsize}</p>
                            <Link to={`/WorkoutCard/${workout.id}`}>
                                <ChooseBtn>Choose Class</ChooseBtn>
                            </Link>
                        </WorkoutCard>
                    )
                })}
            </WorkoutWrapper>
        </>
    )
}


export default WorkoutList;