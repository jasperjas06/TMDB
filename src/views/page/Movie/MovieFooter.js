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
    <footer className="bg-body-tertiary text-center text-lg-start">
  
  <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
    © 2020 Copyright:
    <a class="text-body" href="https://mdbootstrap.com/">MDBootstrap.com</a>
  </div>
  
</footer>
  )
}

export default MovieFooter
