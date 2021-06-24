import { Grid, IconButton, InputAdornment, Tab, Tabs, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import {Link} from 'react-scroll'
import useStyles from './HeaderStyle'
import SearchIcon from '@material-ui/icons/Search';

function Header(props){
    const {category,containerId, setKeyword, ...other} =props;
    const [openSearchBox, setOpenSearchBox] = useState(false)
    const classes = useStyles();
    const value =1;
    const handleSetKeyword = (e)=>
    {
      if (e.key === "Enter") 
        setKeyword(e.target.value.toLowerCase())
    }

    var prevScrollpos = window.pageYOffset;
    function scrollHandler(){
      var currentScrollPos = window.pageYOffset;
      var header = document.querySelector(".FoodHeader")
      if(header!=null)
      {
          if (prevScrollpos > currentScrollPos) {
              header.style.top = "80px";
          } else {
              header.style.top = "-85px";
          }
      }
      prevScrollpos = currentScrollPos;
  }
  window.addEventListener('scroll', scrollHandler);

    useEffect(()=>{
      // window.addEventListener('scroll', scrollHandler)
    },[])
    if(category.length===0)
      return null
    return (

      <Grid className={`${classes.Header} FoodHeader `} {...other}>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=KoHo:wght@600&display=swap" rel="stylesheet"/>
        <Tabs 
          classes={{root:classes.MenuTabs}}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          value={value}
        >
          {
            category.map((tab)=>
            {
              return(
                <Tab 
                  key={tab.id}
                  label={tab.name} 
                  to={`category_tab_${tab.id}`} 
                  activeClass={classes.activeTab}
                  spy={true}
                  smooth={true}
                  duration={500}
                  component={Link}  
                  containerId={containerId}
                  classes={{ root: classes.Tab}}
                />
              )
            })
          }
        </Tabs>
        
        <IconButton classes={{root:classes.button, label:classes.buttonLabel}} onClick={()=>{setOpenSearchBox(!openSearchBox)}}>
            <SearchIcon  style={{fontSize:'30px'}} />
        </IconButton>
        <Grid className={classes.SearchBox} style={{display:openSearchBox?'':'none'}}>
          <TextField
            name='search' 
            placeholder="Tìm kiếm sản phẩm"  
            onKeyPress={handleSetKeyword}
            fullWidth 
            InputProps={{
              disableUnderline:true,
              className: classes.tfMoreInfo,
              startAdornment: (
                <InputAdornment position="start">
                  < SearchIcon style={{fontSize:'30px'}}/>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        
      </Grid>
    )
}

export default Header;