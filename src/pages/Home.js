import React from 'react'
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router'



function Home() {
    let history = useHistory()
    const Logout=()=>
    {
        localStorage.removeItem('user');
        history.replace('/')
    }
    return (
        <div className="home">
            <h1>Home Page</h1>
            <Button
              type='button'
              variant="contained"
              color="primary"
              onClick={Logout}

            >
              Đăng xuất
            </Button>
        </div>
    )
}

export default Home;
