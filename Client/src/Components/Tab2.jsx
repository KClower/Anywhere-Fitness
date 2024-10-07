import { useEffect } from "react";
import axios from "axios";




export function Tab2() {

    useEffect(() => {
        axios("https://reqres.in/api/users?page=2")
            .then(res => {
                console.log(res)
            })
    }, [])

    return (
        <div>
            Content for Tab 2
        </div>
    )
}