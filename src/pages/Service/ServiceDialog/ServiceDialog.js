
import { CardMedia, Container, Grid, ListItem, IconButton, List, ListItemIcon, TextField, Typography, ListItemText, Button, useTheme, useMediaQuery, Dialog } from '@material-ui/core'
import React, { useState } from 'react'
import useStyles from './DialogStyles'
import NumberFormatCustom from '../../Food/FormartNumber'
import { Cancel, CheckCircle, DeleteOutline, Edit, MoreHoriz, PhotoCamera } from '@material-ui/icons'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { useDispatch } from 'react-redux'
import {InsertService, UpdateService, DeleteService} from '../Connect'


function ServiceDialog(props)
{
    const {data, closeHandler, edit} = props
    const dispatch = useDispatch();
    const classes = useStyles()
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xs'));
    const [isEdit, setIsEdit] = useState((data&&!edit)?false:true)
    const [openList,setOpenList] = useState(false)
    const [ServiceData, setServiceData] = useState(data?{
        id:data.id,
        img:null,
        imgURL: data.img,
        name:data.name,
        price:data.price,
        moreInfo:data.moreInfo,
    }:{
        img:null,
        imgURl: '',
        name:'',
        price:'',
        moreInfo:'',
    });

    const HandlerChangeData =(e)=>{
        setServiceData({...ServiceData,[e.target.name]:e.target.value})
    }

    const selectedFile = (event) => { 
        if(event.target.files[0])
        {
            setServiceData({...ServiceData,img:event.target.files[0],imgURL: URL.createObjectURL(event.target.files[0])})
        }
                  
    };

    const CheckDetail = () =>{
        if(ServiceData.imgURL == null)
        {
            return false
        }
            
        if(ServiceData.name==='')
        {
            return false
        }

        if(ServiceData.price===''||ServiceData.price<0)
        {
            return false
        }

        if(ServiceData.moreInfo===''||ServiceData.moreInfo==null)
        {
            return false
        }
        return true
    }

    function success()
    {
        if(data)
            setIsEdit(false)
        else
            closeHandler();
    }
    const handlerInsert = () =>
    {
        if(!CheckDetail())
        {
            return 
        }
        if(data)
        {
            dispatch(UpdateService(ServiceData, success));
           
        }
        else
        {
            dispatch(InsertService(ServiceData, success));
        }  
    }

    const DeleteHandler = () =>
    {
        const confirm = window.confirm("Thông tin về dịch vụ sẽ được xoá hoàn toàn khỏi hệ thống. Bạn có muốn tiếp tục?");
        if(!confirm)
            return ;
        dispatch(DeleteService(data))
        setOpenList(false);
    }

    const handlerCancel =()=>
    {
        if(!data)
            closeHandler()
        setIsEdit(false);
        setServiceData(data?{
            id:data.id,
            img:null,
            imgURL: data.img,
            name:data.name,
            price:data.price,
            moreInfo:data.moreInfo,
        }:{
            img:null,
            imgURl: null,
            name:'',
            price:'',
            moreInfo:'',
        })
    }

    return(
    <Dialog c
        lassName={classes.DialogBackGround}
        open={true} 
        onClose={closeHandler} 
        scroll="body" 
        keepMounted 
        maxWidth="lg"
        fullWidth     
    >
        <Container className={classes.DialogBody} >
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@700&display=swap" rel="stylesheet"/>
            <input
                id="btn-upload"
                name="btn-upload"
                style={{ display: 'none' }}
                type="file"
                accept="image/*"
                onChange={selectedFile}
            />
            <Grid item xs={12} sm={6} md={6} lg={6} className = {classes.Media}>
                {ServiceData.imgURL?<CardMedia
                    image={ServiceData.imgURL}
                    className={classes.Image}
                />:null}
                <label className={`BtnImg ${classes.BtnImg}`} htmlFor='btn-upload' >
                    {isEdit?<PhotoCamera  style={{fontSize:'50px'}}  />:null}
                </label>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} className={classes.Content}>
                
                <ClickAwayListener onClickAway={()=>setOpenList(false)}>
                    <Grid className={classes.Header}>
                        <IconButton classes={{label: classes.ButtonLabel }} style={{padding:'0'}} onClick={()=>{setOpenList(!openList)}}>
                            <MoreHoriz style={{fontSize:"30px"}} />
                        </IconButton>
                        <div className={classes.ListAction} style={{display:openList?'flex':'none'}}>
                            <List component ='div'>
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
                                <ListItem button className={classes.ControlItem} onClick={DeleteHandler}>
                                        <ListItemIcon>
                                            <DeleteOutline style={{fontSize:'22px'}}/>
                                        </ListItemIcon>
                                        <ListItemText> Xoá </ListItemText>
                                    </ListItem>
                            </List>
                        </div>
                    </Grid>
                </ClickAwayListener>
                
                <Grid className={classes.GrdName}>
                    <TextField
                        disabled={!isEdit}
                        name='name'
                        id='name'
                        placeholder='Tên dịch vụ*'
                        value={ServiceData.name}  
                        onChange={HandlerChangeData} 
                        multiline 
                        fullWidth   
                        InputProps={{
                            disableUnderline:true,
                            className:classes.name
                        }}

                    />
                </Grid>
                <Grid className={classes.GrdPrice}>
                <TextField
                    disabled={!isEdit}
                    name='price'
                    id='price'
                    placeholder='Giá*'
                    value={ServiceData.price}  
                    onChange={HandlerChangeData}
                    fullWidth
                    InputProps={{
                        inputComponent:NumberFormatCustom,
                        disableUnderline:true,
                        className:classes.price
                    }}
                />
                </Grid>
                <Grid className={classes.GrdMoreInfo}>
                    <Typography className={classes.InputLabel}>Mô tả*:</Typography>


                    <TextField
                        disabled={!isEdit}
                        name='moreInfo'
                        id='moreInfo'
                        placeholder='Mô tả *'
                        value={ServiceData.moreInfo}  
                        onChange={HandlerChangeData}
                        fullWidth
                        multiline
                        rows={matches?5:15}
                        rowsMax={matches?10:15}
                        InputProps={{
                            disableUnderline:true,
                            className:classes.moreInfo,
                        }}
                    />
                </Grid>
                
                {
                isEdit?<Grid className={classes.Footer}>
                <Button 
                        className={classes.ControlButton}
                        startIcon={<CheckCircle style={{fontSize:'30px'}}/>}
                        onClick={handlerInsert}    
                    >HOÀN TẤT</Button>

                <Button 
                        className={classes.ControlButton}
                        startIcon={<Cancel style={{fontSize:'30px'}}/>}
                        onClick={handlerCancel}    
                    >HUỶ</Button>
                </Grid>:null}
            </Grid>      
        </Container>
    </Dialog>
    )
}

export default ServiceDialog;