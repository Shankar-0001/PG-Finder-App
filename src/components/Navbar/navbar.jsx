import './navbar.css'
import { Link } from 'react-router-dom';

export function NavBar(){
    return(
        <div className="navbars">
            <div className="btns">
                <Link to='/' className='btnBox'>Login</Link>
                <Link to='/signup' className='btnBox'>Signup</Link>
                <div className="navBarTitle">
                    <span>--PlatFormPro--</span>
                </div>
                {/* <div className="socials">
                    <span className='bi bi-github icons'></span>
                    <spn className='bi bi-linkedin icons'></spn>
                </div> */}
            </div>
            
        </div>
    )
}
export default NavBar;