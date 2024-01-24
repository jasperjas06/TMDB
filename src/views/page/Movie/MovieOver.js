
import {  BottomNavigation, BottomNavigationAction, Container } from '@mui/material'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "../../../assets/css/New.css"
import { Col, Row } from 'reactstrap'
import Review from './Review'
import YoutubeEmbed from './Trailer'
import Keywords from './Keywords'
import Recommendations from './Recommendations'
import NewNav from 'components/Navbars/NewNav'
import Collection from './Collection'
import Video from './Video'
import Poster from './Poster'

const MovieOverview = () => {
    // const key = setLocalStorage.getItem("key")
    const { id, name } = useParams()
    const [data, setData] = React.useState([])
    const [movieName,setMovieName] = React.useState("")
    const [img, setImg] = React.useState("")
    const [poster,setPoster] = React.useState("")
    const [cast,setCast] = React.useState([])
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate()
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
        },
    };


    const getData = () => {
        fetch(
            `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
            options
        )
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
            setImg(`https://image.tmdb.org/t/p/original${data?.backdrop_path}`)
            setPoster(`http://image.tmdb.org/t/p/w500/${data?.poster_path}`)
        }

    }


    const style = {
        width: "100%",
        height: "70vh",
        backgroundImage: `url(${img})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    };

    React.useEffect(() => {
        getData()
        if(data){
            // console.log(data);
            setMovieName(data?.title)
        }
    }, [data])
    return (
        <>
            {/* <NewNav/> */}
        
        <div className='section section-basic'>
        <div className='main'>
            
            <Container >
                <h1 style={{fontSize:"40px",fontWeight:"900"}}>{name}</h1>
                <div style={style}>
                    <div className='over-black'>
                        
                        <div className='grid-poster'>
                            <img className='poster-img' alt={data?.name} src={poster} />
                            <div>
                                <h1 className="text-white" style={{ fontWeight: "600", marginTop: "4rem" }}>
                                    {data?.name} <br />
                                </h1>
                                <div style={{ display: "flex", flexDirection: "row" ,}}>
                                {data.genres?.map((i, index) => {
                                    return (
                                        
                                    <b  key={index}
                                        style={{ fontSize: 18, paddingRight:'5px', color:"white"}}
                                    >
                                        {i.name }
                                    </b>
                                    
                                    );
                                })}
                                </div>
                                <p style={{fontSize:"100%"}}>{data?.overview}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <div style={{backgroundColor:"whitesmoke",marginTop:"10px"}}>
            <Container>
                <br/>
                <h2 className='' style={{color:"black",fontWeight:"700"}}>To Billed Cast</h2>
                <center></center>
                <Row>
                <Col md={10}>
                <div className='cast-container'>
                <div className='cast-box'>
                    {cast ? cast.map((item,index)=>{
                        return(
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
                            <p style={{color:"black"}}>{item?.name}</p>
                            </div>
                        ) 
                    }):null}
                </div>
                </div>
                </Col>
                <Col md={2}>
                <div>
                    <b style={{color:"black"}}>status</b>
                    <p style={{color:"black"}}>{data?.status}</p>
                </div>
                <div>
                    <b style={{color:"black"}}>original_name</b>
                    <p style={{color:"black"}}>{data?.original_title}</p>
                </div>
                <div>
                    <b style={{color:"black"}}>relase data</b>
                    <p style={{color:"black"}}>{data?.release_date}</p>
                </div>
                <div>
                    <b style={{color:"black"}}>average vote</b>
                    <p style={{color:"black"}}>{data?.vote_average}</p>
                </div>
                </Col>
                </Row>
            </Container>

            <Container>
            <br/>
            <h2 className='' style={{color:"black",fontWeight:"700"}}>Official Trailer</h2>
            <Container>
            <Row>
            <Col md={6}>

            <YoutubeEmbed embedId={id}/>
            </Col>
            <Col md={6}>
            <Container>
            <b style={{color:"black", padding:"20px"}}>Key words</b>
            <br/>
                <Keywords id={id}/>
            </Container>
            </Col>
            </Row>
            </Container>
            </Container>
            <br/>
            <Container>
                <Collection id={id} />
            </Container>   
            <br/>
            <Container>
            <h2 className='' style={{color:"black",fontWeight:"700"}}>Recommendations</h2>
            <Recommendations id={id} name={movieName}/>
            </Container>  
            <br/>
            <Container>
            <h2 className='' style={{color:"black",fontWeight:"700"}}>Reviews</h2>
                <Review id={id}/>
            </Container>
            

            <br/>
            </div>
            {/* white screen end */}
            <br/>
            <Container>
            <h2 className='' style={{color:"white",fontWeight:"700"}}>Media</h2>
            <Container>
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
            sx={{color:"white",fontWeight:"700",fontSize:"20px"}}
              label="Poster"
            
            />
            <BottomNavigationAction sx={{color:"white",fontWeight:"700",fontSize:"20px"}} label="Video"  
            
             />
          </BottomNavigation>
                </Row>
            </Container>
            <div>
            {
            value === 0 ? (
              <div>
                <Poster id={id}/>
              </div>
            ) : (
              <div>
                <Video id={id}/>
              </div>
            )
          }
            </div>
            </Container>
            
            </div>
        </div>
        </>
    )
}

export default MovieOverview