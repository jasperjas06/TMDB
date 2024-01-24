import { Container, Grid, Typography } from '@mui/material'
import React from 'react'
import '../../assets/css/New.css'
import { useNavigate } from 'react-router-dom'


const BackG = ({data}) => {
  const navigate = useNavigate();
    const imageURL = `https://image.tmdb.org/t/p/original${data?.backdrop_path}`
    const handlesend = ({data}) =>{
      // console.log(data);
      if(data){
        navigate(`/Movie/${data.id}/${data.title}`)
      }
    }
    // console.log(data,"BG");
    const style = {
        height: "75vh",
        width:"100%",
        backgroundImage: `url(${imageURL})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        // zIndex:-1,
        transition: 'all 0.5s ease',
        backfaceVisibility: 'hidden',
        // opacity:1,
        // display:'block',
        // transform: "translate(-50%, -50%)",
        
        // position:"absoult"
      };
  return (
    <div className='container-bg'>
      <div style={style} className='images-bg' >
        <div className='sub_box' onClick={()=>handlesend({data})} >

        <img src={require("assets/img/share.png")} className='open-img' alt='open' onClick={()=>handlesend({data})}/>
        <div style={{padding:'20px'}} className='middle'>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <p  className='text'>{data?.title}</p>
            <br/>
            <br/>
            {/* <Typography  >{data?.overview}</Typography> */}
            
            
        </div>
        </div>
    </div>
    </div>
  )
}

export default BackG