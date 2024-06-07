
import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './Components/Home';
import SignInForm from './Components/SignInForm';
import NewAccountForm from "./Components/NewAccountForm";
import WorkoutList from './Components/WorkoutList';
import WorkoutCard from './Components/WorkoutCard';
import JoinClassForm from './Components/JoinClassForm';







function App() {


  return (
    <>

      <NavLink to='/'>
        HOME
      </NavLink>

      <Routes>
        <Route exact path="/" Component={Home} />
        <Route path="/SignInForm" Component={SignInForm} />
        <Route path="/NewAccountForm" Component={NewAccountForm} />
        <Route path="/WorkoutList" Component={WorkoutList} />
        <Route path="/WorkoutCard/:id" Component={WorkoutCard} />
        <Route path="/JoinClassForm/:id" Component={JoinClassForm} />
      </Routes>




    </>
  )
}

export default App
