import { useState, useEffect } from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import styled from 'styled-components';


const SignedUpClasses = () => {
    const [signedUpClasses, setSignedUpClasses] = useState([]);
    const [error, setError] = useState("");

    const clientId = sess

    useEffect(() => {
        axios
            .get(`http://localhost:9000/api/client/classes/${id}`)
            .then(res => {
                console.log(res.data)
                setSignedUpClasses(res.data)
            })
            .catch(error => {
                console.log("The data was not returned", error)
            })
    }, [])




}

export default SignedUpClasses;




