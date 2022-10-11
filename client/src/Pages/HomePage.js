import React, { useState } from 'react'
import Login from './Login'
import Nav from './Nav'
import Signup from './Signup'

export default function HomePage() {


  const [openLogin, setOpenLogin] = useState(false)
  const [openRegister, setOpenRegister] = useState(false)


  // here is a function that toggle the login form
  function toggleLogin(){
    if (openRegister === true){
      setOpenRegister(false)
    }
    setOpenLogin(prev => !prev)
  }

// here is a function that toggle the Register form
  function toggleRegister(){
    if (openLogin === true){
      setOpenLogin(false)
    }
    setOpenRegister(prev => !prev)
  }




  return (
    <div className='home'>
      <h1>Universities luguns</h1>
      <Nav login={toggleLogin} register={toggleRegister} />
      {openRegister && <Signup close={toggleRegister}/>}
      {openLogin && <Login close={toggleLogin} />}
    </div>
  )
}
