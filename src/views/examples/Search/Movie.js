import React, { useEffect } from 'react'
import { Container } from 'reactstrap';
import "../../../assets/css/New.css";
import { useNavigate } from 'react-router-dom';

const MovieSearch = ({search}) => {
    const [data,setData] = React.useState([])
    console.log(search);
    const navigate = useNavigate()
    const handleOpen = ({item}) =>{
        console.log(item,"item");
        if(item?.title && item?.id){

            navigate(`/Movie/${item?.id}/${item?.title}`)
        }
    }
    useEffect(()=>{
      // console.log(search,"search");
      let local_data = JSON.stringify(localStorage.getItem("search")) 
      let time_token = localStorage.getItem("search_token")
      let date = new Date()
      let expry =date.getHours()+ "" +date.getMinutes()
      if(search){
        let local5 = search
        localStorage.setItem("search",local5)
        localStorage.setItem("search_token",expry)
      }

        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjBiZjYxOWI5NDllNGIxMzgxM2ZjMzNiNjJkOGQ0MCIsInN1YiI6IjY0YjY5NzY0MGU0ZmM4NTE5ZmVjZGZjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RnpeI4IW-C-aM6r1bWkbuYIxlOwU7aW8GIppkb9kAr0'
            }
          };
          if((local_data !== null && time_token !== null && search === local_data) || local_data !== null ){
            if(Number(time_token)+5<= Number(expry)){
              localStorage.removeItem("search")
              localStorage.removeItem("search_token")
            }else{
              fetch(`https://api.themoviedb.org/3/search/movie?query=${local_data}&include_adult=false&language=en-US&page=1`, options)
            .then(response => response.json())
            .then(response => setData(response?.results))
            .catch(err => console.error(err));
            }
            // console.log(local_data,time_token+5,"local_data");
            // console.log(Number(time_token)+5,"local_data")
            // if(local_data?.exp){
            
          }else{
            fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`, options)
            .then(response => response.json())
            .then(response => setData(response?.results))
            .catch(err => console.error(err));
          }
          
    },[search])
  return (
    <div>
      <Container>
      <div className='search-grid'>
        {
            data.map((item,index)=>{
                return(
                <div key={index} onClick={()=>handleOpen({item})}>
                    <img src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} alt={item.title} style={{height:"400px", width:"250px"} } />
                </div>
                )
            })  
        }
        </div>
      </Container>
    </div>
  )
}

export default MovieSearch
