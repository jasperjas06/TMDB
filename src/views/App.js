/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from 'react'
import Index from './Index';
import LandingPage from './examples/LandingPage';
import AuthContext from './Auth';
import { useNavigate } from 'react-router-dom';

function App() {
  //  export const AuthContext=React.createContext();
    const [token,setToken] = useState("")
  // const token = localStorage.getItem("token");
  const navigate = useNavigate()
    useEffect(()=>{
      const getToken =()=>{
        const appToken = localStorage.getItem("token");
        if(appToken){
          setToken(appToken)
        }
      }
      getToken()
    },[token])
  return (
    <div>
    <AuthContext.Provider value={{token,setToken}}>
      {
        token ? navigate('/home-page') : navigate('/landing-page')
      }
      </AuthContext.Provider>
    </div>
  )
}

{/* token ? <Index/> : <LandingPage/> */}
export default App 
