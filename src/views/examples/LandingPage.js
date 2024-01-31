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
import React from "react";
// react plugin used to create charts
import { Line } from "react-chartjs-2";
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  ListGroupItem,
  ListGroup,
  Container,
  Row,
  Col,
  CardImg,
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  FormGroup,
  Label,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";
// import validate from 'deep-email-validator'
import bigChartData from "variables/charts.js";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LandingPage() {
  const navigate = useNavigate()
  const [fullNameFocus, setFullNameFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [passwordFocus, setPasswordFocus] = React.useState(false)
  const [open,setOpen] = React.useState(false)
  
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("")

  const handleSubmit = async() =>{
    try {
      if( email === "" || password === ""){
        toast.error("Please fill all the fields")
      }
      else{
        // navigate('/home-page')
        // console.log(email,password);
        await axios.post("https://bookmark-server-d30v.onrender.com/api/login",{username:email,password:password})
        .then((res)=>{
          // console.log(res,"res");
          if(res?.data?.message === "login successful"){
            toast.success(res.data.message)
            localStorage.setItem("tmdb-aut-token",JSON.stringify(res?.data?.token))
            if(JSON.stringify(localStorage.getItem("tmdb-aut-token"))){
              navigate('/home-page')
            }
          }
          else{
            toast.error(res.data.message)
          }
        })
      }
    } catch (error) {
      toast.error(error.message)
    }
    
  }
  React.useEffect(() => {
    document.body.classList.toggle("landing-page");
    // let res = validate(email).then((res)=>console.log(res)).catch((err)=>console.log(err))
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("landing-page");
    };
  }, []);
  return (
    <>
      {/* <IndexNavbar /> */}
      <div className="wrapper">
        <div className="page-header">
          <img
            alt="..."
            className="path"
            src={require("assets/img/blob.png")}
          />
          <img
            alt="..."
            className="path2"
            src={require("assets/img/path2.png")}
          />
          <img
            alt="..."
            className="shapes triangle"
            src={require("assets/img/triunghiuri.png")}
          />
          <img
            alt="..."
            className="shapes wave"
            src={require("assets/img/waves.png")}
          />
          <img
            alt="..."
            className="shapes squares"
            src={require("assets/img/patrat.png")}
          />
          <img
            alt="..."
            className="shapes circle"
            src={require("assets/img/cercuri.png")}
          />
          <div className="content-center">
            <Row className="row-grid justify-content-between align-items-center text-left">
            
              <Col lg="6" md="6">
              
              <h1 className="text-white">
                  {/* Wellcome to <br /> */}
                  <span className="text-white">BooK•Mark</span>
                </h1>
                {/* <i class="fi fi-rr-bookmark"></i> */}
              </Col>
              <Col lg="6" md="6">
              <Container >
              <center>
              <Card className="card-register">
                    <CardHeader>
                      <CardImg
                        alt="..."
                        src={require("assets/img/square-purple-1.png")}
                        style={{height:"350px"}}
                      />
                      <CardTitle tag="h4" >SignIn</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Form className="form">
                        
                        <InputGroup
                          className={classnames({
                            "input-group-focus": emailFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-email-85" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email"
                            type="text"
                            onFocus={(e) => setEmailFocus(true)}
                            onBlur={(e) => setEmailFocus(false)}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": passwordFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-lock-circle" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Password"
                            type="text"
                            onFocus={(e) => setPasswordFocus(true)}
                            onBlur={(e) => setPasswordFocus(false)}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </InputGroup>
                        <FormGroup  className="text-left">
                        <div>
                    <center>
                      <span className="form-check-sign" />Don't have an account.{" "}
                            <a
                              href="register-page"
                              // onClick={(e) => setOpen(true)}
                            >
                              SignUp
                            </a>
                            .</center>
                      </div>
                        </FormGroup>
                      </Form>
                    </CardBody>
                    <CardFooter>
                    
                      <Button className="btn-round" color="primary" size="lg" onClick={handleSubmit}>
                        Login
                      </Button>
                      
                    </CardFooter>
              </Card>
              </center>
              </Container>
              
              </Col>
              {/* <Col lg="6" md="6">
                <h1 className="text-white">
                  We keep your coin <br />
                  <span className="text-white">secured</span>
                </h1>
                <p className="text-white mb-3">
                  A wonderful serenity has taken possession of my entire soul,
                  like these sweet mornings of spring which I enjoy with my
                  whole heart. I am alone, and feel...
                </p>
                <div className="btn-wrapper mb-3">
                  <p className="category text-success d-inline">
                    From 9.99%/mo
                  </p>
                  <Button
                    className="btn-link"
                    color="success"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    <i className="tim-icons icon-minimal-right" />
                  </Button>
                </div>
                <div className="btn-wrapper">
                  <div className="button-container">
                    <Button
                      className="btn-icon btn-simple btn-round btn-neutral"
                      color="default"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-twitter" />
                    </Button>
                    <Button
                      className="btn-icon btn-simple btn-round btn-neutral"
                      color="default"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-dribbble" />
                    </Button>
                    <Button
                      className="btn-icon btn-simple btn-round btn-neutral"
                      color="default"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-facebook" />
                    </Button>
                  </div>
                </div>
              </Col> */}
              {/* <Col lg="4" md="5">
                <img
                  alt="..."
                  className="img-fluid"
                  src={require("assets/img/etherum.png")}
                />
              </Col> */}
            </Row>
          </div>
        </div>
        
        
        
        {/* <Footer /> */}
        <Toaster/>
      </div>
    </>
  );
}
