import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import styled from "styled-components";

const JoinForm = styled.form`
display: flex;
justify-content: center;
flex-direction: column;
margin: 10px auto;
max-width: 250px;
`

const JoinInput = styled.input`
margin-bottom: 10px;
`

const JoinButton = styled.button`
padding: 5px 0; 
cursor: pointer;
`


export default function JoinClassForm() {
    const navigate = useNavigate();

    const [paymentInfo, setPaymentInfo] = useState({
        name: "",
        cardnumber: "",
        date: "",
        code: "",
    })


    const changeHandler = (e) => {
        console.log(" Join Class input changed", e.target.value);
        e.persist()
        setPaymentInfo({
            ...paymentInfo,
            [e.target.name]: e.target.value
        });
    };



    const submitHandler = (e) => {
        e.preventDefault();
        console.log("payment form submitted")
        axios
            .post('https://reqres.in/api/users', paymentInfo)
            .then(res => {
                console.log(res.data)
                navigate("/ThankYouPage")
            })
            .catch(err => console.log(err))
    };

    return (
        <>

            <JoinForm onSubmit={submitHandler}>
                <JoinInput
                    type="text"
                    name="name"
                    value={paymentInfo.name}
                    onChange={changeHandler}
                    placeholder="Name"
                />
                <JoinInput
                    type="number"
                    name="cardnumber"
                    value={paymentInfo.cardnumber}
                    onChange={changeHandler}
                    placeholder="Card Number"
                />
                <JoinInput
                    type="date"
                    name="expiration"
                    value={paymentInfo.date}
                    onChange={changeHandler}
                    placeholder="Expiration Date"
                />
                <JoinInput
                    type="number"
                    name="code"
                    value={paymentInfo.code}
                    onChange={changeHandler}
                    placeholder="Security Code"
                />

                <JoinButton>Submit Payment</JoinButton>

            </JoinForm>
        </>
    )
}




