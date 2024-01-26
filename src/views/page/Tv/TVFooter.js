import React, { useEffect } from 'react'
import { Container } from 'reactstrap';

const MovieFooter = ({data}) => {
    const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
        },
      };

      useEffect(()=>{
        console.log(data,"data");
      },[])
  return (
    <footer className="footer">
    <Container className='production'>
      {
        data?.map((item,index)=>{
          return(
            <div key={index}>
              <img src={`http://image.tmdb.org/t/p/w500/${item?.logo_path}`} alt="" className='production-img'/>
            </div>
          )
        })
      }
      </Container>
    </footer>
  )
}

export default MovieFooter
