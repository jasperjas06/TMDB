/* eslint-disable react-hooks/exhaustive-deps */
import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Button, Container, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const Collection = ({ id }) => {
  const [img, setImg] = React.useState("");
  const [data,setData] = React.useState({})
  const [collection, setCollection] = React.useState({});
  const [open,setOpen] = React.useState(false);
  
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_KEY}`,
    },
  };
  const toggle = () => {
    // fetch(`https://api.themoviedb.org/3/search/collection?query=${id}&include_adult=false&language=en-US&page=1`, options)
    // .then(response => response.json())
    // .then(response => console.log(response))
    // .catch(err => console.error(err));
    setOpen(!open)
    
  }
  useEffect(() => {
    // console.log(id);
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response,"response");
        if (response?.belongs_to_collection) {
          setData(response)
          setCollection(response?.belongs_to_collection);
          const imageURL = `https://media.themoviedb.org/t/p/original${response?.belongs_to_collection?.backdrop_path}`
          setImg(imageURL);
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .catch((err) => console.error(err));
  }, [id, img, options]);


  
  const style = {
    height: "100%",
    width: "100%",
    backgroundImage: `https://image.tmdb.org/t/p/original${data?.backdrop_path}`,
    backgroundSize: "cover",
    backgroundPosition: "50% 50%",
    borderRadius: "15px",

  };
  const modalstyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "100%",
    height: "100%",
    // backgroundImage: `url(${imageURL})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    transform: "translate(-50%, -50%)",
    bgcolor: "black"
  }
  return (
    <>
    {collection?.backdrop_path ? (
    <div style={style}>
    <div className="collection">
    <Container style={{padding:"40px"}}>
      <h1 >Part of the {collection?.name}</h1>
      <Container>
        <Button onClick={toggle}>View Collection</Button>
      </Container>
    </Container>
    </div>
    </div>
    ):null}

    
        <Modal  isOpen={open} toggle={toggle} fullscreen={true} >
        <ModalHeader toggle={toggle}>{collection?.name}</ModalHeader>
        <ModalBody>
        <div>
        <img style={{height:"200px"}} src={`http://image.tmdb.org/t/p/w500${collection?.poster_path}`} alt="poster" />
        <Typography>{`Including ${data?.title}`}</Typography>
        </div>
        </ModalBody>
        <ModalFooter>
          {/* <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{' '} */}
          {' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>


    </>
  );
};

export default Collection;
// linear-gradient(to right, rgba(var(--tmdbDarkBlue),1) 0%, rgba(var(--tmdbDarkBlue),0.6) 100%),
