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
    // const history = useHistory();
    // const [classes, setClasses] = useState(workouts);
    // const [filteredClasses, setFilteredClasses] = useState()

    // const searchClasses = (searchTerm) => {
    //     classes.filter(class => {
    //         return (

    //         )
    //     })
    // }


    return (
        <>
            <WorkoutHeader>
                <h2>Available Classes</h2>
                <SearchForm />
            </WorkoutHeader>

            <WorkoutWrapper>
                {workouts.map(workout => {
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