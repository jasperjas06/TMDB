import React, { useEffect } from "react";
import { Col, Row } from "reactstrap";

const Poster = ({ id }) => {
  const [poster, setPoster] = React.useState([]);
  const [backdrop, setBackdrop] = React.useState([]);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
    },
  };
  const getPoster = async () => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/images`, options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if(response){
            setBackdrop(response?.backdrops?.slice(0,6))
            // let backdrop = response?.backdrops?.slice(0,5)
            setPoster(response?.posters?.slice(0,5))
        }
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getPoster();
    console.log(poster,"poster");
  }, []);
  return (
  <div>
  <Row>
    <Col md={6}>
    <div className="poster">
    {
        poster?.map((item,index)=>{
            return(
                <div key={index} className="posterSize">
                <img src={`http://image.tmdb.org/t/p/w500/${item?.file_path}`} alt="" />
                </div>
            )
        })
    }
    </div>
    </Col>
    <Col md={6}>
    <div className="backdrop">
    <ul>
    {
        backdrop?.map((item,index)=>{
            return(
                <div key={index} className="backdropSize">
                <img src={`http://image.tmdb.org/t/p/w500/${item?.file_path}`} alt="" />
                </div>
            )
        })
    }
    </ul>
    </div>
    </Col>
  </Row>
  </div>
  );
};

export default Poster;
