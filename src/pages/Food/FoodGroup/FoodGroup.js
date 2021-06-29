import { Container, Grid} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import { Fastfood } from '@material-ui/icons';
import React from 'react'
import FoodCard from '../FoodCard/FoodCard';
import Styles from './FoodGroupStyle';


function FoodGroup(props){
    const {category, foodData,handleUpdate,classes} = props;
    const data = foodData.filter(item=>{ return (item.category!=null&&category.id ===  item.category.id)})
    return (
        <Grid item xs={12}  container className = {classes.FoodGroupContainer}>
                <Container  className={classes.FoodGroup}>
                    <Grid className={classes.GroupLabel}>
                        <Fastfood style={{ fontSize: 40 }}/>
                    </Grid>
                    {
                    data.map(item=>
                                {
                                    return(
                                        <FoodCard  
                                            key={item.id} 
                                            data={item} 
                                            handleUpdate={handleUpdate} >
                                        </FoodCard>
                                    )
                                }
                            )
                    }
                </Container>
            </Grid>
    )
}

export default withStyles(Styles)(FoodGroup);