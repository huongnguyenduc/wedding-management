import React, {useState} from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import {Link} from 'react-router-dom';
import {SidebarData} from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import {getCookie,setCookie} from '../action/Login'
import { useHistory } from 'react-router';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    const [controlPanel, setControlPanel] = useState(false)
    const showSidebar = () => setSidebar(!sidebar);
    const fullname=getCookie("fullname")
    const image = getCookie("image")
    const role = getCookie("role")
    let history = useHistory();
    function logout()
    {
        setCookie("username","",-1)
        setCookie("image","",-1)
        setCookie("fullname","",-1)
        setCookie("token","",-1)
        setCookie("role","",-1)
        setCookie("privileges","",-1)
        console.log(document.cookie)
        history.replace('/')
    }
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
    } else {
        document.getElementById("navbar").style.top = "-85px";
    }
    prevScrollpos = currentScrollPos;
    }

    const privileges = JSON.parse(getCookie("privileges"))

    const canShowMenuItem = (permission, access) => permission.authority === access
    return (
        <>
        <IconContext.Provider value={{color: '#fff'}}>
            <div className="navbar" id="navbar">
                <Link to="#" className="menu-bars">
                    <FaIcons.FaBars onClick={showSidebar}/>
                </Link>
                
                <div className="recent-item" onClick={()=>setControlPanel(!controlPanel)}>
                    <div class="bell-noti">
                        <FaIcons.FaRegBell class="bell-noti-icon"></FaIcons.FaRegBell>
                        <div class="bell-noti-status"></div>
                    </div>
                    <div className="recent-info">
                        <h3 className="recent-author">{fullname}</h3>
                        <span className="recent-position">{role?role.slice(5).toLowerCase():''}</span>
                    </div>
                    <img src={image?image:"https://images.complex.com/complex/images/fl_lossy,q_auto/c_crop,h_1400,w_1374,x_0,y_100/v1/el91rtzrnvpaeemkjegt/girl-in-red-3"} alt="" className="recent-image" />
                    {controlPanel?<ClickAwayListener onClickAway={()=>setControlPanel(false)}>
                        <div className="recent-control">
                            <input type="button" value="Đăng xuất" className="control-logout" onClick={logout}/>
                        </div>
                    </ClickAwayListener>:null}
                    
                </div>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className="nav-menu-items" onClick={showSidebar}>
                    <li className="navbar-toggle">
                        <Link to="#" className="menu-bars">
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    {SidebarData.map((item, index) => {
                        if (item.path === "/access" && !privileges.some((permission) => canShowMenuItem(permission, "UPDATE_PER")) && !privileges.some((permission) => canShowMenuItem(permission, "READ_USER")))
                            return (<></>) 
                        else if (item.access && !privileges.some((permission) => canShowMenuItem(permission, item.access))) {
                            return (<></>)
                        } else
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link> 
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </IconContext.Provider>
        </>
    )
}

export default Navbar;
