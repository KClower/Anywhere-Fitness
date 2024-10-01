import RegisterForm from "../Components/RegisterForm";
import styled from "styled-components";
import 'animate.css';


const Register = () => {

    return (
        <>
            <RegisterH1 className="animate__animated animate__bounce animate__slow animate__repeat-3">Join the Experience</RegisterH1>

            <RegisterForm />
        </>
    )


}
const RegisterH1 = styled.h1`
text-align: center;
`

export default Register;
