import workouts from "../dummydata";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


export default function WorkoutCard() {
    const params = useParams();
    console.log(params)
    const workout = workouts.find(thing => `${thing.id}` === params.id);
    console.log(workout)

    return (
        <>
            <h1>{workout.classtype}</h1>
            <div>
                <p>Instructor: {workout.instructor}</p>
                <p>Price: ${workout.price}</p>
                <p>{workout.classname}</p>
                <p>Starts at: {workout.classtime} / {workout.classdate}</p>
                <p>Duration: {workout.duration}</p>
                <p>Intensity Level: {workout.intensity}</p>
                <p>Location: {workout.location}</p>
                <p>Max # of attendies: {workout.maxsize}</p>
                <Link to='/JoinClassForm'>
                    <button>Join Class</button>
                </Link>
            </div>
        </>
    )
}




