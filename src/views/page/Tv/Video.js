/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
// import YoutubeEmbed from "components/Body/Video";
import React, { useEffect } from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import { Col } from "reactstrap";
const Video = ({ id }) => {
  const [data, setData] = React.useState([]);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
    },
  };
  const getVideos = async () => {
    fetch(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        // console.log(response, "response");
        if (response?.results.length > 0) {
          setData(response?.results);
        }
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getVideos();
    // console.log(data,"vid");
  }, [id]);
  return (
    <div className="movie_media_vid">
    <div className="scroller">
    <div className="movievideos">
      {data?.map((item, index) => {
        return (
            <Col md={6} key={item?.id}>
            <LiteYouTubeEmbed id={item?.key}  />
            </Col>
          
          
        );
      })}
    </div>
    </div>
    </div>
  );
};

export default Video;
