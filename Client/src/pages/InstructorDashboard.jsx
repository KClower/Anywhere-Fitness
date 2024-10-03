import InstructorClasses from "../Components/InstructorClasses";
import styled from 'styled-components';


export function InstructorDashboard() {
    return (
        <>
            <DashboardHeader>
                <h2>Dashboard</h2>
                <CreateClassButton>Create Class</CreateClassButton>
            </DashboardHeader>

            < InstructorClasses />
        </>
    )



}


const DashboardHeader = styled.div`
display: flex;
justify-content: space-around;
`

const CreateClassButton = styled.button`
    background-color: #007bff; 
    color: white; 
    border: none; 
    border-radius: 5px; 
    padding: 0 20px; 
    cursor: pointer; 
    
    &:hover {
        background-color: #0056b3; 
    }
`;