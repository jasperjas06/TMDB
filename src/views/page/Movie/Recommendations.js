
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Recommendations = ({id,name}) => {
    const [data,setData] = useState([])
    const [req,setReq] = useState(true)
    const navigate = useNavigate()
    
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
        },
    };

    useEffect(()=>{
      fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`, options)
      .then(response => response.json())
      .then(response => {
        if (response.results.length > 0) {
          // console.log(response);
          setData(response.results);
        }
        else{
          // setData(null)
          setReq(false)
        }
      })
      .catch(err => console.error(err));
},[id,name])
    // console.log(name);
  return (
    <>
      {
        req === false ? (
          <div>
            <h5 style={{color:"black"}}>{`We don't have enough data to suggest any movies based on ${name}You can help by rating movies you've seen.`}</h5>
          </div>
        ):(
          <div className='scroller'>
      <div className='recommendations'>
      {data?.map((item,index)=>{
        return(
          <>
                <img key={index} title={item.title} src={`http://image.tmdb.org/t/p/w500${item.backdrop_path}`} className='rec_img' alt={item.title} onClick={()=>{navigate(`/recommendation/${item?.id}/${item?.title}`)}} />
                {/* <p>{item.title}</p> */}
                </>
            )
      })}
    </div>
    </div>
        )
        
      }
    </>
  )
}

export default Recommendations
 {/* <div key={index}> */}
                {/* <h3>{item.title}</h3> */}
            {/* </div> */}