
import { Routes, Route, Navigate } from 'react-router-dom';
import { NavBar } from './Components/NavBar';
import { Home } from './pages/Home';
import SignIn from './pages/SignIn';
import Register from "./pages/Register";
import { InstructorDashboard } from './pages/InstructorDashboard';
import { ClientDashboard } from './pages/ClientDashboard';









function App() {


  return (
    <>

      <NavBar />

      <Routes>
        <Route exact path="/" Component={Home} />
        <Route path="/SignIn" Component={SignIn} />
        <Route path="/Register" Component={Register} />
        <Route path="/Instructor/dashboard" Component={InstructorDashboard} />
        <Route path="/Client/dashboard" Component={ClientDashboard} />

      </Routes>




    </>
  )
}

export default App
