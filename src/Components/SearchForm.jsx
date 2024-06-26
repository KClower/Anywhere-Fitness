import { useState } from "react";

import styled from "styled-components";

const SearchLabel = styled.label`
padding-left: 50px;
padding-right: 5px;
`

export default function SearchForm(props) {

    const [classType, setClassType] = useState()
    const [instructor, setInstructor] = useState()
    const [intensity, setIntensity] = useState()
    const { searchFilter } = props





    const changeHandler = (e) => {

        if (e.target.name === "classType") {
            setClassType(e.target.value)
        } else if (e.target.name === "instructor") {
            setInstructor(e.target.value)
        } else if (e.target.name === "intensity") {
            setIntensity(e.target.value)
        }

        const filter = {
            field: e.target.name,
            value: e.target.value,
        }
        searchFilter(filter)
    }


    return (
        <div>

            <form>
                <SearchLabel>Class:</SearchLabel>

                <select
                    value={classType}
                    name="classtype"
                    id="classtype"
                    onChange={changeHandler}
                >
                    <option value="">--Choose an option--</option>
                    <option value="Yoga">Yoga</option>
                    <option value="Crossfit">Crossfit</option>
                    <option value="Pilates">Pilates</option>
                    <option value="Weight Training">Weight Training</option>

                </select>
                <SearchLabel>Instructor:</SearchLabel>
                <select
                    value={instructor}
                    name="instructor"
                    id="instructor"
                    onChange={changeHandler}
                >
                    <option value="">--Choose an option--</option>
                    <option value="Seth">Seth</option>
                    <option value="Blaze">Blaze</option>
                    <option value="Susan">Susan</option>
                    <option value="Jason">Jason</option>
                    <option value="Beth">Beth</option>
                </select>
                <SearchLabel>Intensity:</SearchLabel>
                <select
                    value={intensity}
                    name="intensity"
                    id="intensity"
                    onChange={changeHandler}
                >
                    <option value="">--Choose an option--</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>

                </select>
            </form>
        </div>
    )
}

