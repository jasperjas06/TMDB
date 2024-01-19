/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from 'react'
import Index from './Index';
import LandingPage from './examples/LandingPage';
import AuthContext from './Auth';

function App() {
  //  export const AuthContext=React.createContext();
    const [token,setToken] = useState("")
  // const token = localStorage.getItem("token");
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
        token ? <Index/> : <LandingPage/>
      }
      </AuthContext.Provider>
    </div>
  )
}

export default App 
