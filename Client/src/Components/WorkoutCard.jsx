
import workouts from "../classData";
import JoinClassForm from "./JoinClassForm";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import 'animate.css';



const SelectedCard = styled.div`
margin-top: 60px;
text-align: center;
`



export default function WorkoutCard(props) {
    const params = useParams();
    console.log(params)
    const workout = workouts.find(thing => `${thing.id}` === params.id);
    console.log(workout)





    return (
        <>
            <SelectedCard className="animate__animated animate__backInLeft">
                <h1 className="animate__animated animate__bounce animate__slow animate__repeat-2">Join {props.class_name} Class</h1>
                <div>
                    <p>Instructor: {props.instructor_name}</p>
                    <p>Price: ${props.price}</p>
                    <p>{props.class_name}</p>
                    <p>Date & Time: {props.start_time}</p>
                    <p>Duration: {props.duration}</p>
                    <p>Intensity Level: {props.intensity_id}</p>
                    <p>Location: {props.location}</p>
                    <p>Max # of attendies: {props.class_capacity}</p>
                    <p>Current # of attendies: {props.class_size}</p>
                    {/* <JoinClassForm /> */}

                </div>

            </SelectedCard>
        </>
    )
}




