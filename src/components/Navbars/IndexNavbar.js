/*!

=========================================================
* BLK Design System React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useContext, useState } from "react";
import { ButtonGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import AuthContext from "views/Auth";

export default function IndexNavbar({profile}) {
  // const [token,setToken] = useContext(AuthContext)
  const [profileimg,setProfileimg] = useState("")
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [collapseOut, setCollapseOut] = React.useState("");
  const [color, setColor] = React.useState("navbar-transparent");
  const navigate = useNavigate();
  let token = JSON.stringify(localStorage.getItem("tmdb-aut-token"));
  // console.log(token);
  const decoded = jwtDecode(token)
  React.useEffect(() => {
    const getProfile = async () => {
      try {
        await axios.get(`https://bookmark-server-d30v.onrender.com/api/getuser?id=${decoded?.id}`)
      .then((res)=>{
        // console.log(res.data.data);
        if(res.data.data){
          setProfileimg(res.data.data?.profileimg)
        }
      }).catch((err)=>{
        console.log(err);
      })
      } catch (error) {
        console.log(error.message);
      }
      
    }
    if(decoded){
      getProfile()
    }
    window.addEventListener("scroll", changeColor);
    return function cleanup() {
      window.removeEventListener("scroll", changeColor);
    };
  }, []);
  const logout =()=>{
    localStorage.clear()
    // setToken("")
    navigate("/")
  }
  const changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      setColor("bg-info");
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      setColor("navbar-transparent");
    }
  };
  const toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    setCollapseOpen(!collapseOpen);
  };
  const onCollapseExiting = () => {
    setCollapseOut("collapsing-out");
  };
  const onCollapseExited = () => {
    setCollapseOut("");
  };
  const scrollToDownload = () => {
    document
      .getElementById("download-section")
      .scrollIntoView({ behavior: "smooth" });
  };
  return (
    <Navbar className={"fixed-top " + color} color-on-scroll="100" expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand to="/" tag={Link} id="navbar-brand">
            {/* <img src="https://cdn-icons-png.flaticon.com/128/6749/6749278.png"  /> */}
            <span>BOOK• </span>
            Mark
          </NavbarBrand>
          {/* <UncontrolledTooltip placement="bottom" target="navbar-brand">
            Designed and Coded by Creative Tim
          </UncontrolledTooltip> */}
          <button
            aria-expanded={collapseOpen}
            className="navbar-toggler navbar-toggler"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className={"justify-content-end " + collapseOut}
          navbar
          isOpen={collapseOpen}
          onExiting={onCollapseExiting}
          onExited={onCollapseExited}
        >
          <div className="navbar-collapse-header">
            <Row>
              <Col className="collapse-brand" xs="6">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  BooK•Mark
                </a>
              </Col>
              <Col className="collapse-close text-right" xs="6">
                <button
                  aria-expanded={collapseOpen}
                  className="navbar-toggler"
                  onClick={toggleCollapse}
                >
                  <i className="tim-icons icon-simple-remove" />
                </button>
              </Col>
            </Row>
          </div>
          <div style={{display:"flex", justifyContent:"center"}}>
          <Nav navbar >
          {
            profile ? (
                <NavLink href="/home-page" style={{color:"white",marginRight:"20px"}}>Home</NavLink>
            ) : null
          }
          <NavLink href="/Search-page">

          <span style={{color:"white",marginRight:"20px"}} >Search</span>
          </NavLink>
          {
            !profile ? (
              <NavLink href="/profile-page">
          {/* <span style={{color:"white",marginRight:"20px"}}>Profile</span> */}
          <img src={profileimg? profileimg :"https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"} alt="profile" style={{height:"30px",width:"30px",borderRadius:"50%",position:"absolute"}} />
          </NavLink>
            ) : null
          }
          
            
          { profile &&
            <NavLink onClick={logout} title="logout">
            <img style={{height:"20px", width:"20px"}} src={require("assets/img/logout.png")} alt="logout"/>
          {/* <span style={{color:"white",marginRight:"20px"}}>Logout</span> */}
          </NavLink>}
            
          </Nav>
          </div>
        </Collapse>
      </Container>
    </Navbar>
  );
}
