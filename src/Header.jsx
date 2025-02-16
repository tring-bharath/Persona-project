import tringapps from'./assets/tringapps-copy-2.png';
import {Link} from 'react-router-dom'
import { globalData } from './App';
import { useContext,useEffect } from 'react';
export default function Header()
{
    const {user,setUser} =useContext(globalData);
    useEffect(()=>
    {
        console.log(user);
    },[user])
    return(
        <>
            <div className='header d-flex justify-content-between p-3 bg-danger'>
                <img className='' src={tringapps}/>
                {user===null?(
                <div className='d-flex justify-content-between align-items-center'>
                    <Link to={'/Login'}><button className='mx-5 rounded px-4 py-1 bg-primary'>Login</button></Link>
                    <Link to={'/Signup'}><button className='rounded px-4 py-1 bg-primary'>Sign UP</button></Link>
                </div>
                ):(
                    <div className='d-flex justify-content-between align-items-center'>
                    <Link to={'/'}><button className='mx-5 rounded px-4 py-1 bg-primary' >Logout</button></Link>
                </div>
                )
            }
            </div>
        </>
    )
}