import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { userService } from '../service/userService';

const Menu = () => {

    const isLogged = userService.isLogged();

    const userInfo = useSelector((state) => state.user);

    const logout = () => {
        userService.logout()
    }

    return (
        <nav className="main-nav">
            <NavLink to="/">
                <img
                   className="main-nav-logo-image"
                    src="./asset/argentBankLogo.png"
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </NavLink>
        <div id='logged'>
            {isLogged && userInfo !== null
            ?<NavLink onClick={logout} to="/sign">
                <i className="fa fa-user-circle"></i>
                      {userInfo.firstName} 
                      <i className="fa fa-sign-out"></i>
                       Logout
            </NavLink>
            :<NavLink to="/sign">
            <i className="fa fa-user-circle"></i>
            Sign In
        </NavLink>
            }
        </div>
    </nav>
    );
};

export default Menu;