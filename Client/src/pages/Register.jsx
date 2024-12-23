import RegisterForm from "../Components/RegisterForm";
import styled from "styled-components";
import 'animate.css';


const Register = () => {

    return (
        <BackgroundContainer>
            <RegisterH1 className="animate__animated animate__bounce animate__slow animate__repeat-3">Join the Experience</RegisterH1>

            <RegisterForm />
        </BackgroundContainer>
    )


}
const RegisterH1 = styled.h1`
text-align: center;
color: indianred;
`
const BackgroundContainer = styled.div`
  
  background-image: url(${() => `${import.meta.env.BASE_URL}register-image.jpg`}); 
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;


export default Register;
