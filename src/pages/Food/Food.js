import React, { useEffect, useState } from 'react'
import { MuiThemeProvider, Fab, Snackbar} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import useStyles from './Styles';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import { Alert } from '@material-ui/lab';
import FoodDialog from './FoodDialog/FoodDialog'
import FoodService from './FoodService'
import CategoryDialog from './CategoryDialog/CategoryDialog'
import FoodGroup from './FoodGroup/FoodGroup'
import {Element} from 'react-scroll'
import Header from './Header/Header'
import theme from './MuiTheme'
// import { useSelector } from 'react-redux'

function Food() {
    const classes = useStyles();
    const [fooDialogOpen, setFoodDialogOpen] = useState(false) 
    const [data, setData] =  useState([])
    const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
    const [category, setCategory] = useState([]);
    const [status, setStatus] = useState({open:false, mesage:"", severity:"error"});
    const [keyword,setKeyword] = useState("");
    const finalData = data.filter((item)=>{return (keyword==="" || item.name.toLowerCase().search(keyword)!==-1)})
                        .sort((food1 , food2)=>{return food1.price - food2.price})

    useEffect(()=>{
        FoodService.GetFoodData(setData);
        FoodService.GetCategoryData(setCategory) 
        
    },[])


    const AlertHandler = (status, mesage) =>
    {
        setStatus({open:true, mesage:mesage, severity:status})
    }

    const handleCloseAlert = ()=>
    {
        setStatus({...status,open:false})
    }

    const handleFoodDialogClose=()=>{
         setFoodDialogOpen(false);
    }

    const handlefooDialogOpen = ()=>
    {
         setFoodDialogOpen(true);
    }  
    const handleCategoryDialogClose =()=>
    {
        setCategoryDialogOpen(false);
    }

    const handleUpdate = async (TYPE,info)=>
    {
        switch(TYPE)
        {
            case "DELETE":
                {
                    const Updated = data.filter((item)=>{return item.id!==info})
                    setData(Updated)
                    break;
                }
            case "EDIT":
                {   
                    let Updated = data.filter((item)=>{return item.id!==info.id})
                    Updated.push(info);
                    setData(Updated)
                    break;
                }
            case "INSERT":
                {
                    let Updated = data.slice();
                    Updated.push(info);
                    setData(Updated);
                    break;
                }
            default :
            {
                break;
            }
        }
        
    }

    function scrollHandler(){
        var header = document.querySelector(".FoodHeader")
        if(header!=null)
            header.classList.toggle(classes.ScrollHeader,window.scrollY > 80)
    }
    return (
        <MuiThemeProvider theme={theme}>
        <div>
            {
                window.addEventListener('scroll', scrollHandler)
            }
            <Header  category={category} setKeyword={setKeyword} id="Food_header"   className={`FoodHeader ${classes.FoodHeader}`}></Header>
            {
                category.map((group)=>
                {
                    return(
                        <Element key = {group.id} name={`category_tab_${group.id}`} style={{ marginBottom:'400px'}} >
                            <FoodGroup key={group.id} foodData={finalData} category={group} AlertHandler={AlertHandler} handleUpdate={handleUpdate}></FoodGroup>
                        </Element>
                    )
                })
            }  
            <div className={classes.buttonArea} >
                <Fab  color='primary' aria-label='add' variant='extended'   onClick={handlefooDialogOpen} className={`insertFab ${classes.InsertFab}`} classes={{label: classes.ButtonLabel }}>
                    <AddIcon />
                Thêm món ăn 
                </Fab>
               

                <Fab color='primary' aria-label="edit" variant='extended'  className='categoryFab' onClick={()=>{setCategoryDialogOpen(!categoryDialogOpen)}}  classes={{ root:classes.MenuFab, label:classes.ButtonLabel }} >
                    <RestaurantMenuIcon />
                    Quản lý loại món 
                </Fab>   
            </div>  

            {categoryDialogOpen?<CategoryDialog  Open={categoryDialogOpen} handleClose={handleCategoryDialogClose} ></CategoryDialog>:null}
            {fooDialogOpen?<FoodDialog AlertHandler={AlertHandler} open={fooDialogOpen} handleClose={handleFoodDialogClose} handleUpdate={handleUpdate}></FoodDialog>:null}
            
        <Snackbar open={status.open} autoHideDuration={4000} onClose={handleCloseAlert} >
            <Alert onClose={handleCloseAlert} severity={status.severity} >
            {status.mesage}
            </Alert>
        </Snackbar>
        </div>
        </MuiThemeProvider>
    )

    
}

export default Food;

