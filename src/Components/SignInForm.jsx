import { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import { Link } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import styled from "styled-components";




const SignInCard = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
width: 40%;
margin: 30px auto;
`
const SigninForm = styled.form`
display: flex;
flex-direction: column;
`
const SignInSelect = styled.select`
padding: 10px 5px;
margin-bottom: 10px;
`

const SignInInput = styled.input`
padding: 10px 5px;
margin-bottom: 10px;
width: 96.5%
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
  transform: translateY(-220%);
  background: none;
  border: none;
  cursor: pointer;
`

const formSchema = yup.object().shape({
    usertype: yup.string().required('Type of user is required'),
    username: yup.string().required('User name is required').min(3, "Requires 3 letters minimum"),
    password: yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters, contain uppercase, lowercase number and special character')
        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'),
});

function SignInForm() {
    // const history = useHistory();

    const [credentials, setCredentials] = useState({
        usertype: "",
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
        usertype: "",
        username: "",
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
        axios
            .post('https://reqres.in/api/users', credentials)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    };




    return (
        <SignInCard>

            <SigninForm onSubmit={submitHandler}>

                <label htmlFor="usertype">How you would like to sign in ?</label>

                <SignInSelect
                    value={credentials.usertype}
                    name="usertype"
                    id="usertype"
                    onChange={changeHandler}
                >
                    <option value="">--Choose an option--</option>
                    <option value="client">Client</option>
                    <option value="instructor">Instructor</option>
                </SignInSelect>
                {errorsState.usertype.length > 0 ?
                    (<ErrorStatement>{errorsState.usertype}</ErrorStatement>)
                    : null}

                <SignInInput
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={changeHandler}
                    placeholder="Username"
                />
                {errorsState.username.length > 0 ?
                    (<ErrorStatement>{errorsState.username}</ErrorStatement>)
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

                <SignInButton Link to="/WorkoutList" disabled={buttonDisabled}>Sign In</SignInButton>
                <p>Don't have an Account ? / Create Account <Link to='/NewAccountForm'>Here</Link></p>
            </SigninForm>
        </SignInCard>


    )
}



export default SignInForm;