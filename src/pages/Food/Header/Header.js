import { Grid, InputAdornment, Tab, Tabs, TextField } from '@material-ui/core';
import React from 'react'
import {Link} from 'react-scroll'
import useStyles from './HeaderStyle'
import SearchIcon from '@material-ui/icons/Search';

function Header(props){
    const {category,containerId, setKeyword, className} =props;
    const classes = useStyles();
    const value =1;
    const handleSetKeyword = (e)=>
    {
      if (e.key === "Enter") 
        setKeyword(e.target.value.toLowerCase())
    }

    if(category.length===0)
      return null
    return (

      <Grid className={`${classes.MenuContainer} ${className}`}>
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

        <TextField
          name='search' 
          placeholder="Tìm kiếm sản phẩm"  
          onKeyPress={handleSetKeyword} 
          InputProps={{
            disableUnderline:true,
            className: classes.tfMoreInfo,
            startAdornment: (
              <InputAdornment position="start">
                < SearchIcon style={{fontSize:'30px'}}/>
              </InputAdornment>
            ),
          }}
        >

        </TextField>
      </Grid>
    )
}

export default Header;