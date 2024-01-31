/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-operators */
import { Movie, Tv, Visibility } from "@mui/icons-material";
import {
  BottomNavigation,
  BottomNavigationAction,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React from "react";
import { Button, Container } from "reactstrap";
import SearchIcon from "@mui/icons-material/Search";
import "../../assets/css/New.css";
import MovieSearch from "./Search/Movie";
import TvSearch from "./Search/Tv";
import { Router, useNavigate } from "react-router-dom";

const Search = () => {
  const [value, setValue] = React.useState(0);
  const [search,setSearch] = React.useState("");
  const navigate = useNavigate();
  // console.log(value);
  return (
    <div style={{ padding: "20px" }}>
        <Button onClick={()=>navigate(-1)}>Back</Button>
      <Container>
        <Container>
        {/* <h1>Search</h1> */}
        </Container>

        <Container>
          <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
            <InputLabel
              htmlFor="outlined-adornment-password"
              sx={{ color: "white" }}
            >
              Search
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="text"
              sx={{ color: "white" }}
              onChange={(e)=>setSearch(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    <SearchIcon color="black" sx={{ color: "black" }} />
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </Container>
        <Container>
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
            sx={{color:"white"}}
              label="Movie"
              icon={<Movie color="white" sx={{ color: "white" }} />}
            />
            <BottomNavigationAction sx={{color:"white"}} label="TV"  icon={<Tv sx={{ color: "white" }}/>} />
            {/* <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} /> */}
          </BottomNavigation>
        </Container>

        <Container>
          {
            value === 0 ? (
              <Container>
                {/* <h1>Movie</h1> */}
                <MovieSearch search={search}/>
                {/* <div><h5>there is no limits to find who you realy are!</h5></div> */}
              </Container>
            ) : (
              <Container>
                {/* <h1>Tv&Series</h1> */}
                <TvSearch search={search}/>
              </Container>
            )
            // <Container>
            //   <h1>Movie</h1>
            // </Container>
          }
        </Container>
      </Container>
    </div>
  );
};

export default Search;
