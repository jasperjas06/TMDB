import { Container, Grid, Typography } from '@mui/material'
import React from 'react'
import '../../assets/css/New.css'


const BackG = ({data}) => {
    const imageURL = `https://image.tmdb.org/t/p/original${data?.backdrop_path}`
    // console.log(data,"BG");
    const style = {
        height: "75vh",
        width:"100%",
        backgroundImage: `url(${imageURL})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        zIndex:-1,
        // transform: "translate(-50%, -50%)",
        
        // position:"absoult"
      };
  return (
      <div style={style}>
        <div className='sub_box'  >

        
        <div style={{padding:'20px'}} >
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Typography sx={{fontSize:40,fontWeight:"900"}}>{data?.title}</Typography>
            <br/>
            <br/>
            {/* <Typography  >{data?.overview}</Typography> */}
            
            
        </div>
        </div>
    </div>
  )
}

export default BackG