import { Typography } from '@material-ui/core'
import {  Container } from '@mui/material'
import React from 'react'
import {  useParams } from 'react-router-dom'
import "../../assets/css/New.css"
import NewNav from 'components/Navbars/NewNav'
import Review from './Tv/Review'

const OverView = () => {
    const { id, name } = useParams()
    const [tv, setTv] = React.useState([])
    const [img, setImg] = React.useState("")
    const [poster,setPoster] = React.useState("")
    const [cast,setCast] = React.useState([])
    
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
        },
    };


    const getData = () => {
        fetch(
            `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
            options
        )
            .then((response) => response.json())
            .then((response) => setTv(response))
            .catch((err) => console.error(err));

            fetch(
                `https://api.themoviedb.org/3/tv/${id}/credits?language=en-US`,
                options
              )
                .then((response) => response.json())
                .then((response) => setCast(response.cast))
                .catch((err) => console.error(err));
        if (tv) {
            setImg(`https://image.tmdb.org/t/p/original${tv?.backdrop_path}`)
            setPoster(`http://image.tmdb.org/t/p/w500/${tv?.poster_path}`)
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
        // console.log(tv,"cast");
    }, [tv])
    return (
        <>
            <NewNav/>
        
        <div className='section section-basic'>
        <div className='main'>

        
            {/* <Button onClick={() => { navigate(-1) }}>Back</Button> */}
            
            <Container >
                <h1 className="text-white">{name}</h1>
                <div style={style}>
                    <div className='over-black'>
                        
                        <div className='grid-poster'>
                            <img className='poster-img' alt={tv?.name} src={poster} />
                            <div>
                                <h1 className="text-white" style={{ fontWeight: "600", marginTop: "4rem" }}>
                                    {tv?.name} <br />
                                </h1>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                {tv.genres?.map((i, index) => {
                                    return (
                                    <b key={index}
                                        style={{ fontSize: 18}}
                                    >
                                        {"  "+ i.name +"  "}
                                    </b>
                                    );
                                })}
                                </div>
                                <p style={{fontSize:"100%"}}>{tv?.overview}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Container>
                <br/>
                <h1 className='text-white'>To Billed Cast</h1>
                <center></center>
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
                            <p>{item?.name}</p>
                            </div>
                        ) 
                    }):null}
                </div>
 
                <Container className='status'>
                <center >
                 
                    <div style={{display:"flex",maxWidth:"360px", justifyContent:"space-between"}}>
                    <h4>status :</h4><Typography style={{color:"yellow"}}>{tv?.status}</Typography>
                    </div>

                    <div style={{display:"flex",maxWidth:"360px", justifyContent:"space-between"}}>
                    <h4>original_name :</h4><Typography style={{color:"yellow"}}>{tv?.original_name}</Typography>
                    </div>

                    <div style={{display:"flex",maxWidth:"360px", justifyContent:"space-between"}}>
                    <h4>first_air_date :</h4><Typography style={{color:"yellow"}}>{tv?.first_air_date}</Typography>
                    </div>
                    <div style={{display:"flex",maxWidth:"360px", justifyContent:"space-between"}}>
                    <h4>episodes :</h4><Typography style={{color:"yellow"}}>{tv?.number_of_episodes}</Typography>
                    </div>
                    <div style={{display:"flex",maxWidth:"360px", justifyContent:"space-between"}}>
                    <h4>number_of_seasons :</h4><Typography style={{color:"yellow"}}>{tv?.number_of_seasons}</Typography>
                    </div>
                       
                </center>
                </Container>
                </div>
            </Container>

            <Container>
                {/* <Video id={id}/> */}
                <Review id={id}/>
            </Container>

            {/* <Container>
            <br/>
            <h1 className='text-white'>Production Companies</h1>
                <div>
                   {tv?.production_companies?.map((item,index)=>{
                    return(
                        <div key={item.id}>
                        <img alt={item.name} src={`http://image.tmdb.org/t/p/w500${item.logo_path}`} />
                        </div>
                    )
                   })} 
                </div>
            </Container> */}
            {/* <Footer/> */}
            </div>
        </div>
        </>
    )
}

export default OverView