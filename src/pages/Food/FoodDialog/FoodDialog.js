import {Grid, Select, MenuItem, CardMedia, TextField, Button, Container, useMediaQuery, IconButton, ListItem, List, ListItemIcon, ListItemText, Dialog} from "@material-ui/core";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {Cancel, CheckCircle, Close, DeleteOutline, Done, Edit, MoreHoriz, PhotoCamera } from "@material-ui/icons";
import React, { useState } from 'react'
import useStyles from './FoodDialogStyle';
import NumberFormatCustom from '../FormartNumber'
import { useDispatch, useSelector } from "react-redux";
import { actCloseFoodDialog, actError } from "../actions/actions";
import { DeleteFood, InsertFood, UpdateFood } from "../FoodService";
import { useTheme } from "@material-ui/core";
import { getCookie } from '../../../action/Login'

function FoodDialog(props) {
    const {data, handleClose} = props;
    const dispatch = useDispatch();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xs'));
    const StoreData = useSelector(state=>state.ChangeFoodData)
    const FoodCategory = StoreData.FoodCategory;
    const Pending  = StoreData.Pending;
    const classes = useStyles();
    const [openList, setOpenList] = useState(false)
    const [isEdit, setIsEdit] = useState(data?false:true)
    const [foodState, setFoodState] = useState(data?{
        id:data.id,
        img: null,
        imgURL:data.img,
        selected:true,
        category: data.category,
        name: data.name,
        price: data.price,
        moreInfo: data.moreInfo
    }:{
        id:null,
        img: null,
        imgURL:"",
        selected:false,
        category: FoodCategory[0],
        name: '',
        price: '',
        moreInfo: ''
    })

    const CloseDialog=()=>
    {
        if(data)
            dispatch(actCloseFoodDialog())
        else
            handleClose();
    }

    const selectedFile = (event) => { 
        if(event.target.files[0])
        {
            setFoodState({...foodState,img:event.target.files[0],imgURL: URL.createObjectURL(event.target.files[0]), selected:true})
        }
                  
    };
    
    const onChangeFoodState=(e)=>{
        if(e.target.name ==="price")
            setFoodState({...foodState,[e.target.name]: parseInt(e.target.value)})
        else
            setFoodState({...foodState,[e.target.name]:e.target.value})
    }

    const onChangeCategory=(e)=>{
            const category = FoodCategory.find(item=>item.id===e.target.value)
            setFoodState({...foodState,category: category})
    }

    const HandleFinish =(status, mesage) =>
    {
       
        if(data)
        {
            setIsEdit(false)
        }   
        else
            handleClose();
        
    }
    const onCancelClick =()=>
    {
        if(!data)
        {
            handleClose();
            setFoodState({
                id:null,
                img: null,
                imgURL:"",
                selected:false,
                category: FoodCategory[0],
                name: '',
                price: '',
                moreInfo: ''
            })
            return;
        }
        setFoodState(({
            ...foodState,
            id:data.id,
            img: null,
            imgURL:data.img,
            selected:data.img?true:false,
            category: data.category,
            name: data.name,
            price: data.price,
            moreInfo: data.moreInfo
        }))   
        setIsEdit(false);
        
            
    }

    const onDoneCLick = () =>{
        if(!(foodState.imgURL&&foodState.category!==-1&&foodState.name&&foodState.price&&foodState.moreInfo))
        {
            dispatch(actError("Lỗi: Vui lòng nhập đầy đủ thông tin!"))
            return ;
        }
        else if(isNaN(parseInt(foodState.price)))
            dispatch(actError("Lỗi: Giá món ăn phải là số!"))

        else if(foodState.price<0)
            dispatch(actError("Lỗi: Giá món ăn không thể là số âm!"))

        else if(foodState.id)
        {
            dispatch(UpdateFood(foodState,HandleFinish))
           
        }
        else
        {   
            dispatch(InsertFood(foodState,HandleFinish))
        }
       
    }

    const DeleteHandler =()=>{
        var r=window.confirm("Bạn có chắc chắn xoá thông tin sản phẩm!")
        if(r === true)
            dispatch(DeleteFood(foodState,CloseDialog))
    }

    const privileges = JSON.parse(getCookie("privileges"))

    const canUpdateFood = (permission) => permission.authority === "UPDATE_FOOD"

    return(
        <Dialog 
            open={true} 
            onClose={CloseDialog} 
            scroll="body" 
            keepMounted 
            maxWidth="lg"
            fullWidth 
            className={classes.DialogBackGround} 
        >
            <Container maxWidth='lg' className={classes.DialogBody}>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Pacifico&family=Patrick+Hand&family=Pattaya&display=swap" rel="stylesheet"/>
                <input
                    id="btn-upload"
                    name="btn-upload"
                    style={{ display: 'none' }}
                    type="file"
                    accept="image/*"
                    onChange={selectedFile}
                />
                <Grid item xs={12} sm={6} md={6} lg={6} className={classes.Media}>  
                    {foodState.imgURL?<CardMedia
                        image={foodState.imgURL}
                        className={classes.Image}
                    />:null} 

                    <label className={`BtnImg ${classes.BtnImg}`} htmlFor='btn-upload' >
                        {isEdit?<PhotoCamera  style={{fontSize:'50px'}}  />:null}
                    </label>

                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} className={classes.Content}>

                {privileges.some(canUpdateFood) ? <ClickAwayListener onClickAway={()=>setOpenList(false)}>
                    <Grid className={classes.Header}>
                        <IconButton classes={{label: classes.ButtonLabel }} style={{padding:'0'}} onClick={()=>{setOpenList(!openList)}}>
                            <MoreHoriz style={{fontSize:"30px"}} />
                        </IconButton>
                        <div className={classes.ListAction} style={{display:openList?'flex':'none'}}>
                            {!isEdit?<List component ='div'>
                                <ListItem 
                                    button 
                                    className={classes.ControlItem} 
                                    onClick={()=>{setIsEdit(true) 
                                                    setOpenList(!openList)}}>
                                    <ListItemIcon>
                                        <Edit style={{fontSize:'22px'}}/>
                                    </ListItemIcon>
                                    <ListItemText>Chỉnh sửa </ListItemText>
                                </ListItem>
                                <ListItem button className={classes.ControlItem} onClick={()=>{
                                    setOpenList(false)
                                    DeleteHandler()}}>
                                        <ListItemIcon>
                                            <DeleteOutline style={{fontSize:'22px'}}/>
                                        </ListItemIcon>
                                        <ListItemText> Xoá </ListItemText>
                                </ListItem>
                            </List>
                            :<List component ='div'>
                                <ListItem button className={classes.ControlItem} 
                                    onClick={()=>{
                                        onCancelClick()
                                        setOpenList(!openList)}}>
                                    <ListItemIcon>
                                        <Close style={{fontSize:'22px'}}/>
                                    </ListItemIcon>
                                    <ListItemText>Huỷ bỏ</ListItemText>
                                </ListItem>
                                <ListItem button className={classes.ControlItem} 
                                    onClick={()=>{
                                        onDoneCLick()
                                        setOpenList(!openList)}}
                                >
                                        <ListItemIcon>
                                            <Done style={{fontSize:'22px'}}/>
                                        </ListItemIcon>
                                        <ListItemText> Hoàn tất </ListItemText>
                                </ListItem>
                            </List>
                            
                            }
                        </div>
                    </Grid>
                </ClickAwayListener> : <></>}


                    <Grid className={classes.GrdName}>
                        <TextField 
                            disabled={!isEdit}
                            name='name' 
                            multiline  
                            placeholder="Tên" 
                            value={foodState.name?foodState.name.toUpperCase():foodState.name} 
                            onChange={onChangeFoodState}
                            fullWidth
                            InputProps={{
                                disableUnderline:true,
                                className:classes.tfName
                            }}
                        />
                    </Grid>
                    <Grid className={classes.GrdCategory}>
                        <Select
                            disabled={!isEdit}
                            name='category'
                            value={foodState.category.id}
                            onChange={onChangeCategory}
                            displayEmpty
                            className={classes.tfCategory}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value={-1} disabled>Loại món</MenuItem>
                            {                                            
                                (FoodCategory &&FoodCategory.map((data)=>{
                                    return (<MenuItem value={data.id} key={data.id}>{data.name}</MenuItem>)       
                                }))
                                

                            }
                        </Select> 
                    </Grid>
                    <Grid className={classes.GrdPrice}>
                        <TextField
                            disabled={!isEdit}
                            value={foodState.price}
                            onChange={onChangeFoodState}
                            name="price"
                            id="price"
                            placeholder="Giá"
                            fullWidth
                            InputProps={{
                                inputComponent: NumberFormatCustom,
                                style:{textAlignLast:'start'},
                                disableUnderline: true,
                                className: classes.tfPrice
                            }}
                            
                        />
                    </Grid>
                    <Grid className={classes.GrdMoreInfo}>
                    <TextField 
                        disabled={!isEdit}
                        name='moreInfo' 
                        placeholder="Mô tả"
                        fullWidth 
                        value={foodState.moreInfo} 
                        onChange={onChangeFoodState}
                        rows={matches?5:15}
                        rowsMax={matches?10:15} 
                        InputProps={{
                            disableUnderline:true,
                            className: classes.tfMoreInfo
                        }}
                        multiline
                    />
                    </Grid>

                    {isEdit?<Grid className={classes.Footer}>
                        <Button
                            disabled={Pending} 
                            onClick={onDoneCLick} 
                            className=  {`${classes.button} ${classes.btnDone}`} 
                            classes={{ label: classes.ButtonLabel }}
                            startIcon={<CheckCircle fontSize='large'/>}
                        >
                        HOÀN TẤT
                        </Button>
                            
                        <Button 
                            disabled={Pending} 
                            onClick={onCancelClick} 
                            className= {`${classes.button} ${classes.btnCancel}`}
                            classes={{ label: classes.ButtonLabel }}
                            startIcon={<Cancel fontSize='large'/>}
                        >
                        HUỶ BỎ
                        </Button>
                    </Grid>:null}
                </Grid>
            </Container>
        </Dialog>
    )
          
}

export default FoodDialog

