import {CardMedia, Grid, IconButton, Link, Typography } from '@material-ui/core';
import {DeleteOutline, Edit} from '@material-ui/icons';
import { useDispatch } from 'react-redux'
import {DeleteService} from '../Connect'
import React, { useState } from 'react'
import useStyles from './ServiceCardStyle'
import ServiceDialog from '../ServiceDialog/ServiceDialog'
function ServiceCard(props)
{
    const {data, ...other} = props
    const dispatch= useDispatch()
    const classes = useStyles();
    const [openServiceDialog, setOpenServiceDialog] = useState('')

    const OpenDetailHandler = () =>
    {
        setOpenServiceDialog('detail')
    }

    const OpenUpdateDialog=()=>{
        setOpenServiceDialog('update')
    }
    const DeleteHandler = () =>
    {
        const confirm = window.confirm("Thông tin về dịch vụ sẽ được xoá hoàn toàn khỏi hệ thống. Bạn có muốn tiếp tục?");
        if(!confirm)
            return ;
        dispatch(DeleteService(data))
    }

    const CloseDetailHandler = () =>
    {
        setOpenServiceDialog(false)
    }
    return (
        
        <Grid item {...other} className={classes.ServiceContainer} >
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@700&display=swap" rel="stylesheet"/>
            <Grid className={classes.ServiceCard}>    
                <Grid className={classes.MediaContent}>
                    <CardMedia
                        image={data.img}
                        className ={`Image ${classes.Image}`}
                    />
                    <div className={`divControl ${classes.divControl}`}>
                        <IconButton classes={{root:classes.Button, label:classes.LabelButton}} onClick={DeleteHandler}>
                            <DeleteOutline className={`${classes.ButtonIcon} ${classes.DeleteIcon}`}/>
                        </IconButton>
                        <IconButton classes={{root:classes.Button, label:classes.LabelButton}} onClick={OpenUpdateDialog}>
                            <Edit className={`${classes.ButtonIcon} ${classes.UpdateIcon}`}/>
                        </IconButton>
                    </div>
                </Grid>           
               
                <Grid className={classes.TextContent}>
                    <Link href="#" onClick={OpenDetailHandler} classes= {{root:classes.Name}} >
                    {data.name}  
                    </Link>  
                    <Typography 
                        name='price' 
                        placeholder="Giá"
                        className= {classes.Price}
                    >{new Intl.NumberFormat('ru-RU').format(data.price) + 'đ'}</Typography>   
                </Grid>
                
            </Grid>
            {openServiceDialog==='update'?<ServiceDialog data={data} edit={true} closeHandler={CloseDetailHandler}/>:null}
            {openServiceDialog==='detail'?<ServiceDialog data={data} closeHandler={CloseDetailHandler}/>:null}
        </Grid>
    )
}

export default ServiceCard;