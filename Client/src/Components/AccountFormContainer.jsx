import styled from "styled-components";
export function AccountFormContainer({
    children
}) {
    return <FormContainer>
        {children}
    </FormContainer>


}
const FormContainer = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
width: 40%;
margin: 30px auto;
`


