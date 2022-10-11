import React, { useState } from 'react'
import useUser from '../Hooks/useUser'

export default function Signup({close}) {

        const {registerUser, error} = useUser()

    const [studentForm, setStudentForm] = useState({
        username:"",
        email:"",
        password:"",
        student:"",
        universityName:""
    })

    const handleChange = (e) =>{
        const {name, value} = e.target
        setStudentForm(prev=>{
            return{
                ...prev,
                [name]:value
            }
        })
    }


    const handleSubmit = (e) =>{

        e.preventDefault()
        registerUser(studentForm)
        if(error === null){
            return
        }
        close()
    }

  return (
    <div className='reg-form'>
      <form onSubmit={handleSubmit}>
        <h4>Create an account</h4>
        <label htmlFor="username">Enter Username: </label>
        <input type="text" name="username" id="username"
        value={studentForm.username}
        onChange={handleChange}
        />
        <label htmlFor="email">Email: </label>
        <input type="email" name="email" id="email" 
        value={studentForm.email}
        onChange={handleChange}
        />
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password" 
        value={studentForm.password}
        onChange={handleChange}/>
        <label htmlFor="student">Are you currently a student? </label>
        <select name="student" id="student" 
        value={studentForm.student}
        onChange={handleChange}>
            <option value="null"></option>
            <option value="1">Yes</option>
            <option value="0">No</option>
        </select>
        <label htmlFor="universityName">The university you attend?</label>
        <input type="text" name="universityName" id="universityName"  placeholder='e.g unilag, uniben etc.'
        value={studentForm.universityName}
        onChange={handleChange}
        />
        <button className='btn signup reg-sign' type='submit'>Sign Up </button>
        {error && <p className="err">{error}</p>}
      </form>
    </div>
  )
}
