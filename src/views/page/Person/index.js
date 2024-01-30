import React, { useEffect } from 'react'

const Person = ({id}) => {

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjBiZjYxOWI5NDllNGIxMzgxM2ZjMzNiNjJkOGQ0MCIsInN1YiI6IjY0YjY5NzY0MGU0ZmM4NTE5ZmVjZGZjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RnpeI4IW-C-aM6r1bWkbuYIxlOwU7aW8GIppkb9kAr0'
        }
      };
      useEffect(()=>{
        fetch(`https://www.themoviedb.org/person/117642-jason-momoa`, options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
      },[id])
    
  return (
    <div>
      
    </div>
  )
}

export default Person
