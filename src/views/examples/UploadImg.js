import React, { useEffect, useState } from "react";
// import { Image } from "cloudinary-react";
// import { Cloudinary } from "@cloudinary/url-gen";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Col, Container, Row } from "reactstrap";
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@mui/material";
import { Button } from "react-bootstrap";
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
        console.log(res);
        if (res.status === 200) {
          setUrl(res?.data?.secure_url);
          // setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const update = async () => {
    try {
      
      let token = JSON.stringify(localStorage.getItem("tmdb-aut-token"));
      if (token) {
        let decode = jwtDecode(token);
        let id = decode?.id;
        let updatedata = {}
        
        if (
          data.name !== name ||
          data.username !== userName ||
          data.phone !== phone ||
          data.profileimg !== url
        ) {
          updatedata = {
            name:name,
            username: userName,
            phone:phone,
            profileimg: url,
          };
        }
        // console.log(updatedata, "updatedata");
        if (Object.keys(updatedata).length !== 0) {
          await axios
            .post(`http://localhost:2000/api/update?id=${id}`, updatedata)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          alert("no data to update");
        }
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (image !== null) {
      handleImageChange();
      
    }
    if(url !== ""){
      setButton(false)
    }else{
      if(name !== "undefined"){
        console.log(name,data?.name); 
      }
      // if(data.name !== name ||
      //   data.username !== userName ||
      //   data.phone !== phone ||
      //   data.profileimg !== url){
      //     setButton(false)
      //   }
    }
    let token = JSON.stringify(localStorage.getItem("tmdb-aut-token"));
    if (token) {
      let decode = jwtDecode(token);
      axios
        .get(`http://localhost:2000/api/getuser?id=${decode?.id}`)
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
      console.log(name,phone,userName,"token");
      // setPreview(decode?.image)
      if(name === data.name){
        console.log("name true");
      }else{
        console.log("name false");
      }
    }
    
  }, [image,name]); 

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
          {/* {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-4 h-6 w-6"></div>
            <span>Processing...</span>
          </div>
        ) : (
          url && (
            <div className="pb-8 pt-4">
              <Image
                cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
                publicId={url}
              />
            </div>
          )
        )} */}
        </div>
      </div>

      <Container>
        <br />
        <Row>
          <Col md={4}>
            <FormControl>
              <InputLabel
                htmlFor="my-input"
                sx={{ color: "white" }}
              ></InputLabel>
              {/* <Input
                value={name}
                id="my-input"
                aria-describedby="my-helper-text"
                sx={{ color: "white" }}
                onChange={(e) => setName(e.target.value)}
              /> */}
              <input value={data.name} onChange={(e)=>setUpdateName(e.target.value)} />
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
              <InputLabel
                htmlFor="my-input"
                sx={{ color: "white" }}
              ></InputLabel>
              <Input
                value={userName}
                id="my-input"
                aria-describedby="my-helper-text"
                sx={{ color: "white" }}
                onChange={(e) => setUserName(e.target.value)}
              />
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
                value={phone}
                id="my-input"
                aria-describedby="my-helper-text"
                sx={{ color: "white" }}
                onChange={(e) => setPhone(e.target.value)}
              />
              {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
            </FormControl>
          </Col>
          <br />
          <Col md={6}>
            <Container>
              <Button disabled={button} style={{ float: "right", marginTop: "30px" }} onClick={update}>
                Save
              </Button>
            </Container>
          </Col>
        </Row>
      </Container>
      {console.log(name,phone,userName,"log")}
    </div>
  );
};

export default ImageUpload;
