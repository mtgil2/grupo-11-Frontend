import Navbar from "../common/Navbar";
import { useState , useEffect, useRef } from "react";
import { useAuth0 } from '@auth0/auth0-react'
import StockImage from '../common/StockImage';
import "./Stocks.css"

function Stocks () {
  const {user, isAuthenticated, isLoading} = useAuth0();

  console.log(isAuthenticated)
  
  if (isLoading){
    return <div>Loading...</div>
  }
  return isAuthenticated ? (
    <>
      <Navbar/>
      <StockImage/>
    </>
  ) : (
    <>
      <Navbar/>
      <div>You are not authenticated. Please log in to view this content.</div>
    </>
  );
}

export default Stocks