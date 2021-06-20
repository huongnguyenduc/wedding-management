import React from 'react';
import Wedding from './pages/Wedding/Wedding';
import TableService from './pages/Wedding/Table-Service/Table-Service';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Bill from './pages/Bill/Bill';
import DetailBill from './pages/Bill/DetailBill';
import Access from './pages/Access/Access';
import Service from './pages/Service/Service';
import Policy from './pages/Policy/Policy';
import Food from './pages/Food/Food';
import Lobby from './pages/Lobby/Lobby';
import Calendar from './pages/Home/Calendar';
import Login from './pages/Login/Login';
import {Redirect} from 'react-router-dom';
import {getCookie} from './action/Login'

const routes = [
    {
        path: '/login',
        exact: true,
        main: () => <Login/>
    },
    {
        path: '/',
        exact: true,
        main: () => {
            if(getCookie("token")!="") 
                return (<Calendar />)
            else
                return (<Redirect to='./Login'/>)
            }
    },
    {
        path: '/service',
        exact: true,
        main: () =>{
            if(getCookie("token")!="") 
                return (<Service />)
            else
                return (<Redirect to='./Login'/>)
            } 
    },
    {
        path: '/policy',
        exact: true,
        main: () =>{
            if(getCookie("token")!="") 
                return ( <Policy />)
            else
                return (<Redirect to='./Login'/>)
            } 
    },
    {
        path: '/food',
        exact: true,
        main: () =>{
            if(getCookie("token")!="") 
                return (<Food />)
            else
                return (<Redirect to='./Login'/>)
            } 
    },
    {
        path: '/lobby',
        exact: true,
        main: () =>{
            if(getCookie("token")!="") 
                return (<Lobby />)
            else
                return (<Redirect to='./Login'/>)
            } 
    },
    {
        path: '/wedding',
        exact: true,
        main: () =>{
            if(getCookie("token")!="") 
                return ( <Wedding />)
            else
                return (<Redirect to='./Login'/>)
            } 
    },
    {
        path: '/bill',
        exact: true,
        main: () =>{
            if(getCookie("token")!="") 
                return (<Bill />)
            else
                return (<Redirect to='./Login'/>)
            } 
    },
    {
        path: '/access',
        exact: true,
        main: () =>{
            if(getCookie("token")!="") 
                return (<Access />)
            else
                return (<Redirect to='./Login'/>)
            }  
    },
    {
        path: '/bill/:weddingId',
        exact: false,
        main: ({match, history}) =>{
            if(getCookie("token")!="") 
                return (<DetailBill match={match} history={history}/>)
            else
                return (<Redirect to='./Login'/>)
            }   
    },
    {
        path: '/wedding/:weddingId/:lobbyId',
        exact: true,
        main: ({match, history}) =>{
            if(getCookie("token")!="") 
                return (<TableService  match={match} history={history}/>)
            else
                return (<Redirect to='./Login'/>)
            }    
    },
    {
        path: '',
        exact: false,
        main: () => <NotFoundPage />
    }
];

export default routes;