import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import useList from '../Hooks/useList'
import { userContext } from '../Context/userContext'

export default function Nav({login, register}) {

  const {getAllSchools, school} = useList()

    const [user, setUser] = useContext(userContext)
  const currentUser = !user ? "" : user.username
  

  // 
  const [location, setLocation] = useState({
    university:""
  })

  useEffect(()=>{
    getAllSchools()
  }, [location.university])


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
    school.map((el)=> {
      if(el.name === location.university)
      console.log({
        lat:el.latitude,
        long: el.longtitude
      })
    })
  }

  check()

  return (
    <div className='nav'>
      <div className="form">
        <select name="university" id="university" 
        value={location.university} 
        onChange={handleChange}>

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
        <h5>Welcome, {user.email}</h5>
        <button className="btn logout" onClick={()=> setUser(null)}>Log Out</button>
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

