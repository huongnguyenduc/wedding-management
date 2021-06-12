import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Lobby from './pages/Lobby/Lobby';
import Wedding from './pages/Wedding/Wedding';
import Navbar from './components/Navbar';
import SignUp from './pages/Login/SignUp';
import Food from './pages/Food/Food';
import Policy from './pages/Policy/Policy';
import Receipt from './pages/Receipt';
import Revenue from './pages/Revenue';
import Service from './pages/Service/Service'

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Switch>
                <Route exact path='/Login' component={Login}/>
                <Route exact path='/SignUp' component={SignUp}/>
                <Route exact path='/' render={()=>{
                    return localStorage.getItem('user')?<Home/>:<Redirect to='./Login'/>
                }}></Route>
                <Route exact path='/Home' render={()=>{
                    return localStorage.getItem('user')?<Home/>:<Redirect to='./Login'/>
                }}>
                </Route>
                <Route exact path='/Food' render={()=>{
                    return localStorage.getItem('user')?<Food/>:<Redirect to='./Login'/>
                }}>
                </Route>
                <Route exact path='/Lobby' render={()=>{
                    return localStorage.getItem('user')?<Lobby/>:<Redirect to='./Login'/>
                }}>
                </Route>
                <Route exact path='/wedding' render={()=>{
                    return localStorage.getItem('user')?<Wedding/>:<Redirect to='./Login'/>
                }}>
                </Route>
                <Route exact path='/Policy' render={()=>{
                    return localStorage.getItem('user')?<Policy/>:<Redirect to='./Login'/>
                }}>
                </Route>
                <Route exact path='/Receipt' render={()=>{
                    return localStorage.getItem('user')?<Receipt/>:<Redirect to='./Login'/>
                }}>
                </Route>
                <Route exact path='/Revenue' render={()=>{
                    return localStorage.getItem('user')?<Revenue/>:<Redirect to='./Login'/>
                }}>
                </Route>
                <Route exact path='/Service' render={()=>{
                    return localStorage.getItem('user')?<Service/>:<Redirect to='./Login'/>
                }}>
                </Route>
            </Switch>   
      </Router>
     
    </>
  );
}

export default App;
