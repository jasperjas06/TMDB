import { Header } from 'components/Body/NavBarMDB'
import React from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

const OverView = () => {
    const { id, name } = useParams()
    const [movie, setMovie] = React.useState([])
    const [tv, setTv] = React.useState([])
    const [img, setImg] = React.useState("")
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
        },
    };
    

    const getData = () =>{
        fetch(
            `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
            options
        )
            .then((response) => response.json())
            .then((response) => setTv(response))
            .catch((err) => console.error(err));
            
        fetch(
            `https://api.themoviedb.org/3/movie/${id}`,
            options
        )
            .then((response) => response.json())
            .then((response) => setMovie(response))
            .catch((err) => console.error(err));

        if(tv){
            setImg(`https://image.tmdb.org/t/p/original${tv?.backdrop_path}`)
        }
        else{
            setImg(`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`)
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

    React.useEffect(()=>{
        getData()
    },[tv, movie])
    return (
        <div>
            <div style={{position:"fixed",width:"100%"}}>
            <Header />
            </div>
            <br/>
            
            <Container style={{paddingTop:"5rem"}}>
                <div style={style}>
                    <div style={{ width:"100%",height: "70vh"}}>

                    </div>
                </div>
            </Container>
            <h1>
                OverView
            </h1>
            <h2>{id}</h2>
            <h2>{name}</h2>
        </div>
    )
}

export default OverView