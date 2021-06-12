import {CardMedia, Grid, IconButton, Typography } from '@material-ui/core';
import {ZoomIn } from '@material-ui/icons';
import React, { useState } from 'react'
import useStyles from './ServiceCardStyle'
import ServiceDialog from '../ServiceDialog/ServiceDialog'
function ServiceCard(props)
{
    const {data, xs, sm, md, lg} = props
    const classes = useStyles();
    const [openServiceDialog, setOpenServiceDialog] = useState(false)

    const OpenDetailHandler = () =>
    {
        setOpenServiceDialog(true)
    }

    const CloseDetailHandler = () =>
    {
        setOpenServiceDialog(false)
    }
    return (
        
        <Grid item xs={xs} sm={sm} md={md} lg={lg} className={classes.ServiceContainer} >
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@700&display=swap" rel="stylesheet"/>
            <Grid className={classes.ServiceCard}>    
                <Grid className={classes.Media}>
                    <CardMedia
                        image={data.img}
                        className ={`Image ${classes.Image}`}
                    />
                    <IconButton className={`btnDetail ${classes.btnDetail}`} classes={{label:classes.ButtonLabel}} onClick={OpenDetailHandler} >
                        <ZoomIn style={{fontSize:'60px'}} />
                    </IconButton>
                </Grid>           
               
                <Grid className={classes.Content}>
                    <Typography
                        name="name"
                        id="name"
                        className= {classes.Name}
                    >
                    {data.name}
                    </Typography>    
                    <Typography 
                        name='price' 
                        placeholder="Giá"
                        className= {classes.Price}
                    >{new Intl.NumberFormat('ru-RU').format(data.price) + 'đ'}</Typography>   
                </Grid>
                
            </Grid>

            {openServiceDialog?<ServiceDialog data={data} closeHandler={CloseDetailHandler}/>:null}
        </Grid>
    )
}

export default ServiceCard;