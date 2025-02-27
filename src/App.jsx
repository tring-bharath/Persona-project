import { useState,useEffect,createContext } from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from "./components/Registration/Login";
import Signup from "./components/Registration/Signup";
import Start from "./components/Start";
import Home from "./components/Persona/Home";
import Header from "./components/Header";
import Protect from "./components/Protect";
import Card from "./components/Persona/Card";
import "@fontsource/poppins";
import { ToastContainer } from "react-toastify";
export const cardsContext=createContext();
export const globalData=createContext();
export default function App()
{
  const [cards, setCards] = useState([]);
  const [data,setData]=useState({});
  const [users,setUsers]=useState([]);
  const [user,setUser]=useState(null);
  const [newCard,setNewCard]=useState([{id:"",Quote:"",description:"",attitude:"",points:"",jobs:"",activities:""}]);
  const [userName,setUsername]=useState();
  const [index,setIndex]=useState(null);
  useEffect(()=>
  {
    setUsername(data.name);
    setUsers([...users,data])
  },[data])
  return(
    <div className="all">
    <globalData.Provider value={{data,setData,userName,user,setUser,users,setUsers}}>
    <cardsContext.Provider value={{cards,setCards,userName,newCard,setNewCard,index,setIndex}}>
    <BrowserRouter>
    <Header/>
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<Start/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/Signup' element={<Signup/>}></Route>
      {/* <Route element={<Protect/>}> */}
      
      <Route path='/:userName' element={<Home/>}/>
      <Route path="/:userName/:cardId" element={<Card/>}/>

      {/* </Route> */}
    </Routes>
    </BrowserRouter>
    </cardsContext.Provider>
    </globalData.Provider>
    </div>
  )
}