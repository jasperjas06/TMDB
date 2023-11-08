import { Card, CardMedia, Container, IconButton } from "@mui/material";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import CustomModal from "components/Body/CustomModal";

const Streaming = () => {

  const [data, setData] = useState([]);
  const [open,setOpen] = useState(false)
  const [newData,setNewData]=useState({})
  // const [you_id,setYou_id] = useState("")
  let scrl = useRef(null);
  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);

  const slide = (shift) => {
    scrl.current.scrollLeft += shift;
    setscrollX(scrollX + shift);

    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  const anim = (e) => {
    gsap.from(e.target, { scale: 1 });
    gsap.to(e.target, { scale: 1.5 });
  };
  const anim2 = (e) => {
    gsap.from(e.target, { scale: 1.5 });
    gsap.to(e.target, { scale: 1 });
  };

  const scrollCheck = () => {
    setscrollX(scrl.current.scrollLeft);
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
      Accept: `application/json`,
    },
  };

  fetch(
    "https://api.themoviedb.org/3/trending/tv/day?language=en-US",
    // 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1',
    // 'https://api.themoviedb.org/3/trending/all/week?language=en-US',
    // 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc',
    options
  )
    .then((response) => response.json())
    .then((response) => 
    // console.log(response.results)
    setData(response.results)
    )
    .catch((err) => console.error(err));

    const handleOpen = ({item}) =>{
      console.log(item,"handleOpen");
      if(item){
        setOpen(true)
        setNewData(item)
      }
    }
    useEffect(()=>{

    },[open,newData])

  return(<>
    <div className="section" >
          
      <div className="App_2">
        {scrollX !== 0 && (
          <IconButton
            className="prev"
            onClick={() => slide(-500)}
            onMouseEnter={(e) => anim(e)}
            onMouseLeave={(e) => anim2(e)}
          >
            <ArrowCircleLeftIcon sx={{ color: "black" }} />
          </IconButton>
        )}
        <ul ref={scrl} onScroll={scrollCheck}>
          {data.map((item, index) => {
            return (
              <img className="slider" style={{maxWidth:"250px", padding:"10px"}} src={`http://image.tmdb.org/t/p/w500/${item.poster_path}`} alt={item.name} key={item.id} onClick={()=>handleOpen({item})}/>
            );
          })}
        </ul>
        {!scrolEnd && (
          <IconButton
            className="next"
            onClick={() => slide(+500)}
            onMouseEnter={(e) => anim(e)}
            onMouseLeave={(e) => anim2(e)}
          >
            <ArrowCircleRightIcon sx={{ color: "black" }} />
          </IconButton>
        )}
      </div>
      
    </div>
    {open && <CustomModal open={open} setOpen={setOpen} data={newData} tv={true}/>}
    </>
  );
};

export default Streaming;
