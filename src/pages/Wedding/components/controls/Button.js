import React from 'react'
import { Button as MButton } from "@material-ui/core";


export default function Button(props) {

    const { text, size, color, variant, onClick, ...other } = props

    return (
        <MButton
            variant={variant || "contained"}
            size={size || "large"}
            color={color || "primary"}
            onClick={onClick}
            {...other}
            >
            {text}
        </MButton>
    )
}