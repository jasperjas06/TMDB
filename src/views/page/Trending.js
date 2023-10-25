import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Card, CardMedia, Container, IconButton } from "@mui/material";
import "../../assets/scss/styles.scss";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import AutoPlayer from "components/Body/AutoPlayer";
import BackG from "components/Body/BackG";
function Trending(props) {
  const [data, setData] = useState([]);
  const [bgdata,setBgdata] = useState({})
  const [id,setId]=useState("")
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

  // Get data

  const getData = async () => {
    axios
      .get("https://api.themoviedb.org/3/trending/movie/day", {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
          Accept: `application/json`,
        },
      })
      .then((res) => {
        if (res) {
          setTimeout(()=>console.log("hello jas"),3000)
          let _ids = res.data.results.map((i) => {
            return i.id;
          });
          // console.log(_ids);
          setId(_ids[0])
          setData(res.data.results);
          
        } 
        else {
          console.log("not working");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    console.log(process.env.REACT_APP_KEY);
    getData();
    setBgdata(data[0])
  }, [id]);

  const handlesend = (data) =>{
    if(data){
      setBgdata(data)
    }
  }

  return (<>
  
    <Container className="section section-basic" >
    
    <Container>
        <h2 className="title" >New Arrivals</h2>
    </Container>
    <div style={{position:'absolute',width:"100%", zIndex:-1, }}>
          {/* <AutoPlayer id={id} /> */}
          <BackG data={bgdata} />
          </div>
          <div >
      <div className="App">
        {scrollX !== 0 && (
          <IconButton
            className="prev"
            onClick={() => slide(-500)}
            onMouseEnter={(e) => anim(e)}
            onMouseLeave={(e) => anim2(e)}
          >
            <ArrowCircleLeftIcon sx={{ color: "white" }} />
          </IconButton>
        )}
        <ul ref={scrl} onScroll={scrollCheck}>
          {data.map((item, index) => {
            return (
              <div className="slider" key={item.id} onClick={()=>handlesend(item)}>
                <Card sx={{ height: "100%", maxWidth: "200px" }}>
                  <CardMedia
                    sx={{ height: 270, width: "200px" }}
                    image={`http://image.tmdb.org/t/p/w500/${item.poster_path}`}
                  />
                </Card>
              </div>
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
            <ArrowCircleRightIcon sx={{ color: "white" }} />
          </IconButton>
        )}
      </div>
      </div>
    </Container>
    </>
  );
}

export default Trending;
