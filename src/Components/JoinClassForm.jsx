import { useState } from "react";
import workouts from "../dummydata";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const JoinForm = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
margin: 10px auto;
max-width: 250px;
`

const JoinInput = styled.input`
margin-bottom: 10px;
`

export default function JoinClassForm() {
    const [paymentInfo, setPaymentInfo] = useState({
        name: "",
        cardnumber: "",
        date: "",
        code: "",
    })


    const changeHandler = (e) => {
        console.log(" Join Class input changed", e.target.value);
        e.persist()
        // validate(e)
        setPaymentInfo({
            ...paymentInfo,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>

            <JoinForm>
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
                <input
                    type="number"
                    name="code"
                    value={paymentInfo.code}
                    onChange={changeHandler}
                    placeholder="Security Code"
                />
            </JoinForm>
        </>
    )
}




