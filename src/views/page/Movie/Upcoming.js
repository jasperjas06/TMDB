import React, { useEffect } from 'react'

const Upcoming = () => {
    const [data, setData] = React.useState([])
    const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
        },
      };
    const upcomingMovies = () =>{
        fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(response => response.json())
  .then(response => {
    // console.log(response)
    if(response?.results){
        setData(response?.results)
    }
})
  .catch(err => console.error(err));
    }
    useEffect(()=>{
        upcomingMovies()
    },[])
  return (
    <div className='upcoming-grid'>
      {
        data?.map((item,index)=>{
            return(
                <img src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} alt={item.title} style={{height:"400px", width:"250px"}} key={item?.id} />
            )
        })
      }
    </div>
  )
}

export default Upcoming
