import { useState } from "react";
import styled from "styled-components";

const SearchLabel = styled.label`
padding: 10px;
`

export default function SearchForm() {

    const [searchTerm, setSearchTerm] = useState("")


    const changeHandler = (e) => {
        setSearchTerm(e.target.value)
    }

    return (
        <div>
            <form>
                <SearchLabel>Search Classes:</SearchLabel>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={changeHandler}
                />
            </form>
        </div>
    )
}

