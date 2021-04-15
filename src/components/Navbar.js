import React, {useState} from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import {Link} from 'react-router-dom';
import {SidebarData} from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    return (
        <>
        <IconContext.Provider value={{color: '#fff'}}>
            <div className="navbar">
                <Link to="#" className="menu-bars">
                    <FaIcons.FaBars onClick={showSidebar}/>
                </Link>
                
                <div className="recent-item">
                    <div class="bell-noti">
                        <FaIcons.FaRegBell class="bell-noti-icon"></FaIcons.FaRegBell>
                        <div class="bell-noti-status"></div>
                    </div>
                    <div className="recent-info">
                        <h3 className="recent-author">Nguyễn Đức Hướng</h3>
                        <span className="recent-position">Admin</span>
                    </div>
                    <img src="https://images.complex.com/complex/images/fl_lossy,q_auto/c_crop,h_1400,w_1374,x_0,y_100/v1/el91rtzrnvpaeemkjegt/girl-in-red-3" alt="" className="recent-image" />
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
