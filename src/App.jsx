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
import "@fontsource/poppins";
import { ToastContainer } from "react-toastify";
export const cardsContext=createContext();
export const globalData=createContext();
export default function App()
{
  const [cards, setCards] = useState([]);
  const [data,setData]=useState({name:'bharath',email:'acs@gmail.com',password:'acs@gmail.com'});
  const [users,setUsers]=useState([{name:'bharath',email:'acs@gmail.com',password:'acs@gmail.com'}]);
  const [user,setUser]=useState(null);
  const [newCard1,setNewCard]=useState([{id:"",Quote:"",description:"",attitude:"",points:"",jobs:"",activities:""}]);
  const [userName,setUsername]=useState();
  const [index,setIndex]=useState(null);
  useEffect(()=>
  {
    setUsername(data.name);
    setUsers([...users,data])
    // console.log(users);
  },[data])
  useEffect(()=>{
    console.log(cards);
  },[cards])
  return(
    <div className="all">
    <globalData.Provider value={{data,setData,userName,user,setUser,users,setUsers}}>
    <cardsContext.Provider value={{cards,setCards,userName,newCard1,setNewCard,index,setIndex}}>
    <BrowserRouter>
    <Header/>
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<Start/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/Signup' element={<Signup/>}></Route>
      <Route element={<Protect/>}>
      
      <Route path='/:userName' element={<Home/>}/>
      <Route path="/:userName/:cardId" element={<Card/>}/>

      </Route>
    </Routes>
    </BrowserRouter>
    </cardsContext.Provider>
    </globalData.Provider>
    </div>
  )
}