
import { Routes, Route } from 'react-router-dom';
import { NavBar } from './Components/NavBar';
import { Home } from './pages/Home';
import SignIn from './pages/SignIn';
import Register from "./pages/Register";
import WorkoutList from './Components/WorkoutList';
import WorkoutCard from './Components/WorkoutCard';
import ClassForm from './Components/ClassForm';
import JoinClassForm from './Components/JoinClassForm';
import ThankYou from './pages/ThankYouPage';







function App() {


  return (
    <>

      <NavBar />

      <Routes>
        <Route exact path="/" Component={Home} />
        <Route path="/SignIn" Component={SignIn} />
        <Route path="/Register" Component={Register} />
        <Route path="/WorkoutList" Component={WorkoutList} />
        <Route path="/WorkoutCard/:id" Component={WorkoutCard} />
        <Route path="/ClassForm" Component={ClassForm} />
        <Route path="/JoinClassForm" Component={JoinClassForm} />
        <Route path="/ThankYouPage" Component={ThankYou} />
      </Routes>




    </>
  )
}

export default App
