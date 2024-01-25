import React, { useEffect } from "react";
import { Col, Row } from "reactstrap";

const Poster = ({ id }) => {
  const [poster, setPoster] = React.useState([]);
  const [backdrop, setBackdrop] = React.useState([]);
  const [data, setData] = React.useState([]);
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
        if(response){
            setBackdrop(response?.backdrops?.slice(0,10))
            let backdropimg = [...response?.posters?.slice(0,10), ...response?.backdrops?.slice(0,6) ]
            
            setData(backdropimg)
            setPoster(response?.posters?.slice(0,10))
        }
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getPoster();
    console.log(data,"data");
  }, []);
  return (
  <div>
  <Row>
    <Col md={6}>
    <div className="scroller">
    <ul className="poster">
    {
        poster?.map((item,index)=>{
            return(
                
                <img key={index} className="posterSize" src={`http://image.tmdb.org/t/p/w500/${item?.file_path}`} alt="" />
                
            )
        })
    }
    </ul>
    </div>
    </Col>
    <Col md={6}>
    <div  className="scroller">
    <ul className="backdrop">
    {
        backdrop?.map((item,index)=>{
            return(
                
                <img key={index} className="backdropSize" src={`http://image.tmdb.org/t/p/w500/${item?.file_path}`} alt="" />
                
            )
        })
    }
    </ul>
    </div>
    </Col>
    {/* <div className="allposters">
      <ul>
        {data?.map((item, index) => {
          return (
            <li key={index}>
              <img
                className="posterSize"
                src={`http://image.tmdb.org/t/p/w500/${item?.file_path}`}
                alt=""
              />
            </li>
          );
        })}
      </ul>
    </div> */}
  </Row>
  </div>
  );
};

export default Poster;
