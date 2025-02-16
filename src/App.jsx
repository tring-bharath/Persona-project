import { useState,useEffect,createContext } from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { useForm } from "react-hook-form";
import Login from "./Login";
import Signup from "./Signup";
import Start from "./Start";
import Home from "./Home";
import Header from "./Header";
import Protect from "./Protect"; 
import Card from "./Card";
export const globalData=createContext();
export default function App()
{
  const [data,setData]=useState({name:'bharath',email:'bharath@abc.com',password:'qwertyuiop'});
  const [user,setUser]=useState(null);
  const [userName,setUsername]=useState();
  useEffect(()=>
  {
    // console.log(data);
    setUsername(data.name);
  },[data])
  return(
    <>
    <globalData.Provider value={{data,setData,user,setUser}}>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Start/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/Signup' element={<Signup/>}></Route>
      <Route element={<Protect/>}>
      
      <Route path='/:userName' element={<Home/>}/>
      <Route path="/:userName/card" element={<Card/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </globalData.Provider>
    </>
  )
}