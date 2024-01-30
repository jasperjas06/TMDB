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
import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

export default function Footer() {
  return (
    <>
    <footer className="footer">
      <div >
        <center>
        {/* <img style={{maxWidth:"155px"}} src={require("assets/img/bookmark.jpg")} alt="logo" /> */}
          <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href="https://twitter.com/jasperP1304"
                id="tooltip622135962"
                target="_blank"
              >
                <i className="fab fa-twitter" />
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip622135962">
                Follow in
              </UncontrolledTooltip>
              <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href="https://www.facebook.com/jasper.jasper.7902"
                id="tooltip230450801"
                target="_blank"
              >
                <i className="fab fa-facebook-square" />
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip230450801">
                Follow in
              </UncontrolledTooltip>
              <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href="https://www.instagram.com/jasper_jeba_selvam/"
                id="tooltip318450378"
                target="_blank"
              >
                <i className="fab fa-instagram" />
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip318450378">
                Follow in
              </UncontrolledTooltip>

        </center>
      </div>
      
      {/* <Container>
      <center>
        <div >
          <Row>
            <Col >
            <img style={{maxWidth:"155px"}} src={require("assets/img/bookmark.jpg")} alt="logo" />
            </Col>
            <Col>
            <h1 className="title">BOOK•<span style={{fontWeight:"300"}}>Mark</span></h1>
            <h3 className="title">Follow in:</h3>
            <div >
              <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href="https://twitter.com/creativetim"
                id="tooltip622135962"
                target="_blank"
              >
                <i className="fab fa-twitter" />
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip622135962">
                Follow us
              </UncontrolledTooltip>
              <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href="https://www.facebook.com/creativetim"
                id="tooltip230450801"
                target="_blank"
              >
                <i className="fab fa-facebook-square" />
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip230450801">
                Like us
              </UncontrolledTooltip>
              <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href="https://dribbble.com/creativetim"
                id="tooltip318450378"
                target="_blank"
              >
                <i className="fab fa-dribbble" />
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip318450378">
                Follow us
              </UncontrolledTooltip>
            </div>
            </Col>
          </Row>
        </div>
      </center>
      </Container> */}
      
    </footer>
    <div
        className="text-center p-3"
        style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}
      
      >
        <div >
          © {new Date().getFullYear()}, Designed &{" "}
          
           Coded by{" "}
          <a
            href="https://personal-portfolio-ruddy-two.vercel.app/index"
            target="_blank" rel="noreferrer"
            
          >
            Jasper P
          </a>
          .
        </div>
      </div>
    </>
  );
}
