import {  Container } from "@mui/material";
import React, { useState } from "react";
import { Button } from "reactstrap";
import '../../assets/css/New.css'
const Geners = () => {
  const [genres, setGenres] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjBiZjYxOWI5NDllNGIxMzgxM2ZjMzNiNjJkOGQ0MCIsInN1YiI6IjY0YjY5NzY0MGU0ZmM4NTE5ZmVjZGZjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RnpeI4IW-C-aM6r1bWkbuYIxlOwU7aW8GIppkb9kAr0",
    },
  };

  fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options)
    .then((response) => response.json())
    .then((response) => setGenres(response.genres))
    .catch((err) => console.error(err));
  return (
    <>
    <div className="section section-javascript" id="javascriptComponents">
        {/* <img alt="..." className="path" src={require("assets/img/path5.png")} />
      <img
        alt="..."
        className="path path1"
        src={require("assets/img/path5.png")}
      /> */}
        <Container>
        <h2 className="title">
              Geners
            </h2>
        
        <div className="genres">
        
        {genres.map((item, index) => {
            
          return (
            <Button color="success" key={item.id}>
              {item.name}
            </Button>
          );
        })}
        
        </div>
        </Container>
    </div>
    {
      
    }
    </>
  );
};

export default Geners;
