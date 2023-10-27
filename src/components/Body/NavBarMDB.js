import React, { useState } from 'react'
import '../../assets/css/New.css'
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarLink,
  MDBCollapse
} from 'mdb-react-ui-kit';
import DehazeIcon from '@mui/icons-material/Dehaze';
export const HomeNav = () => {
  const [showNavSecond, setShowNavSecond] = useState(false);
  const [colorChange, setColorchange] = useState(false);
    const changeNavbarColor = () => {
        if (window.scrollY >= 20) {
            setColorchange(true);
        }
        else {
            setColorchange(false);
        }
    };
    window.addEventListener('scroll',changeNavbarColor)
  return (
    <MDBNavbar expand='lg' className={'NavColor'}  >
      <MDBContainer fluid >
        {/* <MDBNavbarBrand >
        <img
          src="https://cdn-icons-png.flaticon.com/128/725/725300.png"
          // src="https://cdn-icons-png.flaticon.com/128/1550/1550632.png"
          height={"50px"}
          width={"50px"}
          alt="profile"
        />
        <h3 ><span style={{color:"red",fontSize:"35px",fontWeight:"bold"}}>Book</span><span style={{color:"white",position:"relative"}}>Mark</span></h3>
        </MDBNavbarBrand> */}
        <MDBNavbarToggler
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowNavSecond(!showNavSecond)}
        >
          {/* <MDBIcon icon='bars' fas color='black'/> */}
          {/* <CiBookmark /> */}
          <DehazeIcon sx={{color:"white"}} fontSize='large'/>
        </MDBNavbarToggler>
        <MDBCollapse style={{display:"flex", justifyContent:"flex-end"}} className='sub' navbar show={showNavSecond}>
          <MDBNavbarNav right color='white' fullWidth={false} className='mb-2 mb-lg-0'>
            <MDBNavbarLink active aria-current='page' href='Dash' color='white'>
              <p className={"color"}>Home</p>
            </MDBNavbarLink>
            <MDBNavbarLink href='search'>
              <p className={"color"}>Search</p>
              </MDBNavbarLink>
            <MDBNavbarLink href='profile'>
              <p className={"color"}>Profile</p>
            </MDBNavbarLink>
            {/* <MDBNavbarLink disabled href='#' tabIndex={-1} aria-disabled='true'>
              Disabled
            </MDBNavbarLink> */}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  )
}
