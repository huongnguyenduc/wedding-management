import React, { useEffect, useState } from 'react'
import { MuiThemeProvider, Fab, Snackbar, Backdrop, CircularProgress} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import useStyles from './Styles';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import { Alert } from '@material-ui/lab';
import FoodDialog from './FoodDialog/FoodDialog'
import CategoryDialog from './CategoryDialog/CategoryDialog'
import FoodGroup from './FoodGroup/FoodGroup'
import {Element} from 'react-scroll'
import Header from './Header/Header'
import theme from './MuiTheme'
import {GetFood, GetFoodCategory} from "./FoodService";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux'
import { actCloseError } from './actions/actions';
import { getCookie } from '../../action/Login'

function Food() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const StoreData = useSelector(state=>state.ChangeFoodData)
    const FoodData = StoreData.Food;
    const FoodCategory = StoreData.FoodCategory;
    const Pending = StoreData.Pending;
    const Status = StoreData.Status;
    const SelectedFood = StoreData.SelectedFood
    const [fooDialogOpen, setFoodDialogOpen] = useState(false) 
    const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
    


    const [keyword,setKeyword] = useState("");
    const finalData = FoodData.filter((item)=>{return (keyword==="" || item.name.toLowerCase().search(keyword)!==-1)})
                        .sort((food1 , food2)=>{return food1.price - food2.price})

    useEffect(()=>{
        dispatch(GetFood())
        dispatch(GetFoodCategory())
        
    },[])

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

    const CloseAlert = (e)=>
    {
        dispatch(actCloseError())
        if(e)
            e.stopPropagation()
    }

    const privileges = JSON.parse(getCookie("privileges"))

    const canUpdateFood = (permission) => permission.authority === "UPDATE_FOOD"
    
    return (
        
        <MuiThemeProvider theme={theme}>
        <div >
            <Backdrop open={Pending} className={classes.backdrop} onClick={(e)=>{e.stopPropagation()}}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <Header  category={FoodCategory} setKeyword={setKeyword} id="Food_header" ></Header>
            {
                FoodCategory.map((group, index)=>
                {
                    return(
                        <Element key = {group.id} name={`category_tab_${group.id}`} style={{paddingTop:index===0?'200px':'100px', paddingBottom:'100px'}}>
                            <FoodGroup key={group.id} foodData={finalData} category={group}></FoodGroup>
                        </Element>
                    )
                })
            }  
            {privileges.some(canUpdateFood) ? <div className={classes.buttonArea} >
                <Fab  color='primary' aria-label='add' variant='extended'   onClick={handlefooDialogOpen} className={`insertFab ${classes.InsertFab}`} classes={{label: classes.ButtonLabel }}>
                    <AddIcon />
                Thêm món ăn 
                </Fab>

                <Fab color='primary' aria-label="edit" variant='extended'  className='categoryFab' onClick={()=>{setCategoryDialogOpen(!categoryDialogOpen)}}  classes={{ root:classes.MenuFab, label:classes.ButtonLabel }} >
                    <RestaurantMenuIcon />
                    Quản lý loại món 
                </Fab>   
                
            </div> : <></>}  
        </div>

            {categoryDialogOpen?<CategoryDialog  Open={categoryDialogOpen} handleClose={handleCategoryDialogClose} ></CategoryDialog>:null}
            {fooDialogOpen?<FoodDialog handleClose={handleFoodDialogClose} ></FoodDialog>:null}
            {SelectedFood?<FoodDialog data={SelectedFood} ></FoodDialog>:null}
            
        <Snackbar open={Status.open} autoHideDuration={4000} onClose={CloseAlert} >
            <Alert onClose={CloseAlert} severity={Status.severity} >
            {Status.message}
            </Alert>
        </Snackbar>

        </MuiThemeProvider>
    )

    
}

export default Food;

