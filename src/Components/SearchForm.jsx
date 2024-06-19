import { useState } from "react";
import workouts from "../dummydata";
import styled from "styled-components";

const SearchLabel = styled.label`
padding-left: 50px;
padding-right: 5px;
`

export default function SearchForm(props) {
    const { searchClasses } = props

    const [searchTerm, setSearchTerm] = useState(workouts)
    const { instructor, classname, intensity } = workouts;

    const handleSubmit = (e) => {
        e.preventDefault();
        searchClasses(searchTerm)
        setSearchTerm("")
    }

    const changeHandler = (e) => {
        setSearchTerm(e.target.value)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <SearchLabel>Class:</SearchLabel>
                <select
                    value={classname}
                    name="classname"
                    id="classname"
                    onChange={changeHandler}
                >
                    <option value="">--Choose an option--</option>
                    <option value="classname">Yoga</option>
                    <option value="classname">Crossfit</option>
                    <option value="classname">Pilates</option>
                    <option value="classname">Weight Training</option>

                </select>
                <SearchLabel>Instructor:</SearchLabel>
                <select
                    value={instructor}
                    name="instructor"
                    id="instructor"
                    onChange={changeHandler}
                >
                    <option value="">--Choose an option--</option>
                    <option value="instructor">Seth</option>
                    <option value="instructor">Blaze</option>
                    <option value="instructor">Susan</option>
                    <option value="instructor">Jason</option>
                    <option value="instructor">Beth</option>
                </select>
                <SearchLabel>Intensity:</SearchLabel>
                <select
                    value={intensity}
                    name="intensity"
                    id="intensity"
                    onChange={changeHandler}
                >
                    <option value="">--Choose an option--</option>
                    <option value="intensity">Low</option>
                    <option value="intensity">Medium</option>
                    <option value="intensity">High</option>

                </select>
            </form>
        </div>
    )
}

