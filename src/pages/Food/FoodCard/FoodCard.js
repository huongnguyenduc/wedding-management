import React, { useState } from 'react'
import { Typography, CardMedia, Grid, IconButton} from '@material-ui/core';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import FoodDialog from '../FoodDialog/FoodDialog'
import { withStyles } from "@material-ui/core/styles";
import Styles from './FoodCardStyle';

function FoodCard(props) {
    const {data, handleUpdate, AlertHandler, classes} = props; 
    const [open, setOpen] = useState(false);
    const onEditClick =(e)=>
    {
        setOpen(true)       
    }    

    return (
        <Grid item xs={12} sm={4} md={3} lg={3} className={classes.Card}
        >
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link href="https://fonts.googleapis.com/css2?family=Pacifico&family=Patrick+Hand&family=Pattaya&display=swap" rel="stylesheet"/>
            <Grid
                className={`CardMedia ${classes.CardMedia}`}        
            >                    
                <CardMedia
                    className={`Image ${classes.Image}`}
                    image={data.img}
                />
                
                <IconButton  aria-label="edit" onClick={onEditClick} classes={{ label: classes.ButtonLabel }}  className={`ButtonGroup ${classes.ButtonGroup}`}>
                        <ZoomInIcon style={{fontSize:"40px", color:'#000'}}/>
                </IconButton>     
            </Grid>
            <Grid className={`GdName ${classes.GdName}`}>
                <Typography 
                    name='name'  
                    className={`tfName ${classes.tfName}`}
                    align="center" 
                    variant='h5'
                >
                    {data.name.toUpperCase()} 
                </Typography>
            </Grid>
            <Grid className={`GdMoreInfo ${classes.GdMoreInfo}`}>
                <Typography 
                    name='moreInfo' 
                    id='moreInfo' 
                    className={`tfMoreInfo ${classes.tfMoreInfo}`}
                    align="center" 
                    variant="body1"          
                >
                 {data.moreInfo}
                </Typography>
            </Grid >
            <Grid className={`GdPrice ${classes.GdPrice}`}>
            <Typography
                    name="price"
                    id="price" 
                    align="center"   
                    className={`tfPrice ${classes.tfPrice}`}             
                >
                    {new Intl.NumberFormat('ru-RU').format(data.price) + 'đ'}
                </Typography>
            </Grid >  
            {open?<FoodDialog AlertHandler={AlertHandler} data={data} open={open} handleClose={()=>setOpen(false)} handleUpdate={handleUpdate}></FoodDialog>:null}
        </Grid>


        

    )
    
}

export default withStyles(Styles)(FoodCard);
