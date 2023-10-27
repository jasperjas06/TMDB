import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import "../../assets/css/New.css";
import { Card, CardMedia, Container, Grid } from "@mui/material";
import axios from "axios";
import { Col, Row } from "reactstrap";
import Navbars from "views/IndexSections/Navbars";
import { HomeNav } from "./NavBarMDB";
// import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CustomModal = ({ open, setOpen, data,tv }) => {
  // console.log(tv,"tv");
  const [details, setDetails] = useState({});
  const [credits, setCredits] = useState([]);
  const [trail, setTrail] = useState(false);
  const [video, setVideo] = useState({});
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
  const url = `https://api.themoviedb.org/3/movie/${data.id}?api_key=${process.env.REACT_APP_KEY}&append_to_response=videos`;
  const fetchData = async () => {
    try {
      await axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
            Accept: `application/json`,
          },
        })
        .then((res) => {
          if (res.data) {
            const Video = res.data.videos.results;
            setTrail(true);
            Video?.map((item, index) => {
              if (
                item.name === "Official Trailer" ||
                item.name === "Official US Trailer"
              ) {
                return setVideo(item);
              } else {
                return setVideo(Video[0]);
              }
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getcredits = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
      },
    };

    if(tv === true){
      fetch(
        `https://api.themoviedb.org/3/tv/${data.id}/credits?language=en-US`,
        options
      )
        .then((response) => response.json())
        .then((response) => setCredits(response.cast))
        .catch((err) => console.error(err));
  
      fetch(`https://api.themoviedb.org/3/tv/${data.id}?language=en-US`, options)
        .then((response) => response.json())
        .then((response) => setDetails(response))
        .catch((err) => console.error(err));
    }else{
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
    console.log(details, "d");

    getcredits();
  }, [, video]);
  return (
    <div>
      
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        >
        
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        {/* <Navbars/> */}
        <HomeNav/>
        <div style={{marginTop:"15px"}}>
          <div style={style}>
            <div className="inner_div">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Container
                    style={{ float: "right", margin:"10px", lineHeight:1.6}}
                  >
                    <Typography sx={{fontSize:40, fontWeight:"800"}}>{data.name}</Typography>
                    <div style={{display:"flex", flexDirection:"row"}}>
                    {
                      details.genres?.map((i,index)=>{
                        return(
                          
                            <Typography sx={{fontSize:20,marginRight:"10px"}}>{i.name+","}</Typography>
                          
                        )
                      })
                    }
                    </div>
                    <br/>
                    <Typography sx={{fontSize:25, fontWeight:"500"}}>overview</Typography>
                    <Typography sx={{fontSize:20}}>{data.overview}</Typography>
                  </Container>
                </Grid>

                <Grid item xs={8}>
                  <div
                    style={{ position: "relative", top: "100px", left: "60px" }}
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
            </div>

            <Card sx={{ maxWidth: "280px" }}>
              <CardMedia
                sx={{ height: 400, width: "280px" }}
                image={`http://image.tmdb.org/t/p/w500/${data.poster_path}`}
              />
            </Card>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CustomModal;
