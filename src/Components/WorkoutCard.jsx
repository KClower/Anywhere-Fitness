import workouts from "../dummydata";
import JoinClassForm from "./JoinClassForm";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import 'animate.css';



const SelectedCard = styled.div`
margin-top: 60px;
text-align: center;
`



export default function WorkoutCard() {
    const params = useParams();
    console.log(params)
    const workout = workouts.find(thing => `${thing.id}` === params.id);
    console.log(workout)





    return (
        <>
            <SelectedCard className="animate__animated animate__backInLeft">
                <h1 className="animate__animated animate__bounce animate__slow animate__repeat-2">Join {workout.classtype} Class</h1>
                <div>
                    <p>Instructor: {workout.instructor}</p>
                    <p>Price: ${workout.price}</p>
                    <p>{workout.classname}</p>
                    <p>Starts at: {workout.classtime} / {workout.classdate}</p>
                    <p>Duration: {workout.duration}</p>
                    <p>Intensity Level: {workout.intensity}</p>
                    <p>Location: {workout.location}</p>
                    <p>Max # of attendies: {workout.maxsize}</p>
                    <JoinClassForm />

                </div>

            </SelectedCard>
        </>
    )
}




