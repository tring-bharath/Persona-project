import { useState,useEffect,createContext } from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { useForm } from "react-hook-form";
import Login from "./Login";
import Signup from "./Signup";
import Start from "./Start";
import Home from "./Home";
import Header from "./Header";
export const globalData=createContext();
export default function App()
{
  const [data,setData]=useState(0);
 
  useEffect(()=>
  {
    console.log(data);
    
  },[data])
  return(
    <>
    <globalData.Provider value={{data,setData}}>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Start/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/Signup' element={<Signup/>}></Route>
      <Route path='/Home' element={<Home/>}/>
    </Routes>
    </BrowserRouter>
    </globalData.Provider>
    </>
  )
}