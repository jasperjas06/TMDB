/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from 'react'
import Index from './Index';
import LandingPage from './examples/LandingPage';
import AuthContext from './Auth';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function App() {
  //  export const AuthContext=React.createContext();
    const [token,setToken] = useState("")
  // const token = localStorage.getItem("token");
  // const navigate = useNavigate()
    useEffect(()=>{
      const getToken =()=>{
        const appToken = localStorage.getItem("tmdb-auth-token")
        if(appToken !== null){
          let decodedToken = jwtDecode(appToken)
          if(decodedToken?.exp < (new Date().getTime()+1)/1000){
            localStorage.removeItem("tmdb-auth-token")
            setToken(null)
          }else setToken(appToken)
        }
      }
      getToken()
    },[token])
  return (
    <div>
    <AuthContext.Provider value={{token,setToken}}>
      {
        token ? <Index/> : <LandingPage/>
      }
      </AuthContext.Provider>
    </div>
  )
}

{/* token ? <Index/> : <LandingPage/> */}
export default App 
