import React, { useState } from 'react'
import "../../assets/css/New.css"
import axios from 'axios';
const Video = ({embedId,tv,id}) => {
  
  const [video, setVideo] = useState({});
  const [tv_vid,setTv_vid] = useState([])
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_KEY}&append_to_response=videos`;
  const tvurl = `'https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`;
  const fetchData = async () => {
    try {
      if(tv === true){
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjBiZjYxOWI5NDllNGIxMzgxM2ZjMzNiNjJkOGQ0MCIsInN1YiI6IjY0YjY5NzY0MGU0ZmM4NTE5ZmVjZGZjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RnpeI4IW-C-aM6r1bWkbuYIxlOwU7aW8GIppkb9kAr0'
          }
        };
        
        fetch(tvurl, options)
          .then(response => response.json())
          .then(response => {
            // console.log(response.results)
            setTv_vid(response.results)
          })
          .catch(err => console.error(err));
      }else{
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
            // setTrail(true);
            console.log(video,"video");
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
      }
      
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="video-responsive">
    <iframe
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${embedId}`}
    //   frameBorder=
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
  )
}

export default Video