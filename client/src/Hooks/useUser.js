import axios from "axios"
import { useState } from "react"
import { useContext } from "react"
import { userContext } from "../Context/userContext"

export default function useUser() {

    const [user, setUser] = useContext(userContext)
    const [error, setError] = useState(null)


    async  function registerUser(value){
        try {
            const res = await axios.post('http://localhost:9000/api/register', value)
            await setUser(null)
            await setError(null)
        } catch (err) {
            await setError(err.response.data.message)
            await setUser(null)
        }
    }


    async function loginUser (value){
        try {
            const res = await axios.post('http://localhost:9000/api/login', value)
            await setUser(res.data)
            await setError(null)
        } catch (err) {
            await setError(err.response.data.message)
            await setUser(null)
        }
    }


  return {user, error, registerUser, loginUser}
}
