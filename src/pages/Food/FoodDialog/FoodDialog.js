import { Dialog, Grid, Select, MenuItem, CardMedia, TextField, Button} from "@material-ui/core";
import {PhotoCamera } from "@material-ui/icons";
import React, { useEffect, useState } from 'react'
import useStyles from './FoodDialogStyle';
import DoneIcon from '@material-ui/icons/Done'
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import NumberFormatCustom from '../FormartNumber'
import FoodService from "../FoodService";

function FoodDialog(props) {
    const [dataCategory, setDataCategory] = useState([])
    const {open, data, handleUpdate, handleClose, AlertHandler} = props;
    const classes = useStyles();
    const [inProgress, setInProgress] = useState(false);
    const [isEdit, setIsEdit] = useState(data?false:true)
    const [foodState, setFoodState] = useState(data?{
        id:data.id,
        img: null,
        imgURL:data.img,
        selected:true,
        category: -1,
        name: data.name,
        price: data.price,
        moreInfo: data.moreInfo
    }:{
        id:null,
        img: null,
        imgURL:"",
        selected:false,
        category: -1,
        name: '',
        price: '',
        moreInfo: ''
    })

    const selectedFile = (event) => { 
        if(event.target.files[0])
        {
            setFoodState({...foodState,img:event.target.files[0],imgURL: URL.createObjectURL(event.target.files[0]), selected:true})
        }
                  
    };

    const InitData = (dataCategory)=>
    {
        setDataCategory(dataCategory)
        setFoodState({...foodState, category: data?data.category.id:-1})
       
    }

    useEffect(()=>{
        FoodService.GetCategoryData(InitData);
        },[])
    
    const onChangeFoodState=(e)=>{
        if(e.target.name ==="price")
            setFoodState({...foodState,[e.target.name]: parseInt(e.target.value)})
        else
            setFoodState({...foodState,[e.target.name]:e.target.value})
    }

    const HandleFinish =(status, mesage) =>
    {
        AlertHandler(status,mesage);
        setInProgress(false)
        if(status==='success')
            handleClose();
        
    }
    const onEditCLick =()=>
    {
        setIsEdit(true);
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
                category: -1,
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
            category: data.category.id,
            name: data.name,
            price: data.price,
            moreInfo: data.moreInfo
        }))   
        setIsEdit(false);
        
            
    }
    const AlertHandle =(status, mesage)=>
    {
        AlertHandler(status, mesage);
        if(status==='success')
        {
            handleClose()
        }
    }
    const onDeleteClick =()=>
    {
        var r=window.confirm("Bạn có chắc chắn xoá thông tin sản phẩm!")
        if(r === true)
            FoodService.DeleteFood(data.id,handleUpdate,AlertHandle)
    }

    const onDoneCLick =  async () =>{
        if(!(foodState.imgURL&&foodState.category!==-1&&foodState.name&&foodState.price&&foodState.moreInfo))
        {
           AlertHandler("error", "Lỗi: Vui lòng nhập đầy đủ thông tin")
            return ;
        }

        if(foodState.id)
        {
            setInProgress(true)
            FoodService.EditFood(foodState, handleUpdate,HandleFinish);
           
        }
        else
        {   
            setInProgress(true)
           FoodService.InsertFood(foodState, handleUpdate,HandleFinish);
        }
       
    }



    return(
        <Dialog 
            open={open}
            scroll="body" 
            keepMounted
            maxWidth="lg"
            onClose={handleClose}
        >
            
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
        <Grid container className={classes.FoodContainer}>
            <Grid item xs={12} sm={6} md={6} lg={6} className={classes.MediaContainer}>
                
                <CardMedia
                        className={`Media ${classes.Media}`}
                        image={foodState.imgURL}
                >

                <label className={`BtnImg ${classes.BtnImg}`} htmlFor='btn-upload' >
                   {isEdit?<PhotoCamera  style={{fontSize:'50px'}}  />:null}
                </label>
                </CardMedia>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} className={classes.InfoContainer}>
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
                        value={foodState.category}
                        onChange={onChangeFoodState}
                        displayEmpty
                        className={classes.tfCategory}
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value={-1} disabled>Loại món</MenuItem>
                        {                                            
                            (dataCategory &&dataCategory.map((data)=>{
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
                    InputProps={{
                        disableUnderline:true,
                        className: classes.tfMoreInfo
                    }}
                    multiline
                />
                </Grid>

                <Grid className={classes.ControlContainer}>
                    {isEdit?
                        <Grid className={classes.ControlGroup}>
                            <Button
                                disabled={inProgress} 
                                onClick={onDoneCLick} 
                                className=  {`${classes.button} ${classes.btnDone}`} 
                                classes={{ label: classes.ButtonLabel }}
                                startIcon={<DoneIcon fontSize='large'/>}
                            >
                            HOÀN TẤT
                            </Button>
                                
                            <Button 
                                disabled={inProgress} 
                                onClick={onCancelClick} 
                                className= {`${classes.button} ${classes.btnCancel}`}
                                classes={{ label: classes.ButtonLabel }}
                                startIcon={<CloseIcon fontSize='large'/>}
                            >
                            HUỶ
                            </Button>
                        </Grid>:
                        <Grid className={classes.ControlGroup}>
                            <Button 
                                disabled={inProgress} 
                                onClick={onEditCLick} 
                                className= {`${classes.button} ${classes.btnEdit}`}
                                classes={{ label: classes.ButtonLabel }}
                                startIcon={<EditIcon fontSize="large"/>}
                            >
                            CHỈNH SỬA
                            </Button>

                            <Button 
                            disabled={inProgress} 
                            onClick={onDeleteClick} 
                            className={`${classes.button} ${classes.btnDelete}`}
                            classes={{ label: classes.ButtonLabel }}
                            startIcon={<DeleteIcon/>}
                            >
                            XOÁ
                            </Button>
                        </Grid>
                    }
                </Grid>
            </Grid>
        </Grid>
           
        </Dialog>
    )
          
}

export default FoodDialog

