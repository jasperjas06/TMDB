/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-operators */
import React, { useEffect, useState } from "react";
import "../../../assets/css/New.css";
import {  Card, CardContent, CardHeader } from "@mui/material";
import ReadMoreAndLess from 'react-read-more-less';

const Review = ({ id }) => {
  const [data, setData] = useState({});
  let [content, setContent] = useState("");
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${id}/reviews?language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => { 
        // console.log(response,"response");
      if(response.results.length > 0){
        setData(response.results[0])
        setContent(response.results[0]?.content) 
      }else{
        setData(response.results)
      }

      })
      .catch((err) => console.error(err));

      // console.log(content,"content");
  }, [id,content]);
// console.log(data.content,"data");
  return (
    <div>
      <div className="review">
        <Card>
          <CardHeader
          avatar={
          // <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
          //   R
          // </Avatar>
          <img src={`https://ui-avatars.com/api/?name=${data?.author_details?.name}`} alt={data?.author_details?.name} />
        }
        title={data?.author_details?.name}
        subheader={data?.author_details?.username}>
            <h2 style={{color:"black"}}>{data?.author}</h2>
          </CardHeader>
          <CardContent>
          <ReadMoreAndLess
                // ref={this.ReadMore}
                className="read-more-content"
                charLimit={250}
                readMoreText="Read more"
                readLessText="Read less"
            >
                {content? `${content}` : "No Review" }
            </ReadMoreAndLess>
          {/* <ReactReadMoreReadLess
                charLimit={200}
                readMoreText={"Read more ▼"}
                readLessText={"Read less ▲"}
                readMoreClassName="read-more-less--more"
        readLessClassName="read-more-less--less"
            >
                {content}
            </ReactReadMoreReadLess> */}
          {/* <i>{content}</i> */}
          {/* <ReadMoreReact text={content} min={80} ideal={200} max={300} readMoreText="read more"></ReadMoreReact> */}
          </CardContent>
          <div style={{padding:"20px", float:"right",cursor:"pointer"}}>
          <b style={{fontSize:"15px"}}>Read all</b>
        </div>
        </Card>
        
      </div>
    </div>
  );
};

export default Review;
