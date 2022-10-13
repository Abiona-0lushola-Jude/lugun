import React, { useEffect, useContext, useState } from 'react'
import {ImLocation} from "react-icons/im"
import { Popup, Marker} from "react-map-gl";
import {BsFillStarFill} from "react-icons/bs"
import useLugun from '../Hooks/useLugun';
import { userContext } from '../Context/userContext';

const Location = () => {


    const [featuresId, showFeaturesId] = useState(0)
    const[user]= useContext(userContext)

    const {getAllLocation, lugun} = useLugun()

    useEffect(()=>{
        getAllLocation()
    }, [user.username])


    function handleClick(id){
        showFeaturesId(id) 
    }
    // console.log(featuresId)

  return (
    <div>
        {
            !lugun ? "Loading" : lugun.map((element)=>{
                return(
                    <div key={element.id}>
                        <Marker longitude={element.long} latitude={element.lat} 
                        anchor="bottom" 
                        onClick={()=> handleClick(element.id)}
                        >
                            <ImLocation style={{fontSize: "30",color:element.user === localStorage.getItem('userLugun') ? "tomato" : "slateblue"}}  cursor={"pointer"}/>
                        </Marker>

                        {Array(element.id) === featuresId && (<Popup longitude={element.long} latitude={element.lat}
                            anchor="left"
                            offset={3}
                            >
                            <div className="card">
                                <h6 className="title">Title</h6>
                                <p className="title-context">{element.title}</p>
                                <h6 className="desc">Review</h6>
                                <p className="review-content">{element.review}</p>
                                <h6 className="rating">Rating</h6>
                                <div className="rating-card">
                                    {/* {Array(element.rating).fill(<BsFillStarFill  style={{color:"gold"}}/>)} */}
                                </div>
                                <p className="posted">Created by <strong>{element.user}</strong> from <strong>{element.school}</strong></p>
                            </div>
                        </Popup>)}
                    </div>
                )
            })
        }
        
      
    </div>
  )
}

export default Location
