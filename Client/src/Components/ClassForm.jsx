import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import * as yup from "yup";
import styled from "styled-components";
import { AccountFormContainer } from './AccountFormContainer';
import { useAuthStore } from '../stores/useAuthStore';



const formSchema = yup.object().shape({
    classType: yup.string().required("Class type is required"),
    className: yup.string().required("Class name is required").min(3),
    intensity: yup.string().required("Intensity level is required"),
    startTime: yup.date()
        .required("Start time is required")
        .typeError("Start time must be a valid date"),

    duration: yup.number().required("Duration is required")
        .positive("Duration must be a positive amount")
        .test(
            'is-multiple-of-30',
            'Duration must be a multiple of 30',
            value => value % 30 === 0)
        .max(120),
    location: yup.string().required("Location is required"),
    price: yup.number().required("Price is required")
        .positive("Price must be a positive amount").test(
            'is-decimal',
            'Price must have at most 2 decimal places',
            value => value && /^\d+(\.\d{1,2})?$/.test(value)
        )
        .min(10)
        .max(40),
    classCapacity: yup.number()
        .required("Class capacity is required")
        .positive()
        .min(1)
        .max(20)
})

export default function ClassForm() {
    const navigate = useNavigate();
    // const user = useAuthStore((state) => state.user);
    const [classValues, setClassValues] = useState({

        classType: '',
        className: '',
        intensity: '',
        startTime: '',
        duration: '',
        location: '',
        price: '',
        classCapacity: ''
    });

    const [errorsState, setErrorsState] = useState({
        classType: '',
        className: '',
        intensity: '',
        startTime: '',
        duration: '',
        location: '',
        price: '',
        classCapacity: ''
    })

    const validate = (e) => {
        let value = e.target.value;

        // If the field is 'startTime', convert the value to ISO format
        if (e.target.name === 'startTime') {
            const date = new Date(value);
            if (!isNaN(date)) {  // Ensure the date is valid
                value = date.toISOString(); // Convert to ISO format
            }
        }
        yup.reach(formSchema, e.target.name).validate(e.target.value)
            .then(valid => {
                setErrorsState({
                    ...errorsState,
                    [e.target.name]: ""
                })
            })
            .catch(err => {
                setErrorsState({
                    ...errorsState,
                    [e.target.name]: err.errors[0]
                })
            })
    };

    const handleChange = (e) => {
        console.log("input change", e.target.value)
        e.persist()
        validate(e)
        let value = e.target.value;
        const numericField = [
            "classType",
            "intensity"

        ]
        if (e.target.name === "startTime") {
            value = new Date(e.target.value).toISOString()
        }
        if (numericField.includes(e.target.name)) {
            value = new Number(e.target.value)
        }
        setClassValues({
            ...classValues,
            [e.target.name]: value
        });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("form submitted")
        const requestData = {
            ...classValues, instructorId: user
        }
        console.log(requestData)
        axios
            .post('http://localhost:9000/api/instructor/class', requestData)
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <AccountFormContainer>
            <ClassFormStyle onSubmit={submitHandler}>
                <div>
                    <label htmlFor="classType">Type of Class:</label>
                    <ClassSelect
                        id="classType"
                        name="classType"
                        onChange={handleChange}
                    >
                        <option value="">-- Select Class Type --</option>
                        <option value="1">Indoor Yoga</option>
                        <option value="2">Outdoor Yoga</option>
                        <option value="3">Indoor Crossfit</option>
                        <option value="4">Outdoor Crossfit</option>
                        <option value="5">Indoor Pilates</option>
                        <option value="6">Outdoor Pilates</option>
                        <option value="7">Power Lifting</option>
                        <option value="8">Weight Training</option>
                    </ClassSelect>
                    {errorsState.classType.length > 0 ?
                        (<ErrorStatement>{errorsState.classType}</ErrorStatement>)
                        : null}
                </div>

                <div>
                    <label>Class Name:</label>
                    <ClassInput
                        type="text"
                        name="className"
                        value={classValues.className}
                        onChange={handleChange}
                    />
                    {errorsState.className.length > 0 ?
                        (<ErrorStatement>{errorsState.className}</ErrorStatement>)
                        : null}
                </div>

                <div>
                    <label htmlFor='intensity'>Intensity Level</label>
                    <ClassSelect
                        id="intensity"
                        name="intensity"
                        onChange={handleChange}
                    >
                        <option value="">-- Choose Intensity Level --</option>
                        <option value="1">High</option>
                        <option value="2">Medium</option>
                        <option value="3">Low</option>
                    </ClassSelect>
                    {errorsState.intensity.length > 0 ?
                        (<ErrorStatement>{errorsState.intensity}</ErrorStatement>)
                        : null}
                </div>

                <div>
                    <label htmlFor='startTime'>Start Time:</label>
                    <ClassInput
                        type='datetime-local'
                        id='startTime'
                        name='startTime'
                        onChange={handleChange}
                        placeholder='YYYY-MM-DD HH:MM'
                    />
                    {errorsState.startTime.length > 0 ?
                        (<ErrorStatement>{errorsState.startTime}</ErrorStatement>)
                        : null}
                </div>

                <div>
                    <label>Duration (minutes):</label>
                    <ClassInput
                        type='number'
                        name='duration'
                        value={classValues.duration}
                        onChange={handleChange}
                    />
                    {errorsState.duration.length > 0 ?
                        (<ErrorStatement>{errorsState.duration}</ErrorStatement>)
                        : null}
                </div>

                <div>
                    <label>Location:</label>
                    <ClassInput
                        type='text'
                        name='location'
                        value={classValues.location}
                        onChange={handleChange}
                    />
                    {errorsState.location.length > 0 ?
                        (<ErrorStatement>{errorsState.location}</ErrorStatement>)
                        : null}
                </div>

                <div>
                    <label>Price: (USD)</label>
                    <ClassInput
                        type='number'
                        name='price'
                        value={classValues.price}
                        onChange={handleChange}
                        placeholder='$00.00'
                    />
                    {errorsState.price.length > 0 ?
                        (<ErrorStatement>{errorsState.price}</ErrorStatement>)
                        : null}
                </div>


                <div>
                    <label>Class Capacity</label>
                    <ClassInput
                        type='number'
                        name='classCapacity'
                        value={classValues.classCapacity}
                        onChange={handleChange}
                    />
                    {errorsState.classCapacity.length > 0 ?
                        (<ErrorStatement>{errorsState.classCapacity}</ErrorStatement>)
                        : null}
                </div>
                <button type='submit'>Submit</button>
            </ClassFormStyle>

        </AccountFormContainer>
    )
}

const ErrorStatement = styled.p`
margin-top: 0;
font-size: 1rem;
color: red;
`
const ClassInput = styled.input`
position: relative;
padding: 10px 5px;
margin-bottom: 10px;
width: 100%;
`
const ClassFormStyle = styled.form`
display: flex;
flex-direction: column;
`
const ClassSelect = styled.select`
padding: 10px 5px;
margin-bottom: 10px;
width: 100%
`


// classType: '',
// className: '',
// intensity: '',
// startTime: '',
// duration: '',
// location: '',
// price: '',
// classCapacity: ''