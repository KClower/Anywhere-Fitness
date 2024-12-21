import { useState, useEffect } from "react";
import * as yup from "yup";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { AccountFormContainer } from "./AccountFormContainer";
import { useAuthStore } from "../stores/useAuthStore";
import Toast from 'react-bootstrap/Toast';
import { ToastContainer } from "react-bootstrap";
import { userLogIn } from "../Services/Anywhere-Fitness-Service";





const formSchema = yup.object().shape({
    // usertype: yup.string().required('Type of user is required'),
    email: yup.string().email('Must be a valid email address.').required('Must include email address.'),
    password: yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters, contain uppercase, lowercase number and special character')
        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'),
});

function SignInForm() {
    const [showToast, setShowToast] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate();
    const { logIn } = useAuthStore();



    const [credentials, setCredentials] = useState({
        // usertype: "",
        username: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    useEffect(() => {
        console.log(credentials)
        formSchema.isValid(credentials).then((valid) => {
            setButtonDisabled(!valid);
        });
    }, [credentials])

    const [errorsState, setErrorsState] = useState({
        // usertype: "",
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    }


    const validate = (e) => {
        yup.reach(formSchema, e.target.name).validate(e.target.value)
            .then(valid => {
                console.log("validate::valid", valid)
                setErrorsState({
                    ...errorsState,
                    [e.target.name]: ""
                })
            })
            .catch(err => {

                console.log("validate::err", err.errors)
                setErrorsState({
                    ...errorsState,
                    [e.target.name]: err.errors[0]
                })
            })
    };

    const changeHandler = (e) => {

        console.log(" sign in input changed", e.target.value);
        e.persist()
        validate(e)
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("sign in form submitted")
        userLogIn(credentials)
            .then(res => {
                console.log("login result", res.data)
                logIn(res.data.userInfo.userId, res.data.userInfo.isInstructor)
                navigate("/")
            })
            .catch(err => {
                console.log(err.response.data.message)
                setErrorMessage(err.response.data.message);
                setShowToast(true);
            })
    };





    return (
        <AccountFormContainer>

            <SigninForm onSubmit={submitHandler}>



                <SignInInput
                    type="email"
                    name="email"
                    value={credentials.email}
                    onChange={changeHandler}
                    placeholder="Email"
                />
                {errorsState.email.length > 0 ?
                    (<ErrorStatement>{errorsState.email}</ErrorStatement>)
                    : null}

                <PasswordContainer>
                    <SignInInput
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={credentials.password}
                        onChange={changeHandler}
                        placeholder="Password"
                    />
                    <ToggleButton onClick={toggleShowPassword}>
                        {showPassword ? 'Hide' : "Show"}
                    </ToggleButton>
                    {errorsState.password.length > 0 ?
                        (<ErrorStatement>{errorsState.password}</ErrorStatement>)
                        : null}
                </PasswordContainer>

                <SignInButton disabled={buttonDisabled}>Sign In</SignInButton>
                <p style={{ backgroundColor: 'rgba(211, 211, 211, 0.7)' }}>Don't have an Account ? / Create Account <Link to='/Register'>Here</Link></p>
            </SigninForm>

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

const SigninForm = styled.form`
display: flex;
flex-direction: column;
`
const SignInSelect = styled.select`
padding: 10px 5px;
margin-bottom: 10px;
`

const SignInInput = styled.input`
position: relative;
padding: 10px 5px;
margin-bottom: 10px;
width: 100%;
`
const SignInButton = styled.button`
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
  transform: translateY(80%);
  background: none;
  border: none;
  cursor: pointer;
`


export default SignInForm;