import { AppBar, Box, Container, Grid, IconButton, InputAdornment, Tab, Tabs, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LobbyCard from "../LobbyCard/LobbyCard"
import useStyles from './LobbyPageStyles'
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';

function LobbyPage(props) {
    const {...other} = props 
    const classes = useStyles();
    const StoreData = useSelector(state => state.changeLobbyData);
    const Lobby = StoreData.Lobby;
    const LobbyCategory = StoreData.LobbyCategory;
    const [tab, setTab] = useState(0)
    const [keyword, setKeyword] = useState({open:false,value:''})

    function GotoEnd(){
        window.scrollTo({top: document.body.clientHeight, behavior:'smooth'});
    }
    
    function GotoTop(){
        window.scrollTo({top: 0, behavior:'smooth'});
    }

    function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    function changePage(event, newValue){
        setTab(newValue)
    }

    function FilterCategory(data, category){
        if(!category)
            return data
        else
        {
            return data.filter(item=>{ 
                return (category.id ===  item.lobbyCategory.id)})
        }
            
    }
    function changeKeyword(event)
    {
        if(event.key==='Enter')
           setKeyword({...keyword,value:event.target.value})
    }

    const scrollHandler = (event)=>{
        var header = document.querySelector(".AppBar")
        if(header!=null)
            header.classList.toggle(classes.AppBarScroll,window.scrollY > 80)
    }

    function OpenSearchBox (){
        setKeyword({...keyword,open:!keyword.open})
    }

    function PagePriceItemSort(array , order) {
        if(order==='asc')
            return array.sort((item1, item2) =>{
                return item1.minUnitPriceTable - item2.minUnitPriceTable
            })
        else
            return array.sort((item1, item2)=>{
                return item2.minUnitPriceTable - item1.minUnitPriceTable})
    }

    useEffect(()=>{
        window.addEventListener("scroll", scrollHandler)
    },[])
    if(LobbyCategory.length>0)
    return (
        <>
         <Container fixed className={classes.page} {...other}>
            <AppBar className={`AppBar ${classes.AppBar}`}>
                <Tabs 
                    value={tab} 
                    onChange={changePage} 
                    aria-label="simple tabs example"
                    variant="scrollable"
                    scrollButtons="on"
                    className={classes.Tabs}
                >
                    <Tab label="Tất cả"  {...a11yProps(0)} className={classes.Tab}/>
                    {
                        LobbyCategory.map(category=>{
                            return(<Tab key={category.id} label={category.name}  {...a11yProps(category.id)} className={classes.Tab}/>)
                        })
                    }                
                </Tabs>
                <IconButton classes={{root:classes.SearchButton, label:classes.LabelButton}} onClick={OpenSearchBox}>
                    <SearchIcon className={`${keyword.value===''?classes.SearchIcon:classes.actSearchIcon}`}/>
                </IconButton>
                <Grid className={classes.SearchBox} style={{display:keyword.open?'flex':'none'}}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        placeholder="Tìm kiếm sảnh"
                        onKeyDown={changeKeyword}
                        className={classes.TextSearch}
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon style={{fontSize:'25px'}}/>
                              </InputAdornment>
                            ),
                          }}
                    />
                </Grid>
            </AppBar>
           
            <TabPanel value={tab} index={0} className={classes.TabPanel}>
                <Container maxWidth="lg" className={classes.container} >
                    {
                       PagePriceItemSort(Lobby,'asc').map((lobby)=>{
                            return(<LobbyCard key={lobby.id} xs={12} sm={6} md={4} lg={4} lobby={lobby} />)})
                    }
                    <LobbyCard id="insert_lobby"  xs={12} sm={6} md={4} lg={4} />
                </Container>
            </TabPanel>
            {
                LobbyCategory.map((category,index)=>{
                    return(
                        <TabPanel key={category.id} value={tab} index={index+1} >
                            <Container maxWidth="lg" className={classes.container}>
                                {
                                    PagePriceItemSort(FilterCategory(Lobby,category),'asc').map((lobby)=>{
                                        return(<LobbyCard key={lobby.id} xs={12} sm={6} md={4} lg={4} lobby={lobby} />)})
                                }
                                <LobbyCard id="insert_lobby"  xs={12} sm={6} md={4} lg={4} lobbyCategory={category}/>
                            </Container>
                        </TabPanel>
                    )
                })
            }
        <IconButton id="insert_lobby" className={classes.ButtonEnd} classes={{label:classes.LabelButton}} onClick={GotoEnd}>
                <ExpandMore style={{fontSize:'40px'}}/>
        </IconButton>
        <IconButton id="insert_lobby" className={classes.ButtonTop} classes={{label:classes.LabelButton}} onClick={GotoTop}>
                <ExpandLess style={{fontSize:'40px'}}/>
        </IconButton>
        </Container>
    </>
    )
    else
        return(<div></div>)
    
}

export default LobbyPage;


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={4}>
           {children}   
          </Box>
        )}
      </div>
    );
  }
  
