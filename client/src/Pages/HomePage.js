import React, { useContext, useState } from 'react'
import Login from './Login'
import Nav from './Nav'
import Signup from './Signup'
import {MapProvider,Map, Popup} from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css'
import Form from './Form';
import Location from './Location';
import { userContext } from '../Context/userContext';

export default function HomePage() {


  const [openLogin, setOpenLogin] = useState(false)
  const [openRegister, setOpenRegister] = useState(false)
  const [user] = useContext(userContext)
  const userId = !user ? "loading"  :user

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


  const [showForm, setShowForm] = useState(false)


  // form for the new locations
  const [lugun, setLugun] = useState({
    title:"",
    review:"",
    rating:"",
    lat:"",
    long:"",
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

  // function to close the form
  function onClose(){
    setShowForm(prev => !prev)
  }




  return (
    <div className='home'>
      <h1>Universities luguns</h1>
      <Nav login={toggleLogin} register={toggleRegister}  screen={setScreen}/>
      {openRegister && <Signup close={toggleRegister}/>}
      {openLogin && <Login close={toggleLogin} />}
      <MapProvider>
          <Map
            initialViewState={{
              longitude: 11,
              latitude: 9,
              zoom: 5
            }}
            style={{width: "97vw", height: "80vh"}}
            mapStyle="mapbox://styles/abionaolushola/cl97jbqym004717lae5rwb4rf"
            mapboxAccessToken={process.env.REACT_APP_MAPTOKEN}
            onDblClick={handleDoubleClick}
            dragRotate={false}
          >
            {/* pop for schools in nigeria */}
            <Popup longitude={screen.long} latitude={screen.lat}
              anchor="bottom">
              <h5>{screen.name}</h5>
            </Popup>

          <Location />

          {user.username && <>{showForm && <Form close={onClose} lugun={lugun} handleChange={handleChange}/> }</>}
            
          </Map>
      </MapProvider>
     
    </div>
  )
}
