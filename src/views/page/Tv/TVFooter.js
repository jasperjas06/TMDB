/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Container } from 'reactstrap';

const TvFooter = ({data}) => {
    const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
        },
      };

      // useEffect(()=>{
      //   console.log(data,"data");
      // },[])
  return (
    <footer className="bg-body-tertiary text-center text-lg-start">
  
  <div >
          © {new Date().getFullYear()}, Designed &{" "}
          
           Coded by{" "}
          <a
            href="https://personal-portfolio-ruddy-two.vercel.app/index"
            target="_blank" rel="noreferrer"
            
          >
            Jasper P
          </a>
          .
        </div>
  
</footer>
  )
}

export default TvFooter
