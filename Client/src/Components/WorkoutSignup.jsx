
import { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import 'animate.css';
import axios from "axios"
import { formatDate } from "../utils";
import { useAuthStore } from "../stores/useAuthStore";
import Toast from 'react-bootstrap/Toast';
import { ToastContainer } from "react-bootstrap";



const SelectedCard = styled.div`
margin-top: 60px;
text-align: center;
`
const ConfirmButton = styled.button`

padding: 5px ; 
cursor: pointer;
`


export default function WorkoutSignup() {
    const [showToast, setShowToast] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const { id } = useParams(); // Gets the class ID from the URL
    const location = useLocation(); // Access passed state
    const { workout } = location.state || {}; // Destructure the passed class data
    const navigate = useNavigate();

    const { user: userId } = useAuthStore();

    const joinClass = async () => {
        console.log("workout signup:: join class: ", userId)
        try {
            await axios
                .put(`http://localhost:9000/api/client/signup/${id}`, { userId })
        }
        catch (error) {
            console.log(error.response.data.message)
            setErrorMessage(error.response.data.message)
            setShowToast(true)
            return
        }


        navigate('/ThankYouPage')
    }

    if (!workout) {
        return <p>Class not found.</p>;
    }



    return (
        <>
            <SelectedCard className="animate__animated animate__backInLeft">
                <h1 className="animate__animated animate__bounce animate__slow animate__repeat-2">Join {workout.class_name} Class</h1>
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
            <ToastContainer position="top-end" className="p-3">

                <Toast bg="danger" show={showToast} onClose={() => setShowToast(false)}>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Error</strong>
                    </Toast.Header>
                    <Toast.Body>{errorMessage}</Toast.Body>
                </Toast>

            </ToastContainer>
        </>
    )
}




