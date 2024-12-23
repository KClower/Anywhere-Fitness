import { useState, useEffect } from "react";
import styled from "styled-components";
import { getClassIntensityTypes, getClassTypes, getInstructorNames } from "../Services/Anywhere-Fitness-Service";

const SearchLabel = styled.label`
padding-left: 50px;
padding-right: 5px;
`
const ResetButton = styled.button`
padding: 0 5px;
margin-left: 50px`;

export default function SearchForm({ searchFilter }) {


    const [classType, setClassType] = useState("");
    const [instructor, setInstructor] = useState("");
    const [intensity, setIntensity] = useState("");

    const [classTypes, setClassTypes] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const [intensities, setIntensities] = useState([]);



    useEffect(() => {
        getClassTypes()
            .then(res => {

                setClassTypes(res.data)
            })
            .catch(err => console.log(err));

        getInstructorNames()
            .then(res => {

                setInstructors(res.data)
            })
            .catch(err => console.log(err));

        getClassIntensityTypes()
            .then(res => {

                setIntensities(res.data)
            })
            .catch(err => console.log(err));
    }, [])



    const changeHandler = (e) => {

        if (e.target.name === "classtype") {
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

    const resetFilters = () => {
        setClassType("");
        setInstructor("");
        setIntensity("");

        searchFilter({ field: 'classtype', value: "" });
        searchFilter({ field: 'instructor', value: "" });
        searchFilter({ field: 'intensity', value: "" });
    };

    return (
        <div>

            <form>
                <SearchLabel>Search:</SearchLabel>
                <select
                    value={classType}
                    name="classtype"
                    id="classtype"
                    onChange={changeHandler}
                >
                    <option value="">--Class Types--</option>
                    {classTypes.map(type => (
                        <option key={type.id} value={type.class_type}>
                            {type.class_type}
                        </option>
                    ))}
                </select>

                <SearchLabel>Search:</SearchLabel>
                <select
                    value={instructor}
                    name="instructor"
                    id="instructor"
                    onChange={changeHandler}
                >
                    <option value="">--Instructors--</option>
                    {instructors.map(name => (
                        <option key={name.id} value={name.instructor_name}>
                            {name.instructor_name}
                        </option>
                    ))}
                </select>

                <SearchLabel>Search:</SearchLabel>
                <select
                    value={intensity}
                    name="intensity"
                    id="intensity"
                    onChange={changeHandler}
                >
                    <option value="">--Intensity Levels--</option>
                    {intensities.map(levels => (
                        <option key={levels.id} value={levels.intensity}>
                            {levels.intensity}
                        </option>
                    ))}

                </select>

                <ResetButton type="button" onClick={resetFilters}>
                    Clear Searches
                </ResetButton>
            </form>
        </div>
    )
}

