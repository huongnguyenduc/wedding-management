import React, {useEffect, useState} from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import {Link} from 'react-router-dom';
import {SidebarData} from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import {getCookie,setCookie} from '../action/Login'
import { useHistory } from 'react-router';
import {ClickAwayListener,  MuiThemeProvider,} from '@material-ui/core';
import UserUpdateDialog from '../pages/Access/Components/UserDialog/UserUpdateDialog';
import { useSnackbar } from 'notistack';
import { connect } from 'react-redux';
import { actUpdateUserRequest } from './../action/user';
import theme from '../components/MuiTheme';
function Navbar(props) {
    const [sidebar, setSidebar] = useState(false);
    const [controlPanel, setControlPanel] = useState(false)
    const showSidebar = () => setSidebar(!sidebar);
    const [userData, setUserData] = useState({fullname:'', image:'https://images.complex.com/complex/images/fl_lossy,q_auto/c_crop,h_1400,w_1374,x_0,y_100/v1/el91rtzrnvpaeemkjegt/girl-in-red-3', role:''})
    let history = useHistory();
    function logout()
    {
        setCookie("username","",-1)
        setCookie("image","",-1)
        setCookie("fullname","",-1)
        setCookie("token","",-1)
        setCookie("role","",-1)
        setCookie("privileges","",-1)
        history.replace('/')
    }
      var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
        if (document.getElementById("appBarTable")) document.getElementById("appBarTable").style.top = "80px";
    } else {
        document.getElementById("navbar").style.top = "-85px";
        if (document.getElementById("appBarTable")) document.getElementById("appBarTable").style.top = "-85px";
    }
    prevScrollpos = currentScrollPos;
    }
    
    useEffect(()=>{
        const image = getCookie("image")
        const fullname=getCookie("fullname")
        const role = getCookie("role")
        const username = getCookie("username")
        setUserData({fullName: fullname,fullname:fullname, image:image, role:role, username: username})
    },[])

    const [openUserDialog, setOpenUserDialog] = React.useState(false);

    const handleOpenUserDialog = () => {
        setOpenUserDialog(true);
    };

    const handleCloseUserDialog = () => {
        setOpenUserDialog(false);
    };
    const onSubmit = (user) => {
        return props.updateUser(user, updateSuccess, updateFailure);
    }
    const { enqueueSnackbar } = useSnackbar();
    const handleClickVariant = (variant, message) => {
        enqueueSnackbar(message, { variant, autoHideDuration: 3000 });
    };
    const updateSuccess = () => {
        handleClickVariant("success", "S???a th??ng tin ng?????i d??ng th??nh c??ng!")
    }

    const updateFailure = () => {
        handleClickVariant("error", "L???i h??? th???ng. S???a th??ng tin ng?????i d??ng th???t b???i!")
    }
    const privileges = getCookie("privileges") ? JSON.parse(getCookie("privileges")) : JSON.parse('[{"id":394,"authority":"UPDATE_USER","description":"Ch???nh s???a ng?????i d??ng"},{"id":393,"authority":"READ_USER","description":"Xem danh s??ch ng?????i d??ng"},{"id":395,"authority":"UPDATE_PER","description":"Ch???nh s???a ph??n quy???n"},{"id":398,"authority":"READ_SHIFT","description":"Xem danh s??ch ca"},{"id":399,"authority":"UPDATE_SHIFT","description":"Th??m s???a x??a ca"},{"id":392,"authority":"UPDATE_FEAST","description":"Th??m x??a s???a ti???c c?????i"},{"id":391,"authority":"READ_FEAST","description":"Xem danh s??ch ti???c c?????i"},{"id":396,"authority":"READ_FOOD","description":"Xem danh s??ch m??n ??n"},{"id":397,"authority":"UPDATE_FOOD","description":"Th??m s???a x??a m??n ??n"},{"id":400,"authority":"READ_LOBBY","description":"Xem danh s??ch s???nh"},{"id":401,"authority":"UPDATE_LOBBY","description":"Th??m s???a x??a s???nh"},{"id":402,"authority":"READ_LOBBYCATEGORY","description":"Xem danh s??ch lo???i s???nh"},{"id":403,"authority":"UPDATE_LOBBYCATEGORY","description":"Th??m s???a x??a lo???i s???nh"},{"id":404,"authority":"READ_SERVICE","description":"Xem danh s??ch d???ch v???"},{"id":405,"authority":"UPDATE_SERVICE","description":"Th??m s???a x??a d???ch v???"}]')

    const canShowMenuItem = (permission, access) => permission.authority === access
    return (
        <>
        <MuiThemeProvider theme={theme}>
            <div style={{paddingLeft: theme.spacing(2),}}>
                <UserUpdateDialog isUpdateNav={true} open={openUserDialog} handleClose={handleCloseUserDialog} initialValues={{...userData, password: ""}} onSubmit={onSubmit}/>
            </div>
        </MuiThemeProvider>
        <IconContext.Provider value={{color: '#fff'}}>
            <div className="navbar" id="navbar">
                <Link to="#" className="menu-bars">
                    <FaIcons.FaBars onClick={showSidebar}/>
                </Link>
                
                <div className="recent-item" onClick={()=>setControlPanel(!controlPanel)}>
                    {/* <div class="bell-noti">
                        <FaIcons.FaRegBell class="bell-noti-icon"></FaIcons.FaRegBell>
                        <div class="bell-noti-status"></div>
                    </div> */}
                    <div className="recent-info">
                        <h3 className="recent-author">{userData.fullname}</h3>
                        <span className="recent-position">{userData.role?userData.role.slice(5).toLowerCase():''}</span>
                    </div>
                    <img src={userData.image} alt="" className="recent-image" />
                    {controlPanel?<ClickAwayListener onClickAway={()=>setControlPanel(false)}>
                        <div className="recent-control">
                            <input type="button" value="T??i kho???n" className="control-logout" onClick={handleOpenUserDialog}/>
                            <input type="button" value="????ng xu???t" className="control-logout" onClick={logout}/>
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

const mapDispatchToProps = (dispatch, props) => {
    return {
        updateUser: (user, updateSuccess, updateFailure) => {
            dispatch(actUpdateUserRequest(user, updateSuccess, updateFailure));
        },
    }
}
export default connect(null, mapDispatchToProps)(Navbar);
