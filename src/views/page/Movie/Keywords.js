import React, { useEffect, useState } from 'react'
import '../.../../../../assets/css/New.css' 
import { Button } from 'reactstrap';
const Keywords = ({id}) => {
    // console.log(id,"id");
    const [data,setData] = useState([])
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
        },
    };

    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/${id}/keywords`, options)
  .then(response => response.json())
  .then(response => setData(response.keywords))
  .catch(err => console.error(err));
    },[])
  return (
    <div className='keywords' >
    <ul>
    {data.map((item,index)=>{
        return(
            <li key={index}>
            <a style={{color:"black"}}>
            {item.name}
            </a>
            </li>
            
        )
    })}
    </ul>
    </div>
  )
}

export default Keywords
{/* <Button disabled>
                <p style={{fontSize:"10px"}}>{item.name}</p>
            </Button> */}