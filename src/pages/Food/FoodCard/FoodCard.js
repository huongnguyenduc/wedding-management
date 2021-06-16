import React, { useState } from 'react'
import { Typography, CardMedia, Grid, IconButton} from '@material-ui/core';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import { withStyles } from "@material-ui/core/styles";
import Styles from './FoodCardStyle';
import { useDispatch } from 'react-redux';
import { actError, actSelectFood } from '../actions/actions';

function FoodCard(props) {
    const dispatch = useDispatch()
    const {data, classes} = props; 
    const onEditClick =(e)=>
    {
        dispatch(actSelectFood(data))       
    }    

    return (
        <Grid item xs={12} sm={6} md={4} lg={4} className={classes.Card}>
            <Grid className={classes.Content}>
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
                    {data.name} 
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
            </Grid>
        </Grid>
    )
    
}

export default withStyles(Styles)(FoodCard);
