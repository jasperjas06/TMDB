/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
    Container,
    Typography,
  } from "@mui/material";
  import React from "react";
  import { useNavigate, useParams } from "react-router-dom";
  import "../../../assets/css/New.css";
  import {  Col, Row } from "reactstrap";
  import Review from "./Review";
  import YoutubeEmbed from "./Trailer";
  import Keywords from "./Keywords";
  import Recommendations from "./Recommendations";
  import NewNav from "components/Navbars/NewNav";
  import Collection from "./Collection";
  import Video from "./Video";
  import Poster from "./Poster";
  import MovieFooter from "./MovieFooter";
  import moment from "moment";
  
  const RecomOverView = () => {
    // const key = setLocalStorage.getItem("key")
    const { id, name } = useParams();
    const [data, setData] = React.useState([]);
    const [movieName, setMovieName] = React.useState("");
    const [img, setImg] = React.useState("");
    const [poster, setPoster] = React.useState("");
    const [production, setProduction] = React.useState([]);
    const [cast, setCast] = React.useState([]);
    const [year, setYear] = React.useState("");
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
      },
    };
  
    const getData = () => {
      fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
        .then((response) => response.json())
        .then((response) => setData(response))
        .catch((err) => console.error(err));
  
      fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
        options
      )
        .then((response) => response.json())
        .then((response) => setCast(response.cast))
        .catch((err) => console.error(err));
      if (data?.backdrop_path && data?.poster_path) {
        setImg(`https://image.tmdb.org/t/p/original${data?.backdrop_path}`);
        setPoster(`http://image.tmdb.org/t/p/w500/${data?.poster_path}`);
      }
    };
  
    const style = {
      width: "100%",
      height: "70vh",
      backgroundImage: `url(${img})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    };
  
    React.useEffect(() => {
      getData();
      if (data) {
        // console.log(data);
        setMovieName(data?.title);
        setProduction(data?.production_companies);
        let date = data?.release_date;
        setYear(moment(date).format("YYYY"));
      }
    }, [data]);
    return (
      <>
      <div className="section section-basic">
        <NewNav />
        <div>
          <div style={style}>
            <div className="over-black">
              <div className="grid-poster">
                <Row>
                  <Col>
                    <img className="poster-img" alt={data?.name} src={poster} />
                  </Col>
                  <Col md={8}>
                    <div style={{ padding: "10px" }}>
                      <h2
                        className="H28"
                        style={{ fontWeight: "700", marginTop: "4rem" }}
                      >
                        {name} <br />
                      </h2>
                      <div>
                        <div style={{ display: "flex" }}>
                          <Typography>{`(${year})`}</Typography>
                          <div>
                            <div
                              style={{ display: "flex", flexDirection: "row" }}
                            >
                              {data.genres?.map((i, index) => {
                                return (
                                  <b
                                    key={index}
                                    style={{
                                      fontSize: 15,
                                      paddingRight: "5px",
                                      color: "white",
                                    }}
                                  >
                                    {i.name}
                                  </b>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
  
                      </div>
                      <br/>
                      <i style={{fontSize:"1rem", color:"white"}}>{data?.tagline}</i>
                      <br/>
                      <Typography sx={{fontSize: 15,marginTop:"10px",color:"white"}}>Over view</Typography>
                      <p style={{ fontSize: "0.8rem" }}>{data?.overview}</p>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
        <div className="main">
          <div style={{ backgroundColor: "whitesmoke", marginTop: "0px" }}>
            <Container>
              <br />
              <h2 className="" id="topcast" style={{ color: "black", fontWeight: "700" }}>
                To Billed Cast
              </h2>
              <center></center>
              <Row>
                <Col md={10}>
                  <div className="cast-container">
                    <div className="cast-box">
                      {cast
                        ? cast.map((item, index) => {
                            return (
                              <div key={index}>
                                <img
                                  height={"150px"}
                                  width={"100px"}
                                  alt={item.name}
                                  src={
                                    item.profile_path === null
                                      ? `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png`
                                      : `http://image.tmdb.org/t/p/w500${item.profile_path}`
                                  }
                                />
                                <p style={{ color: "black" }}>{item?.name}</p>
                              </div>
                            );
                          })
                        : null}
                    </div>
                  </div>
                </Col>
                <Col md={2}>
                  <div>
                    <b style={{ color: "black" }}>status</b>
                    <p style={{ color: "black" }}>{data?.status}</p>
                  </div>
                  <div>
                    <b style={{ color: "black" }}>original_name</b>
                    <p style={{ color: "black" }}>{data?.original_title}</p>
                  </div>
                  <div>
                    <b style={{ color: "black" }}>relase data</b>
                    <p style={{ color: "black" }}>{data?.release_date}</p>
                  </div>
                  <div>
                    <b style={{ color: "black" }}>average vote</b>
                    <p style={{ color: "black" }}>{data?.vote_average}</p>
                  </div>
                </Col>
              </Row>
            </Container>
  
            <Container>
              <br />
              <h2 id="trailer" className="" style={{ color: "black", fontWeight: "700" }}>
                Official Trailer
              </h2>
              <Container>
                <Row>
                  <Col md={6}>
                    <YoutubeEmbed embedId={id} />
                  </Col>
                  <Col md={6}>
                    <Container>
                      <b style={{ color: "black", padding: "20px" }}>Key words</b>
                      <br />
                      <Keywords id={id} />
                    </Container>
                  </Col>
                </Row>
              </Container>
            </Container>
            <br />
            <Container>
            {
              data?.belongs_to_collection !== null ?(
              <Collection id={id} />
              ): null
            }
            </Container>
            <br />
            <Container>
              <h2 id="recommen" className="" style={{ color: "black", fontWeight: "700" }}>
                Recommendations
              </h2>
              <Recommendations id={id} name={movieName} />
            </Container>
            <br />
            <Container>
              <h2 className="" style={{ color: "black", fontWeight: "700" }}>
                Reviews
              </h2>
              <Review id={id} />
            </Container>
            <br />
            <Container>
              <h2 className="" id="media" style={{ color: "black", fontWeight: "700" }}>
                Media
              </h2>
              {/* <Container>
                <Row>
                  <BottomNavigation
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    showLabels
                    className="bottom-nav"
                    sx={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
                  >
                    <BottomNavigationAction
                      sx={{ color: "black", fontWeight: "700", fontSize: "20px" }}
                      label="Poster"
                    />
                    <BottomNavigationAction
                      sx={{ color: "black", fontWeight: "700", fontSize: "20px" }}
                      label="Video"
                    />
                  </BottomNavigation>
                </Row>
              </Container> */}
              <div>
                    <Poster id={id} />
                    <Video id={id} />
                
              </div>
            </Container>
          </div>
          <br />
          {/* white screen end */}
        </div>
        <Container className="production_company">
      <center>
      <h2 className="" id="media" style={{ color: "white", fontWeight: "700" }}>
              Production Companies
            </h2>
      </center>
      <br/>
      <ul>
        {data.production_companies?.map((item,index)=>{
          return(
            <li key={index}>
              <img src={`http://image.tmdb.org/t/p/w500${item.logo_path}`} alt={item?.name}/>
            </li>
          )
        })}
        </ul>
        
      </Container>
      </div>
        <MovieFooter />
        </>
    );
  };
  
  export default RecomOverView;
  