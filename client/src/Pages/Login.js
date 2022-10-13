import React, {useState} from 'react'
import useUser from '../Hooks/useUser'

export default function Login({close}) {

    const {loginUser, error, user} = useUser()

    const [studentLoginForm, setStudentLoginForm] = useState({
        username:"",
        password:"",

    })

    const handleChange = (e) =>{
        const {name, value} = e.target
        setStudentLoginForm(prev=>{
            return{
                ...prev,
                [name]:value
            }
        })
    }


    const handleSubmit = (e) =>{
        e.preventDefault()
        loginUser(studentLoginForm)
        if(localStorage.getItem('userLugun') !== null){
          close()
        }
    }


  return (
    <div className='reg-form'>
      <form onSubmit={handleSubmit}>
        <h4>Login your account</h4>
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" id="username"
        value={studentLoginForm.username}
        onChange={handleChange}
        />
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password" 
        value={studentLoginForm.password}
        onChange={handleChange}
        />
        <button className=" btn login reg-sign">Login</button>
        {error && <p className="err">{error}</p>}
      </form>
    </div>
  )
}
