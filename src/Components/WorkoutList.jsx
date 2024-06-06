import { Link } from "react-router-dom";
import workouts from "../dummydata";
import styled from "styled-components";

const WorkoutHeader = styled.h2`
background-color: lightblue;
padding: 20px 0;
margin: 0;
text-align: center;
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
// cursor: pointer;
`




const WorkoutList = () => {
    // const history = useHistory();
    return (
        <>
            <WorkoutHeader>Here are the classes available</WorkoutHeader>

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
                                <button>Choose Class</button>
                            </Link>
                        </WorkoutCard>
                    )
                })}
            </WorkoutWrapper>
        </>
    )
}


export default WorkoutList;