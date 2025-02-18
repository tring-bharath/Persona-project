import tringapps from'./assets/tringapps-copy-2.png';
import {Link} from 'react-router-dom'
import { globalData } from './App';
import { useContext,useEffect } from 'react';
export default function Header()
{
    const {user,setUser,userName} =useContext(globalData);
    return(
        <>
            <div className='header d-flex justify-content-between p-3 position-sticky fixed-top'>
                <img className='' src={tringapps}/>
                {user===null?(
                <div className='d-flex justify-content-between align-items-center'>
                    <Link to={'/Login'}><button className='border-0 mx-5  px-4 py-2 h5 login'>Login</button></Link>
                    <Link to={'/Signup'}><button className='border-0 px-4 py-2 h5 signup'>Sign UP</button></Link>
                </div>
                ):(
                <div className='d-flex justify-content-between  '>
                    <p className='px-2 pt-1 text-white align-items-center h4'>{userName}</p>
                    <Link to={'/'}><button className='border-0 mx-5  px-4 py-2 h5 logout h5 text-info h5 border-info p-1' onClick={()=>setUser(null)}>Logout</button></Link>
                </div>
                )
            }
            </div>
        </>
    )
}