import React, { useEffect, useState } from "react";
import { Image } from 'cloudinary-react';
import {Cloudinary} from "@cloudinary/url-gen";
import axios from "axios";
const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
// console.log(process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;


  const handleImageChange = () => {
    console.log(image,"file");
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "ppo86s9k");

    axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData)
    .then((res)=>{
      // console.log(res);
      if(res.status === 200){
        setUrl(res?.data?.secure_/url);
        setLoading(false);
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  };

  const handleResetClick = () => {
    setPreview(null);
    setImage(null);
  };
  useEffect(()=>{
    if(image !== null){
      handleImageChange()
    }
  },[image])

  return (
    <div className="h-screen sm:px-8 md:px-16 sm:py-8">
      <div className="container mx-auto max-w-screen-lg h-full">
        <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
          <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
            <span>Click on Upload a File</span>&nbsp;
          </p>
          <input
            id="hidden-input"
            type="file"
            className="hidden"
            onChange={(e)=>setImage(e.target.files[0])}
            accept="image/*"
          />
          <label htmlFor="hidden-input" className="cursor-pointer">
            <div className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
              Upload a file
            </div>
          </label>

          <div className="flex justify-center items-center mt-5 mx-3 max-w-xs">
            {preview && <img src={preview} alt="preview" className="w-full" style={{height:"100px",width:"100px"}}/>}
          </div>
        </header>
        <div className="flex justify-end pb-8 pt-6 gap-4">
          <button
            // onClick={handleImageChange}
            className="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none disabled:cursor-not-allowed"
            // disabled={!preview}
          >
            Upload now
          </button>
          <button
            onClick={handleResetClick}
            className="rounded-sm px-3 py-1 bg-red-700 hover:bg-red-500 text-white focus:shadow-outline focus:outline-none"
          >
            Reset
          </button>
        </div>
        {loading ? (
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
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
