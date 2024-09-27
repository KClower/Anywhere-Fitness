import WorkoutList from "../Components/WorkoutList";
import 'animate.css';
import styled from "styled-components";


const WelcomeCard = styled.div`
width: 50%;
text-align: center;
margin: 75px auto;
`

export function Home() {
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
            </WelcomeCard>


            <WorkoutList />
        </>)
}

