import { Container, Grid, Grow, Zoom } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import { Fastfood } from '@material-ui/icons';
import React from 'react'
import FoodCard from '../FoodCard/FoodCard';
import Styles from './FoodGroupStyle';


function FoodGroup(props){
    const {category, foodData, AlertHandler,handleUpdate,classes} = props;
    const data = foodData.filter(item=>{ return (item.category!=null&&category.id ===  item.category.id)})
    if( data.length===0)
        return (<></>)
    return (
        <Grow in={true} timeout={500} disableStrictModeCompat={true}>
        <Grid item xs={12}  container className = {classes.FoodGroupContainer}>
                <Container  className={classes.FoodGroup}>
                <Grid className={classes.GroupLabel}>
                    <Fastfood style={{ fontSize: 40 }}/>
                </Grid>
                {
                data.map(item=>
                            {
                                return(
                                    <Zoom  key={item.id} in={true} timeout={1000} disableStrictModeCompat={true}>
                                    <FoodCard   
                                        AlertHandler={AlertHandler}
                                        data={item} 
                                        handleUpdate={handleUpdate} >
                                    </FoodCard>
                                    </Zoom>
                                )
                            }
                        )
                }
                </Container>
            </Grid>
            </Grow>
    )
}

export default withStyles(Styles)(FoodGroup);