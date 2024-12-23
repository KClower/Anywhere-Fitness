import SignInForm from "../Components/SignInForm";
import 'animate.css';
import styled from "styled-components";




const SignIn = () => {

    return (
        <BackgroundContainer>
            <div className="text-center">
                <h3 className="animate__animated animate__pulse animate__slow animate__infinite">Sign in below to begin your experience</h3>
            </div>
            <SignInForm />
        </BackgroundContainer>
    )
}


const BackgroundContainer = styled.div`
 
  background-image: url(${() => `${import.meta.env.BASE_URL}sign-in-page-image.jpg`});  
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;



export default SignIn;


