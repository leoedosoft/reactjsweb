/* eslint-disable no-const-assign */
import { useContext } from 'react';
import {Link} from 'react-router-dom'
import { AuthContext } from './security';


function HeaderComponent() {

    const { user } = useContext( AuthContext );
    const authContext = useContext( AuthContext );
    

    let isAuthenticated = false;
    
    if(user && user.isAuthenticated){
        isAuthenticated = user.isAuthenticated;
    }

    function logout() {
        authContext.logout()
    }

    return (
        
        <header className="border-bottom border-light border-5 mb-5 p-2">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                        <a className="navbar-brand ms-2 fs-2 fw-bold text-black" href="https://www.in28minutes.com">Teoresi_Blogs</a>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    {isAuthenticated 
                                        && <Link className="nav-link" to="/welcome/in28minutes">Home</Link>}
                                    
                                </li>
                                <li className="nav-item">
                                    {isAuthenticated 
                                            && <Link className="nav-link" to="/blogs">Blogs</Link>}                                    
                                </li>
                            </ul>
                        </div>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                {isAuthenticated &&
                                    <span className="nav-link">{user.username}</span> }
                            </li>
                            <li className="nav-item">
                                {!isAuthenticated &&
                                    <Link className="nav-link" to="/login">Login</Link> }
                            </li>
                            <li className="nav-item">
                                {isAuthenticated &&
                                    <Link className="nav-link" to="/logout" onClick={logout}>Logout</Link>}
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>

    )
}

export default HeaderComponent