import SignInForm from "./SignInForm";
import 'animate.css';
import styled from "styled-components";


const WelcomeCard = styled.div`
width: 75%;
text-align: center;
margin: 0 auto;
`

const Home = () => {

    return (
        <>

            <WelcomeCard>
                <h1>Welcome To Anywhere Fitness</h1>
                <p>These days, fitness classes can be held anywhere - a park,
                    an unfinished basement or a garage - not just at a traditional
                    gym. AnywhereFitness is the all-in-one solution to meet your
                    “on-location” fitness class needs. AnywhereFitness makes it painless
                    for Instructors and Clients alike to hold and attend Fitness classes
                    wherever they might be held.</p>
                <h3 className="animate__animated animate__pulse animate__slow animate__infinite">Sign in below to begin your experience</h3>
            </WelcomeCard>

            <SignInForm />
        </>
    )
}
export default Home;

