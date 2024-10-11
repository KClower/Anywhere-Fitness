
import { useState } from "react";
import ThankYou from "../pages/ThankYouPage";
import styled from "styled-components";
import 'animate.css';
import axios from "axios"
import { formatDate } from "../utils";
import { useAuthStore } from "../stores/useAuthStore";




const SelectedCard = styled.div`
margin-top: 60px;
text-align: center;
`
const ConfirmButton = styled.button`

padding: 5px ; 
cursor: pointer;
`


export default function WorkoutSignup({ workout, onSuccess, onError }) {
    console.log("WorkoutSignup:: ", workout)

    const [showThankYou, setShowThankYou] = useState(false);


    const { user: userId } = useAuthStore();

    const joinClass = async () => {
        console.log("workout signup:: join class: ", userId)
        let response = {}
        try {
            response = await axios
                .put(`http://localhost:9000/api/client/signup/${workout.id}`, { userId })


        }
        catch (error) {
            onError(error.response.data.message)
            console.log("WorkoutSignup::error: ", error)
            return
        }
        onSuccess(response.data.updatedClass)
        setShowThankYou(true)
    }





    return (
        <>
            {showThankYou
                ? (
                    <ThankYou />
                )
                : (
                    <SelectedCard className="animate__animated animate__backInLeft">

                        <div>

                            <p>Instructor: {workout.instructor_name}</p>
                            <p>Location: {workout.location}</p>
                            <p>Date & Time: {formatDate(workout.start_time)}</p>
                            <p>Intensity Level: {workout.intensity}</p>
                            <p>Duration: {workout.duration}</p>
                            <p>Price: ${workout.price}</p>
                            <p>Max # of attendies: {workout.class_capacity}</p>
                            <p>Current # of attendies: {workout.class_size}</p>

                            <ConfirmButton onClick={joinClass}>
                                Confirm
                            </ConfirmButton>
                        </div>

                    </SelectedCard>
                )}
        </>
    )
}




