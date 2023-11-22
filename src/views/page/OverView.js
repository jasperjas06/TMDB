import { Typography } from '@material-ui/core'
import { Box, Container, Grid } from '@mui/material'
import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import "../../assets/css/New.css"

const OverView = () => {
    const { id, name } = useParams()
    const [tv, setTv] = React.useState([])
    const [img, setImg] = React.useState("")
    const [poster,setPoster] = React.useState("")
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
            `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
            options
        )
            .then((response) => response.json())
            .then((response) => setTv(response))
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
    }, [tv])
    return (
        <div>
            <Button onClick={() => { navigate(-1) }}>Back</Button>
            <div >
                <div style={style}>
                    <div className='over-black'>
                        
                        <div className='grid-poster'>
                            <img className='poster-img' alt={tv?.name} src={poster} />
                            <div>
                                <h1 className="text-white" style={{ fontWeight: "600", marginTop: "4rem" }}>
                                    {tv?.name} <br />
                                </h1>
                                <Box style={{ display: "flex", flexDirection: "row" }}>
                                {tv.genres?.map((i, index) => {
                                    return (
                                    <p key={index}
                                        style={{ fontSize: 20}}
                                    >
                                        {"  "+ i.name +"  "}
                                    </p>
                                    );
                                })}
                                </Box>
                                <p style={{fontSize:"100%"}}>{tv?.overview}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h1>
                OverView
            </h1>
            <h2>{id}</h2>
            <h2>{name}</h2>
        </div>
    )
}

export default OverView