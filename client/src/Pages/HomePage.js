import React, { useEffect, useState } from 'react'
import Login from './Login'
import Nav from './Nav'
import Signup from './Signup'
import {MapProvider,Map, Popup, Marker} from "react-map-gl";
import {ImLocation} from "react-icons/im"
import {IoSchool} from "react-icons/io5"
import {BsFillStarFill} from "react-icons/bs"
import 'mapbox-gl/dist/mapbox-gl.css'
import useLugun from '../Hooks/useLugun';

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

  // state taht stores school locations
  const [screen, setScreen] = useState({
    lat:"",
    long:"",
    name:""
  })

  // stste for the new input to be registered
  const [lugun, setLugun] = useState({
    title:"",
    review:"",
    rating:"",
    lat:"",
    long:"",
    user:""
  })

  // function that validate the inputs
  function handleChange(e){
    const {name, value} = e.target
      setLugun(prev=>{
        return{
          ...prev,
          [name]:value
        }
      })
  }

  const [showForm, setShowForm] = useState(false)

// function to get location on double click
  const handleDoubleClick = (e) =>{
    setLugun(prev=>{
      return{
        ...prev,
        lat:e.lngLat.lat,
        long:e.lngLat.lng,
      }
    })
    setShowForm(prev => !prev)
  } 



  // function that submit form
  function handleSubmit(e){
    e.preventDefault()

    console.log(lugun)
  }
  

  // get all location from database
  const {getAllLocation, locate, error} = useLugun()
  
  useEffect(()=>{
    getAllLocation()
  })


  console.log(locate)
  return (
    <div className='home'>
      <h1>Universities luguns</h1>
      <Nav login={toggleLogin} register={toggleRegister}  screen={setScreen}/>
      {openRegister && <Signup close={toggleRegister}/>}
      {openLogin && <Login close={toggleLogin} />}
      <MapProvider>
          <Map
            initialViewState={{
              longitude: 10,
              latitude: 8,
              zoom: 5
            }}
            style={{width: "97vw", height: "80vh"}}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken={process.env.REACT_APP_MAPTOKEN}
            onDblClick={handleDoubleClick}
          >
            {/* pop for schools in nigeria */}
            <Popup longitude={screen.long} latitude={screen.lat}
              anchor="bottom">
              <h5>{screen.name}</h5>
            </Popup>

            {/* this is for all the places that has been picked */}
            <Marker longitude={5} latitude={5} anchor="bottom" >
             <ImLocation style={{fontSize: "20",color:"tomato"}} />
           </Marker>

           {/* { <Popup longitude={5} latitude={5}
              anchor="left"
              offset={12}
              onClose={()=> setShowForm(false)}
              >
                <div className="card">
                  <h6 className="title">Title</h6>
                  <p className="title-context">Beach Now</p>
                  <h6 className="desc">Review</h6>
                  <p className="review-content">It's a place of good relax</p>
                  <h6 className="rating">Rating</h6>
                  <div className="rating-card">
                    <BsFillStarFill style={{color:"gold"}}/>
                    <BsFillStarFill style={{color:"gold"}}/>
                    <BsFillStarFill style={{color:"gold"}}/>
                    <BsFillStarFill style={{color:"gold"}}/>
                    <BsFillStarFill style={{color:"gold"}}/>
                  </div>
                  <p className="posted">Created by <strong>Aduke</strong></p>
                  <p className="createdAt">1 hour ago</p>
                </div>
            </Popup>} */}



                {showForm && <Popup longitude={lugun.long} latitude={lugun.lat}
                  anchor="bottom"
                  onClose={()=> setShowForm(prev=> !prev)}
                  >
                  <form className="card-form" onSubmit={handleSubmit}>
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" id="title" value={lugun.title} onChange={handleChange} />
                    <label htmlFor="review">Review: </label>
                    <textarea name="review" id="review" value={lugun.review} onChange={handleChange}></textarea>
                    <label htmlFor="rating">Rating:</label>
                    <select name="rating" id="rating" value={lugun.rating} onChange={handleChange}>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                      <option value="4">Four</option>
                      <option value="5">Five</option>
                    </select>
                    <button className='btn reg-sign'>Save</button>
                  </form>
                </Popup>}
            
          </Map>
      </MapProvider>
     
    </div>
  )
}
