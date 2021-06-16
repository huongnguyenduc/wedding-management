import { Container,} from "@material-ui/core"
import React from "react"
import useStyles from './Styles';
import ShiftTable from "./shift/shiftTable"
import PolicyTable from "./policy/policyTable"


function Policy() {
    const classes = useStyles()

    return(
            <Container maxWidth='lg' className={classes.PolicyContainer}>
                <PolicyTable/>
                <ShiftTable/>   
            </Container>
        
    );
}

export default Policy;

