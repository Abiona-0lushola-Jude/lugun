import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { userContext } from '../Context/userContext'
import axios from 'axios'

export default function Nav({login, register, screen}) {


    const [school, setSchool] = useState([])
    const [user, setUser] = useContext(userContext)
    const currentUser = !user ? "" : user.username
  

  // location
  const [location, setLocation] = useState({
    university:""
  })

  useEffect(()=>{
    async function getAllSchools(){
      try {
          const res = await axios.get('http://localhost:9000/api/university')
          setSchool(res.data)
      } catch (err) {
          console.log(err)
      }
    }
    getAllSchools()
  })

  function handleChange(e){
    const {name, value}= e.target

    setLocation(prev=>{
      return{
        ...prev,
        [name]:value
      }
    })
  }

  function check(){
    school.filter((el)=> {
        if(el.name === location.university)
        screen(prev => {
          return{
            lat:el.latitude,
            long:el.longtitude,
            name:el.name
          }
        }) 
    })
  }

  function logout(){
    setUser(null)
    localStorage.clear()
  }

  return (
    <div className='nav'>
      <div className="form">
        <select name="university" id="university" 
        value={location.university} 
        onChange={handleChange}
        onClick={check}>

          <option value="null">Pick your university here</option>
          {!school ? "loading" :
            school.map((element)=>{
              return(
                <option key={element.id}  value={element.name}>{element.acrimony}</option>
              )
            })
          }
        </select>
      </div>
      <div className="register">
        {currentUser ?
        <div className='use'>
        <h5>Welcome, {user.username}</h5>
        <button className="btn logout" onClick={logout}>Log Out</button>
        </div>
         :
        <>
        <button className="btn login" onClick={login}>Login</button>
        <button className="btn signup" onClick={register}>Sign Up</button>
        </>}
        
      </div>
    </div>
  )
}

