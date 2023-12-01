import React, { useEffect, useState } from 'react'
import "../../assets/css/New.css"
import axios from 'axios';
import YouTube from 'react-youtube';
const Video = ({embedId,tv,id}) => {
  
  const [video, setVideo] = useState([]);
  // const [video,setTv_vid] = useState([])
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_KEY}&append_to_response=videos`;
  const tvurl = `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`;
  const fetchData = async () => {
    try {
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
          setVideo(response.results)
        })
        .catch(err => console.error(err));
      
    } catch (error) {
      console.log(error);
    }
  }
  React.useEffect(() => {
    fetchData();
  }, [])
  // console.log(video,"video");
  return (
    <div className='Videos'>
    {
      video.map((item,index) =>{
        return (
          <YouTube videoId={item.key} />
        )
      })
    }
    </div>
  )
}

export default 


          {/* <div className="video-responsive">
            <iframe
              width="853"
              height="480"
              src={`https://www.youtube.com/embed/${item.key}`}
            //   frameBorder=
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </div> */}