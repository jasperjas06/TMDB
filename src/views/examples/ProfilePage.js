/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-operators */
import IndexNavbar from "components/Navbars/IndexNavbar";
import React, { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import '../../assets/css/New.css'
import { useNavigate } from "react-router-dom";
const ProfilePage = () => {
  const navigate = useNavigate();
  const [data,setData] = React.useState({});
  const getUser = async() =>{
    const token = jwtDecode(JSON.stringify(localStorage.getItem("tmdb-auth-token")))
    await axios.get(`https://bookmark-server-d30v.onrender.com/api/getuser?id=${token?.id}`)
    .then((res)=>{
      // console.log(res?.data?.data); 
      if(res.data.data){
        setData(res.data.data)
      }
    })
    .catch((err)=>{
      console.log(err.message);
    })
  }
  useEffect(()=>{
    
    // if(token){
    //   // console.log(token);
    //   let id = token?.id
    //   getUser({id});
    // }
    getUser()
  },[])
  return (
    <> 
      <IndexNavbar profile={true} />
      <div className="wrapper">
        <div style={{marginTop:"80px"}}>
        <Container>
        <div >
      <Container >
        <Container >
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <MDBCard style={{ borderRadius: '15px' }}>
              <MDBCardBody className="text-center">
                <div className="mt-3 mb-4">
                  <MDBCardImage src={data?.profileimg ? data?.profileimg : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"}
                    className="rounded-circle" fluid style={{ width: '100px', height:"100px" }} />
                </div>
                <MDBTypography tag="h4">{data?.username}</MDBTypography>
                <MDBCardText className="text-muted mb-4">
                  {data?.phone ? data.phone : "add your mobile number"} <span className="mx-2">|</span> <a href="#!">{data?.email}</a>
                </MDBCardText>
                <div className="mb-4 pb-2">
                <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                <Button>
                    <MDBIcon  fab icon="facebook" size="lg" />
                </Button>
                </a>
                <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                <Button>
                    <MDBIcon  fab icon="twitter" size="lg" />
                </Button>
                </a>
                <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                <Button>
                    <MDBIcon  fab icon="instagram" size="lg" />
                </Button>
                </a>
                  
                </div>
                <div className="">
                  <div title="edit profile" className="editpro" style={{float:"right"}}>
                  <Button onClick={()=>{navigate('/edit-profile')}}>Edit</Button>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
        </Container>
      </Container>
    </div>
        </Container>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
