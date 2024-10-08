import WorkoutList from "../Components/WorkoutList";
import 'animate.css';
import styled from "styled-components";




export function Home() {
    return (
        <BackgroundContainer>
            <WelcomeCard>
                <h1>Welcome To Anywhere Fitness</h1>
                <p>These days, fitness classes can be held anywhere - a park,
                    an unfinished basement or a garage - not just at a traditional
                    gym. AnywhereFitness is the all-in-one solution to meet your
                    “on-location” fitness class needs. AnywhereFitness makes it painless
                    for Instructors and Clients alike to hold and attend Fitness classes
                    wherever they might be held.</p>
            </WelcomeCard>


            <WorkoutList />
        </BackgroundContainer>)
}

const WelcomeCard = styled.div`
width: 50%;
text-align: center;
margin: 75px auto;
  background-color: rgba(255, 255, 255, 0.8); 
  padding: 20px;
  border-radius: 10px;
`

const BackgroundContainer = styled.div`
  background-image: url('/home-background-image.jpg'); 
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
