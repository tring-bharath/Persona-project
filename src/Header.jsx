import tringapps from'./assets/tringapps-copy-2.png';
import {Link} from 'react-router-dom'
export default function Header()
{
    return(
        <>
            <div className='header'>
                <img src={tringapps}/>
                <div className='register'>
                    <Link to={'/Login'}><button>Login</button></Link>
                    <Link to={'/Signup'}><button>Sign UP</button></Link>
                </div>
            </div>
        </>
    )
}