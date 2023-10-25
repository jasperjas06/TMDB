import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import "../../assets/css/New.css"
import YouTube from 'react-youtube'
import Video from './Video'
const AutoPlayer = ({id}) => {
  // let id = props
  const [data,setData] = useState({})
  const getVid = () =>{
    console.log(id,"inside");
}
  console.log(id,"id from vid");
    const opts = {
        height: '590',
        width: '100%',
        playerVars: {
          autoplay: 1,
        },
      };

   
        // getVid()
        if(id){
          const options = {
            method: "GET",
            headers: { 
              Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
              Accept: `application/json`,
             },
          };
      
          fetch(
            `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
            options
          )
            .then((response) => response.json())
            .then((response) => {
              let video = response.results.filter((i)=>{
                if(i.name === "Official Trailer"){
                  return i
                }
              })
              console.log(data,"video");
              setData(video)
            } 
            )
            .catch((err) => console.error(err));
        }

  return (
    <div className='auto_main'>
        <Video embedId={data.key} />
    </div>
  )
}

export default AutoPlayer