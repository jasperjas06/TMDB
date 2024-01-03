import React, { useEffect } from "react";

const Review = ({id}) => {
  useEffect(() => {
    const options = { method: "GET", 
    headers: {
        Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
        Accept: `application/json`,
      }, };

    fetch(
      `https://api.themoviedb.org/3/tv/${id}/reviews?language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  },[]);
  return <div></div>;
};

export default Review;
