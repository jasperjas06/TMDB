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
  const getUser = async({id}) =>{
    await axios.get(`http://localhost:2000/api/getuser?id=${id}`)
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
    const token = jwtDecode(JSON.stringify(localStorage.getItem("tmdb-aut-token")))
    if(token){
      // console.log(token);
      let id = token?.id
      getUser({id});
    }
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
                    className="rounded-circle" fluid style={{ width: '100px' }} />
                </div>
                <MDBTypography tag="h4">{data?.username}</MDBTypography>
                {/* <MDBTypography tag="h4">{data?.name}</MDBTypography> */}
                <MDBCardText className="text-muted mb-4">
                  {data?.phone} <span className="mx-2">|</span> <a href="#!">{data?.email}</a>
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
                {/* <Button rounded size="lg">
                <i  onClick={()=>console.log("edit")} className='fas fa-pencil-alt' style={{fontSize:'24px'}}></i>
                edit
                </Button> */}
                <div className="">
                  {/* <div>
                    <MDBCardText className="mb-1 h5">8471</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Wallets Balance</MDBCardText>
                  </div> */}
                  {/* <div className="px-3">
                    <MDBCardText className="mb-1 h5">8512</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                  </div> */}
                  <div title="edit profile" className="editpro" style={{float:"right"}}>
                  <Button onClick={()=>{navigate('/edit-profile')}}>Edit</Button>
                    {/* <i  onClick={()=>console.log("edit")} className='fas fa-pencil-alt' style={{fontSize:'24px'}}></i> */}
                    {/* <MDBCardText className="small text-muted mb-0">edit your profile</MDBCardText> */}
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
