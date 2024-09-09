import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import styled from "styled-components";
import 'animate.css';


const AccountH2 = styled.h1`
text-align: center;
`

const AccountCard = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
width: 40%;
margin: 30px auto;
`
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


const formSchema = yup.object().shape({
    usertype: yup.string().required('Type of user is required.'),
    username: yup.string().required('User name is required.').min(3, 'Requires 3 letters minimum.'),
    email: yup.string().email('Must be a valid email address.').required('Must include email address.'),
    password: yup.string()
        .required('Password is required.')
        .min(8, 'Password must be at least 8 characters, contain Uppercase and special character.')
        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.'),
    // confirmpassword: yup.string().oneOf([yup.ref('password'), null], 'Your passwords do not match.'),
    terms: yup.boolean().oneOf([true], 'Please agree to terms of use.'),
});





const NewAccountForm = () => {
    const navigate = useNavigate();

    const [newAccount, setNewAccount] = useState({
        usertype: "",
        username: "",
        email: "",
        password: "",
        // confirmpassword: "",
        terms: false,
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        console.log(newAccount)
        formSchema.isValid(newAccount).then((valid) => {
            setButtonDisabled(!valid);
        });
    }, [newAccount])

    const [errorsState, setErrorsState] = useState({
        usertype: "",
        username: "",
        email: "",
        password: "",
        // confirmpassword: "",
        terms: "",
    });

    const [showPassword, setShowPassword] = useState(false);


    const toggleShowPassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    }

    const validate = (e) => {
        let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        yup.reach(formSchema, e.target.name).validate(value)
            .then(valid => {
                console.log("validate::valid", valid)
                setErrorsState({
                    ...errorsState,
                    [e.target.name]: ""
                });
            })
            .catch(err => {
                console.log("validate::err", err.errors)
                setErrorsState({
                    ...errorsState,
                    [e.target.name]: err.errors[0]
                });
            });
    };

    const changeHandler = (e) => {
        console.log("new account input changed", e.target.value, e.target.type)
        e.persist();
        validate(e);
        let value = e.target.type === "checkbox" ? e.target.checked : e.target.value
        setNewAccount({
            ...newAccount,
            [e.target.name]: value
        });
    };


    const submitHandler = (e) => {
        e.preventDefault();
        console.log("new account form submitted")
        axios
            .post('https://reqres.in/api/users', newAccount)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        navigate("/WorkoutList")
    };



    return (
        <AccountCard>
            <AccountH2 className="animate__animated animate__bounce animate__slow animate__repeat-3">Join the Experience</AccountH2>
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

                <AccountInput
                    type="text"
                    name="username"
                    value={newAccount.username}
                    onChange={changeHandler}
                    placeholder="Username"
                />
                {errorsState.username.length > 0 ?
                    (<ErrorStatement>{errorsState.username}</ErrorStatement>)
                    : null}

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

                {/* <PasswordContainer>
                    <AccountInput
                        type={showPassword ? "text" : "password"}
                        name="confirmpassword"
                        value={newAccount.confirmpassword}
                        onChange={changeHandler}
                        placeholder="Confrim Password"
                    />             
                    {errorsState.confirmpassword.length > 0 ?
                        (<ErrorStatement>{errorsState.confirmpassword}</ErrorStatement>)
                        : null}
                </PasswordContainer> */}

                <label htmlFor="terms">
                    <input type="checkbox"
                        id="terms"
                        name="terms"
                        checked={newAccount.terms}
                        onChange={changeHandler}
                    />
                    Terms & Conditions
                    {errorsState.terms.length > 0 ?
                        (<ErrorStatement>{errorsState.terms}</ErrorStatement>)
                        : null}

                </label>

                <AccountButton disabled={buttonDisabled} >Create Account</AccountButton>
            </AccountForm>
        </AccountCard>
    )
}

export default NewAccountForm;

