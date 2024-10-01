import { NavLink, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import BsNavbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import axios from 'axios';







export function NavBar() {

    const navigate = useNavigate();
    const avatarUrl = "https://via.placeholder.com/40";

    // const logOut = useAuthStore((state) => state.logOut);

    function handleLogOut(e) {
        e.preventDefault()
        console.log("calling logout")
        axios
            .post('http://localhost:9000/api/auth/logout', {}, { withCredentials: true })
            .then(res => {
                console.log(res.data)
                sessionStorage.removeItem('user')
                // logOut()
                navigate("/")
            })
            .catch(err => console.log(err))
    }


    return (
        <BsNavbar expand="lg" className="bg-body-tertiary">
            <Container>

                <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BsNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to='/'>Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/SignIn">Sign In</Nav.Link>
                        <Nav.Link as={"a"} href="#" onClick={handleLogOut}>Log Out</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        <Image
                            src={avatarUrl}  // Replace with the user's avatar URL
                            roundedCircle
                            style={{ width: '50px', height: '50px', marginRight: '10px' }}
                            alt="Profile"
                        />
                    </Nav>
                </BsNavbar.Collapse>
            </Container>
        </BsNavbar>
    );
}
