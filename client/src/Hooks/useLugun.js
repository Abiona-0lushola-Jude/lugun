import { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { lugunContext } from '../Context/lugunContext'

export default function useLugun() {
    const [lugun, setLugun] = useContext(lugunContext)
    const [error, setError] = useState(null)

    useEffect(()=>{
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
        
        getAllLocation()
    }, [])
    

    async function postLocation(value){
        try {
            await axios.post("http://localhost:9000/api/post/lugun", value) 
            await setLugun(prev=>{
                return[
                    ...prev,
                    {
                        userId:value.userId,
                        lat:value.lat,
                        long:value.long,
                        rating:Number(value.rating),
                        review:value.review,
                        userEmail:value.userEmail,
                        title:value.title
                    }
                ]
            })

            setError(null)
        } catch (err) {
            setError(err)
            setLugun([])
        }
    }

    async function deleteLocation(id){
        try {
            await axios.delete(`http://localhost:9000/api/delete/lungun/${id}`)
            setLugun(lugun.filter((el)=> el._id !== id))
            setError(null)
        } catch (err) {
            setLugun(lugun)
            setError(err)
        }
    }

  return {error,lugun, postLocation, deleteLocation}
}
