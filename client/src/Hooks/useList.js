import { useState } from 'react'
import axios from 'axios'

export default function useList() {

    const [school, setSchool] = useState(null)

    async function getAllSchools(){
        try {
            const res = await axios.get('http://localhost:9000/api/university')
            setSchool(res.data)
        } catch (err) {
            console.log(err)
        }
        
    }

  return{getAllSchools, school}
}
