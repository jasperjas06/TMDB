import React, { useEffect, useState } from 'react'
import '../.../../../../assets/css/New.css' 
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
        fetch(`https://api.themoviedb.org/3/tv/${id}/keywords`, options)
  .then(response => response.json())
  .then(response => { 
    // console.log(response);
    setData(response.results)})
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