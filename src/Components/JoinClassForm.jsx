import workouts from "../dummydata";
import { useParams } from "react-router-dom";

export default function JoinClassForm() {


    return (
        <>
            <h2>Join class</h2>
            <form>
                <input
                    type="text"
                    name="username"
                    // value={ }
                    // onChange={ }
                    placeholder="Name"
                />
                <input
                    type="number"
                    name="cardnumber"
                    // value={ }
                    // onChange={ }
                    placeholder="Card Number"
                />
            </form>
        </>
    )
}




