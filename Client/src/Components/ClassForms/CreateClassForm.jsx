import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import styled from "styled-components";
import { AccountFormContainer } from '../AccountFormContainer';
import { useAuthStore } from '../../stores/useAuthStore';
import { handleInputChange, validateForm } from './utils';




export default function CreateClassForm({ onSuccess, onHide }) {
    const navigate = useNavigate();
    const { user } = useAuthStore()

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
        validateForm(e)
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
        e.persist()
        validate(e)
        const value = handleInputChange(e)
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

        axios
            .post('http://localhost:9000/api/instructor/class', requestData)
            .then(res => {
                console.log("create class", res.data.createdClass)

                onHide();
                onSuccess(res.data.createdClass);

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