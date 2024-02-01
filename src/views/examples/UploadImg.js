/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-operators */
import React, { useEffect, useState } from "react";
// import { Image } from "cloudinary-react";
// import { Cloudinary } from "@cloudinary/url-gen";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Col, Container, Row } from "reactstrap";
// import ReCAPTCHA from "react-google-recaptcha";
import Recaptcha from "react-recaptcha";
import { FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
import { Button } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  // const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [profile, setProfile] = useState(null);
  let [data, setData] = useState({});
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [updatename, setUpdateName] = useState("");
  const [updateuserName, setUpdateUserName] = useState("");
  const [updatephone, setUpdatePhone] = useState("");
  const [button, setButton] = useState(true);
  const [buttonFun, setButtonFun] = useState(true);

  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

  const handleImageChange = () => {
    // console.log(image, "file");
    setPreview(URL.createObjectURL(image));
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "ppo86s9k");

    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      )
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          setUrl(res?.data?.secure_url);
          // setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const togglebutton = () => {
    setButtonFun(!buttonFun);
    // console.log(name, userName, phone, buttonFun);
    if (buttonFun) {
      if (url !== "") {
        setButton(false);
      }
      else if(name !== "" || userName !== "" || phone !== "" && name !== data.name || userName !== data.username || phone !== data.phone){
        setButton(false);
      }
    }else{
      setButton(true);
    }
  };
  const update = async () => {
    try {
      let token = JSON.stringify(localStorage.getItem("tmdb-auth-token"));
      if (token !== null) {
        let decode = jwtDecode(token);
        let id = decode?.id;
        let updatedata = {};
        if(name || userName || phone || url){
          if (name !== "" && name !== data.name) {
            updatedata.name = name;
          }
          if (userName !== "" && userName !== data.username) {
            updatedata.username = userName;
          }
          if (phone !== "" && phone !== data.phone) {
            updatedata.phone = phone;
          }
          if (url !== "") {
            updatedata.profileimg = url;
          }
        }

        
        if (Object.keys(updatedata).length !== 0) {
          // console.log(updatedata, "updatedata");
          await axios
            .post(`https://bookmark-server-d30v.onrender.com/api/update?id=${id}`, updatedata)
            .then((res) => {
              if(res?.data){
              toast.success("updated successfully");
              }
            })
            .catch((err) => {
              toast.error("something went wrong");
              // console.log(err);
            });
        } else {
          toast("no data to update");
          
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (image !== null) {
      handleImageChange();
    }

    let token = JSON.stringify(localStorage.getItem("tmdb-auth-token"));
    if (token !== null) {
      let decode = jwtDecode(token);
      axios
        .get(`https://bookmark-server-d30v.onrender.com/api/getuser?id=${decode?.id}`)
        .then((res) => {
          if (res?.data?.data) {
            setData(res?.data?.data);
            setProfile(
              res?.data?.data?.profileimg
                ? res?.data?.data?.profileimg
                : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
            );
            setName(res?.data?.data?.name);
            setPhone(res?.data?.data?.phone);
            setUserName(res?.data?.data?.username);
          }
        })
        .catch((err) => {
          console.log(err, "err");
        });
    }
  }, [image]);

  return (
    <div>
      <div className="h-screen sm:px-8 md:px-16 sm:py-8">
        <div className="container mx-auto max-w-screen-lg h-full">
          <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
            <div className="flex justify-center items-center mt-5 mx-3 max-w-xs">
              {data && (
                
                <img
                  src={preview != null ? preview : profile}
                  alt="preview"
                  className="w-full"
                  style={{
                    height: "100px",
                    width: "100px",
                    borderRadius: "50%",
                  }}
                />
              )}
            </div>
            <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center"></p>
            <input
              id="hidden-input"
              type="file"
              className="hidden"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
            />
          </header>
          <div className="flex justify-end pb-8 pt-6 gap-4"></div>
        </div>
      </div>

      <Container>
        <br />
        <Row>
          <Col md={4}>
            <FormControl>
              {/* {
              !updatename ?(<InputLabel
                htmlFor="my-input"
                sx={{ color: "white" }}
              >{data?.name}</InputLabel>) : <InputLabel></InputLabel>
            } */}

              <Input
                value={name}
                id="my-input"
                placeholder="full name"
                aria-describedby="my-helper-text"
                sx={{ color: "white" }}
                onChange={(e) => setName(e.target.value)}
              />
              {/* <input value={data.name} onChange={(e)=>setUpdateName(e.target.value)} /> */}
              {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
            </FormControl>
          </Col>
          <Col md={4}>
            <FormControl>
              <InputLabel
                htmlFor="my-input"
                sx={{ color: "white" }}
              ></InputLabel>
              <Input
                title="can't change email"
                value={data?.email}
                disabled
                id="my-input"
                aria-describedby="my-helper-text"
                sx={{ color: "white" }}
              />
              <FormHelperText id="my-helper-text">
                We'll never share your email.
              </FormHelperText>
            </FormControl>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <FormControl>
              {/* {!updateuserName?(<InputLabel
                htmlFor="my-input"
                sx={{ color: "white" }}
              >{data?.username}</InputLabel>):(<InputLabel></InputLabel>)} */}
              <Input
                value={userName}
                id="my-input"
                placeholder="user namex"
                aria-describedby="my-helper-text"
                sx={{ color: "white" }}
                onChange={(e) => setUserName(e.target.value)}
              />
              {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
            </FormControl>
          </Col>
          <Col md={4}>
            <FormControl>
              {/* {
                !updatephone?(<InputLabel sx={{color:"white"}}>{data.phone? data.phone : "phone number"}</InputLabel>):<InputLabel ></InputLabel>
              } */}
              <Input
                value={phone}
                id="my-input"
                placeholder="phone number"
                aria-describedby="my-helper-text"
                sx={{ color: "white" }}
                onChange={(e) => setPhone(e.target.value)}
              />
              {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
            </FormControl>
          </Col>
          <br />
          <Col md={6}>
            <div
              style={{
                display: "flex",
                padding: "10px",
                justifyContent: "center",
              }}
            >
              
            </div>
            <Container>
            <input type="checkbox" onClick={togglebutton} />
              <InputLabel sx={{ marginLeft: "5px", color:"white" }}>
                confirm changes
              </InputLabel>
              <Button
                disabled={button}
                style={{ float: "right", marginTop: "30px" }}
                onClick={update}
              >
                Save
              </Button>
            </Container>
          </Col>
        </Row>
      </Container>
      {/* {console.log(updatename, updatephone, updateuserName, "log")} */}
      <Toaster/>
    </div>
  );
};

export default ImageUpload;

// 6LcZuWEpAAAAALG4qcS_c4yV7cDDD52t8EMucixi 6LcZuWEpAAAAAEHG1Du8t6C9wlU2DvMVbF-nheWO
