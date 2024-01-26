import React, { useEffect, useState } from 'react'
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import '../../../assets/css/New.css'
// const YoutubeEmbed  = ({embedId}) => {
//     const [key,setKey] = useState("")
//     const options = {
//         method: "GET",
//         headers: {
//             accept: "application/json",
//             Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
//         },
//     };

//     useEffect(()=>{
//         fetch(`https://api.themoviedb.org/3/movie/${embedId}/videos?language=en-US`, options)
//   .then(response => response.json())
//   .then(response => {
//     console.log(response.results)
//     if(response?.results){
//         response?.results.filter((item,index)=>{
//             // console.log(item.name);
//             if(item.name === "Official Trailer"){
//                 setKey(item.key)
//                 // console.log(item);
//             }
//         })
//     }
//     // setKey(response.results[0].key)
//   })
//   .catch(err => console.error(err));
//     },[])
//   return (
//     <div className="video-responsive">
//     <iframe
//       width="853"
//       height="480"
//       src={`https://www.youtube.com/embed/${key}`}
//       frameBorder="0"
//       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//       allowFullScreen
//       title="Embedded youtube"
//     />
//   </div>
//   )
// }
const YoutubeEmbed  = ({embedId}) => {
    const [key,setKey] = useState("")
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
            },
        };
    
        useEffect(()=>{
            fetch(`https://api.themoviedb.org/3/tv/${embedId}/videos?language=en-US`, options)
      .then(response => response.json())
      .then(response => {
        console.log(response.results)
        if(response?.results){
            response?.results.filter((item,index)=>{
                // console.log(item.name);
                if(item.name === "Official Trailer" || item.name === "Trailer" || item.name === "Teaser" || item.name === "Official Teaser" || item.name === "Official Trailer [Subtitled]"){
                    setKey(item.key)
                    // console.log(item);
                }
            })
        }
        // setKey(response.results[0].key)
      })
      .catch(err => console.error(err));
        },[])
    return(
        <div>
    <LiteYouTubeEmbed 
        id={key}
        // title="What’s new in Material Design for the web (Chrome Dev Summit 2019)"
    />
  </div>
    )
}

export default YoutubeEmbed 
