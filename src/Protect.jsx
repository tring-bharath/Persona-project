import { useContext, useState } from "react";
import { Outlet,Navigate } from "react-router-dom";
import { globalData } from "./App";
export default function Protect()
{
    const {user,setUser}=useContext(globalData);
    return user?<Outlet/>:<Navigate to={"/login"}/>
}
