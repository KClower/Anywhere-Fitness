import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import * as yup from "yup";
import styled from "styled-components";
import { AccountFormContainer } from './AccountFormContainer';



const formSchema = yup.object().shape({
    classType: yup.string().required("Class type is required"),
    className: yup.string().required("Class name is required").min(3),
    intensity: yup.string().required("Intensity level is required"),
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
        setClassValues({
            ...classValues,
            [e.target.name]: e.target.value
        });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("form submitted")
        axios
            .post('http://localhost:9000/api/instructor/class', classValues)
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <AccountFormContainer>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="classType">Type of Class:</label>
                    <select
                        id="classType"
                        name="classType"
                        onChange={handleChange}
                    >
                        <option value="">-- Select Class Type --</option>
                        <option value="indoor yoga">Indoor Yoga</option>
                        <option value="outdoor yoga">Outdoor Yoga</option>
                        <option value="indoor crossfit">Indoor Crossfit</option>
                        <option value="outdoor crossfit">Outdoor Crossfit</option>
                        <option value="indoor pilates">Indoor Pilates</option>
                        <option value="outdoor pilates">Outdoor Pilates</option>
                        <option value="power lifting">Power Lifting</option>
                        <option value="weight training">Weight Training</option>
                    </select>
                    {errorsState.classType.length > 0 ?
                        (<ErrorStatement>{errorsState.classType}</ErrorStatement>)
                        : null}
                </div>

                <div>
                    <label>Class Name:</label>
                    <input
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
                    <label htmlFor='"intensity'>Intensity Level</label>
                    <select
                        id="intensity"
                        name="intensity"
                        onChange={handleChange}
                    >
                        <option value="">-- Choose Intensity Level --</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                    {errorsState.intensity.length > 0 ?
                        (<ErrorStatement>{errorsState.intensity}</ErrorStatement>)
                        : null}
                </div>

                <div>
                    <label>Duration (minutes):</label>
                    <input
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
                    <input
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
                    <label>Price: $</label>
                    <input
                        type='number'
                        name='price'
                        value={classValues.price}
                        onChange={handleChange}
                    />
                    {errorsState.price.length > 0 ?
                        (<ErrorStatement>{errorsState.price}</ErrorStatement>)
                        : null}
                </div>

                <div>
                    <label>Class Capacity</label>
                    <input
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
            </form>

        </AccountFormContainer>
    )
}

const ErrorStatement = styled.p`
margin-top: 0;
font-size: 1rem;
color: red;
`

// classType: '',
// className: '',
// intensity: '',
// startTime: '',
// duration: '',
// location: '',
// price: '',
// classCapacity: ''