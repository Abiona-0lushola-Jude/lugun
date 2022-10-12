import React, { useState } from 'react'
import axios from "axios"

export default function useLugun() {
    const [locate, setLocate] = useState([])
    const [error, setError] = useState(null)

    async function getAllLocation(){
        try {
            const res = axios.get("http://localhost:9000/api/get/lungun")
            setError(null)
            setLocate(res.data)
            console.log(locate)
        } catch (err) {
            setLocate([])
            setError(err)
        }
    }

  return {getAllLocation, error,}
}
