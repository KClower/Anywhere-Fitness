import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import styled from "styled-components";
import { AccountFormContainer } from "../Components/AccountFormContainer";
import { useAuthStore } from "../stores/useAuthStore";
import Toast from 'react-bootstrap/Toast';
import { ToastContainer } from "react-bootstrap";



const formSchema = yup.object().shape({
    usertype: yup.string().required('Type of user is required.'),
    instructorName: yup.string().when('usertype', {
        is: 'instructor', // When usertype is 'instructor'
        then: () => {
            yup.string()
                .required('Instructor name is required.')
                .min(3, 'Instructor name must be at least 3 characters')
        }, // Apply validation
        otherwise: () => {
            yup.string().notRequired()
        }, // No validation if usertype is not 'instructor'
    }),
    email: yup.string().email('Must be a valid email address.').required('Must include email address.'),
    password: yup.string()
        .required('Password is required.')
        .min(8, 'Password must be at least 8 characters, contain Uppercase and special character.')
        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.'),
});



const RegisterForm = () => {
    const [showToast, setShowToast] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate();

    const [newAccount, setNewAccount] = useState({
        usertype: "",
        email: "",
        password: "",
        instructorName: "",

    });


    const { logIn } = useAuthStore();

    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        console.log(newAccount)
        formSchema.isValid(newAccount).then((valid) => {
            setButtonDisabled(!valid);
        });
    }, [newAccount])

    const [errorsState, setErrorsState] = useState({
        usertype: "",
        email: "",
        password: "",
        instructorName: "",

    });

    const [showPassword, setShowPassword] = useState(false);


    const toggleShowPassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    }

    const validate = async (e) => {
        // Validate the specific field that changed
        try {
            const { name, value } = e.target;

            // Validate the changed field
            await yup.reach(formSchema, name).validate(value);

            // If usertype changes, validate instructorName if necessary
            if (name === 'usertype') {
                const instructorNameValidation = await yup.reach(formSchema, 'instructorName').validate(newAccount.instructorName);
                setErrorsState({
                    ...errorsState,
                    instructorName: "", // Clear any previous error for instructorName
                });
            }

            // Clear the error for the changed field
            setErrorsState({
                ...errorsState,
                [name]: "",
            });
        } catch (err) {
            // Set the error for the specific field
            setErrorsState({
                ...errorsState,
                [e.target.name]: err.errors[0]
            });
        }
    };


    const changeHandler = (e) => {
        console.log("new account input changed", e.target.value, e.target.type)
        e.persist();
        validate(e);
        setNewAccount({
            ...newAccount,
            [e.target.name]: e.target.value
        });
    };


    const submitHandler = (e) => {
        e.preventDefault();
        console.log("new account form submitted")

        const payload = {
            email: newAccount.email,
            password: newAccount.password,
            instructorName: newAccount.instructorName,
            isInstructor: newAccount.usertype === "instructor" ? true : false
        }
        axios
            .post('http://localhost:9000/api/auth/register', payload, { withCredentials: true })
            .then(res => {
                console.log("register return", res.data);
                logIn(res.data.createdUser.userId, res.data.createdUser.isInstructor)
                navigate("/")
            })
            // .catch(err => console.log(err))
            .catch(err => {
                console.log(err.response.data.message);
                setErrorMessage(err.response.data.message);
                setShowToast(true); // Show toast with the error message

            });
    };



    return (
        <AccountFormContainer>

            <AccountForm onSubmit={submitHandler}>


                <label htmlFor="usertype">Register as:</label>

                <AccountSelect
                    value={newAccount.usertype}
                    name="usertype"
                    id="user-select"
                    onChange={changeHandler}
                >
                    <option value="">--Choose an option--</option>
                    <option value="client">Client</option>
                    <option value="instructor">Instructor</option>
                </AccountSelect>
                {errorsState.usertype.length > 0 ?
                    (<ErrorStatement>{errorsState.usertype}</ErrorStatement>)
                    : null}

                {newAccount.usertype === "instructor"
                    ? (<>
                        <AccountInput
                            type="text"
                            name="instructorName"
                            value={newAccount.instructorName}
                            onChange={changeHandler}
                            placeholder="Name"
                        />
                        {errorsState.instructorName.length > 0 ?
                            (<ErrorStatement>{errorsState.instructorName}</ErrorStatement>)
                            : null}
                    </>
                    )

                    : null
                }


                <AccountInput
                    type="email"
                    name="email"
                    value={newAccount.email}
                    onChange={changeHandler}
                    placeholder="Email"
                />
                {errorsState.email.length > 0 ?
                    (<ErrorStatement>{errorsState.email}</ErrorStatement>)
                    : null}

                <PasswordContainer>
                    <AccountInput
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={newAccount.password}
                        onChange={changeHandler}
                        placeholder="Create Password"
                    />
                    <ToggleButton onClick={toggleShowPassword}>
                        {showPassword ? 'Hide' : "Show"}
                    </ToggleButton>


                    {errorsState.password.length > 0 ?
                        (<ErrorStatement>{errorsState.password}</ErrorStatement>)
                        : null}
                </PasswordContainer>



                <AccountButton disabled={buttonDisabled} >Create Account</AccountButton>
            </AccountForm>

            <ToastContainer position="top-end" className="p-3">
                <Toast bg="danger" show={showToast} onClose={() => setShowToast(false)}>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Error</strong>
                    </Toast.Header>
                    <Toast.Body>{errorMessage}</Toast.Body>
                </Toast>

            </ToastContainer>

        </AccountFormContainer>
    )
}






const AccountForm = styled.form`
display: flex;
flex-direction: column;
`
const AccountSelect = styled.select`
padding: 10px 5px;
margin-bottom: 10px;

`

const AccountInput = styled.input`
padding: 10px 5px;
margin-bottom: 10px;
width: 100%;
`
const AccountButton = styled.button`
margin-top: 20px;
padding: 10px 0; 
cursor: pointer;
`
const ErrorStatement = styled.p`
margin-top: 0;
font-size: 1rem;
color: red;
`
const PasswordContainer = styled.div`
position: relative;
`
const ToggleButton = styled.button`
position: absolute;
  right: 5px;
 top: 10px;
  background: none;
  border: none;
  cursor: pointer;
`


export default RegisterForm;

