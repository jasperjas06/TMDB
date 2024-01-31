
import React, { useEffect } from "react";
import { Button, Container, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const Collection = ({ id }) => {
  const [img, setImg] = React.useState("");
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
  const imageURL = `https://media.themoviedb.org/t/p/w1440_and_h320_multi_faces/5iidzov8DrsSyZdefeo7jBLDNUW.jpg`
  // const imageURL = `https://image.tmdb.org/t/p/original${img}`;
  useEffect(() => {
    // console.log(id);
    fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, options)
      .then((response) => response.json())
      .then((response) => {
        // console.log(response,"response");
        if (response?.seasons.length > 0 && response?.backdrop_path) {
          setCollection(response);
          setImg(response?.backdrop_path);
          //   return response.json();
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .catch((err) => console.error(err));
  }, []);
  // console.log(`url(https://media.themoviedb.org/t/p/w1440_and_h320_multi_faces${img})`)
  // console.log(collection);
  const style = {
    height: "100%",
    width: "100%",
    backgroundImage: `url(https://image.tmdb.org/t/p/original${collection?.backdrop_path})`,
    backgroundSize: "cover",
    backgroundPosition: "50% 50%",
    borderRadius: "15px",

  };
  return (
    <>
    {collection?(
    <div style={style}>
    <div className="collection">
    <Container style={{padding:"40px"}}>
      <h1 >Part of the {collection?.name}</h1>
      <Container>
        <Button onClick={toggle}>View all </Button>
      </Container>
    </Container>
    </div>
    </div>
    ):null}
    <Modal  isOpen={open} toggle={toggle}  >
        <ModalHeader toggle={toggle}>{collection?.name}</ModalHeader>
        <ModalBody>
        <div>
        {
          collection?.seasons?.map((item,index)=>{
            return(
            <img key={item?.id} style={{height:"200px"}} src={`http://image.tmdb.org/t/p/w500${item?.poster_path}`} alt="poster" />

            )
          })
        }
        {/* <Typography>{`Including ${data?.title}`}</Typography> */}
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
