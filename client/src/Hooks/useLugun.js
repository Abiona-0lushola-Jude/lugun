import { useContext, useState } from 'react'
import axios from "axios"
import { lugunContext } from '../Context/lugunContext'

export default function useLugun() {
    const [lugun, setLugun] = useContext(lugunContext)
    const [error, setError] = useState(null)

    async function getAllLocation(){
        try {
            const res = await axios.get("http://localhost:9000/api/get/lungun")
            setError(null)
            setLugun(res.data)
            console.log(lugun)
        } catch (err) {
            setLugun([])
            setError(err)
        }
    }

    async function postLocation(value){
        try {
            const res = await axios.post("http://localhost:9000/api/post/lugun", value) 
            setLugun(prev=>{
                return[
                    ...prev,
                    value
                ]
            })
            setError(null)
        } catch (err) {
            setError(err)
            setLugun([])
        }
    }

  return {getAllLocation, error,lugun, postLocation}
}
