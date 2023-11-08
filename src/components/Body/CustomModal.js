import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import "../../assets/css/New.css";
import {  Card, CardMedia, Container, Grid } from "@mui/material";
import axios from "axios";
import { Header } from "./NavBarMDB";
import Video from "./Video";
// import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CustomModal = ({ open, setOpen, data, tv }) => {
  // console.log(tv,"tv");
  const [details, setDetails] = useState({});
  const [credits, setCredits] = useState([]);
  const imageURL = `https://image.tmdb.org/t/p/original${data.backdrop_path}`;
  const style = {
    width: "100%",
    height: "70vh",
    backgroundImage: `url(${imageURL})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getcredits = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
      },
    };

    if (tv === true) {
      fetch(
        `https://api.themoviedb.org/3/tv/${data.id}/credits?language=en-US`,
        options
      )
        .then((response) => response.json())
        .then((response) => setCredits(response.cast))
        .catch((err) => console.error(err));

      fetch(
        `https://api.themoviedb.org/3/tv/${data.id}?language=en-US`,
        options
      )
        .then((response) => response.json())
        .then((response) => setDetails(response))
        .catch((err) => console.error(err));
    } else {
      fetch(
        `https://api.themoviedb.org/3/movie/${data.id}/credits?language=en-US`,
        options
      )
        .then((response) => response.json())
        .then((response) => setCredits(response.cast))
        .catch((err) => console.error(err));

      fetch(`https://api.themoviedb.org/3/movie/${data.id}`, options)
        .then((response) => response.json())
        .then((response) => setDetails(response))
        .catch((err) => console.error(err));
    }
  };
  // "https://api.themoviedb.org/3/person/person_id/tv_credits?language=en-US"
  useEffect(() => {
    getcredits();

  }, []);
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Header />
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          sx={{ height: "5vh" }}
        >
          {/* <CloseIcon /> */}
        </IconButton>
        {/* <Navbars/> */}

        <div style={{ marginTop: "15px" }}>
          <div style={style}>
            <div className="inner_div">
              
              <Grid container spacing={3} >
                <Grid item xs={12}>
                  <Container
                    style={{ float: "right", margin: "10px", lineHeight: 1.6 }}
                  >
                    <Typography sx={{ fontSize: 40, fontWeight: "800" }}>
                      {data.name}
                    </Typography>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      {details.genres?.map((i, index) => {
                        return (
                          <Typography key={index}
                            sx={{ fontSize: 20, marginRight: "10px" }}
                          >
                            {i.name + ","}
                          </Typography>
                        );
                      })}
                    </div>
                    <br />
                    <Typography sx={{ fontSize: 25, fontWeight: "500" }}>
                      overview
                    </Typography>
                    <Typography sx={{ fontSize: "100%" }}>
                      {data.overview}
                    </Typography>
                  </Container>
                </Grid>

                <Grid item xs={8}>
                  <div
                    style={{ position: "relative", left: "20px" }}
                  >
                    <Card sx={{ maxWidth: "280px" }}>
                      <CardMedia
                        sx={{ height: 400, width: "280px" }}
                        image={`http://image.tmdb.org/t/p/w500/${data.poster_path}`}
                      />
                    </Card>
                  </div>
                </Grid>
                
                
                
                
              </Grid>
              <div style={{float:"right",backgroundColor:"red", width:"70vh"}}>
                <div style={{display:"flex",flexDirection:"row"}}>
                <Typography sx={{color:"black"}}>Orginal language</Typography>   
                <Typography sx={{color:"black"}}>Orginal language</Typography>   
                </div>
                <Typography sx={{color:"black"}}>Orginal language</Typography>   
                <Typography sx={{color:"black"}}>Orginal language</Typography>   
              </div>
              {
                credits ? (
                  <Container>
                  <div className="castcontiner">
                <div className="castboxmain">
                  {credits?.map((item, index) => {
                    return (
                      <div className="castbox" key={index}>
                        <div className="cast">
                          <img
                            height={"150px"}
                            width={"100%"}
                            alt={item.name}
                            src={
                              item.profile_path === null
                                ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                                : `http://image.tmdb.org/t/p/w500${item.profile_path}`
                            }
                          />
                        </div>
                        <p style={{ color: "black" }}>{item.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              </Container>
                ) 
                : (null)
              }
              

              <div>
                <Video id={data.id} tv={tv} />
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CustomModal;
