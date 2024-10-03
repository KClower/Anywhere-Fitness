import { NavLink, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import BsNavbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import axios from 'axios';
import { useAuthStore } from '../stores/useAuthStore';




function getDashboardLink(isAuthenticated, isInstructor) {
    if (!isAuthenticated) {
        return ""
    }
    if (isInstructor) {
        return "/Instructor/dashboard"

    }
    return "/Client/dashboard"
}

export function NavBar() {

    const { isAuthenticated, logOut, isInstructor } = useAuthStore();

    const navigate = useNavigate();
    const dashboardLink = getDashboardLink(isAuthenticated, isInstructor);



    function handleLogOut(e) {
        e.preventDefault()
        console.log("calling logout")
        axios
            .post('http://localhost:9000/api/auth/logout', {}, { withCredentials: true })
            .then(res => {
                console.log(res.data)
                logOut()
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
                        {
                            isAuthenticated
                                ? <Nav.Link as={"a"} href="#" onClick={handleLogOut}>Log Out</Nav.Link>
                                : <Nav.Link as={NavLink} to="/SignIn">Sign In</Nav.Link>
                        }

                    </Nav>
                </BsNavbar.Collapse>
                {isAuthenticated
                    ? (
                        <Nav className="ms-auto">
                            <Nav.Link as={NavLink} to={dashboardLink}>
                                <Image
                                    src={'/avatar-image.png'}
                                    roundedCircle
                                    style={{ width: '50px', height: '50px', marginRight: '10px' }}
                                    alt="Profile"
                                />
                            </Nav.Link>
                        </Nav>
                    )
                    : null
                }


            </Container>
        </BsNavbar>
    );
}
