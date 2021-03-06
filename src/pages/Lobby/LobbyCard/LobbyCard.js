import { CardMedia, Grid, IconButton, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react"
import useStyles from "./LobbyCardStyles"
import { useDispatch, useSelector } from 'react-redux'
import { Cancel, DeleteOutline, Done, Photo,Edit} from "@material-ui/icons";
import NumberFormatCustom from '../../Food/FormartNumber'
import InputAdornment from '@material-ui/core/InputAdornment';
import {InsertLobby, UpdateLobby, DeleteLobby} from '../Connect'
import { actError } from "../actions/actions";
import { getCookie } from '../../../action/Login'

function LobbyCard(props){
    const {lobby,lobbyCategory, ...other} = props

    const StoreData = useSelector(state => state.changeLobbyData);
    const categoryData = StoreData.LobbyCategory;
    const Lobby = StoreData.Lobby;
    const dispatch = useDispatch();
    const [lobbyState, setLobbyState] = useState(lobby?
        {
            id:lobby.id,
            lobbyCategory:lobby.lobbyCategory,
            name:lobby.name,
            imageURL:lobby.image,
            image:null,
            maxTable:lobby.maxTable,
            minUnitPriceTable:lobby.minUnitPriceTable
        }
        :{
            id:'',
            lobbyCategory:lobbyCategory?lobbyCategory:categoryData[0],
            name:'',
            imageURL:'',
            image:null,
            maxTable:lobbyCategory?lobbyCategory.mintable:categoryData[0].mintable,
            minUnitPriceTable:''})
    
    const classes = useStyles();
    
    const [editing, setEditing] = useState(lobby?false:true)

    function ChangeValueHandler(event){
        setLobbyState({...lobbyState, [event.target.name]: event.target.value})
    }

    function ChangeMaxTable(event)
    {
        event.target.style.width = `${(event.target.value.length+1)*11}px`
        setLobbyState({...lobbyState, [event.target.name]: event.target.value})
    }

    function ChangeCategory(event)
    {
        const category = categoryData.find(item=>{return item.id === event.target.value})
        setLobbyState({...lobbyState,lobbyCategory:category})
    }

    function DeleteHandler(){
        const confirm = window.confirm("Th??ng tin v??? s???nh s??? b??? xo?? kh???i h??? th???ng, b???n c?? mu???n ti???p t???c?")
        if(confirm)
            dispatch(DeleteLobby(lobbyState))
    }

    function checkExist()
    {
        const find =  Lobby.find(item=> item.name.toLowerCase().replace( /\s/g, '') === lobbyState.name.toLowerCase().replace( /\s/g, ''))
        if(find)
            if(find.id === lobbyState.id)
                return false;
            else
                return true;
        else 
            return false;
    }

    function check()
    {
        if(lobbyState.name&&lobbyState.lobbyCategory&&lobbyState.maxTable!==''&&lobbyState.minUnitPriceTable&&lobbyState.imageURL)
        {  
            if(lobbyState.maxTable<0)
            {
                return {value:false, message:'S??? b??n t???i ??a kh??ng th??? l?? m???t s??? ??m'}
            }
            if(lobbyState.maxTable<lobbyState.lobbyCategory.mintable)
            {    
                return {value:false ,message:'S??? b??n t???i ??a kh??ng th??? nh??? h??n s??? b??n t???i thi???u!'}
            }
            if(lobbyState.minUnitPriceTable<0)
                return {value:false ,message:'????n gi?? b??n t???i thi???u kh??ng th??? l?? s??? ??m!'}
            
            if(lobbyState.minUnitPriceTable < lobbyState.lobbyCategory.minPriceTable)
                return {value:false ,message:'????n gi?? b??n t???i thi???u c???a s???nh kh??ng th??? nh??? h??n ????n gi?? b??n t???i thi???u c???a lo???i s???nh!'}
            
            if(isNaN(parseInt(lobbyState.maxTable)))
                return {value:false ,message:'S??? b??n t???i ??a ph???i l?? s???!'}

            if(isNaN(parseInt(lobbyState.minUnitPriceTable)))
                return {value:false ,message:'????n gi?? b??n t???i thi???u ph???i l?? s???!'}

            if(checkExist())
                return {value:false ,message:'T??n s???nh ???? ???????c s??? d???ng!'}
           
            else
                return {value:true ,message:''}
        }
        else {
            return {value:false ,message:'Vui l??ng nh???p ????? th??ng tin!'}
        }
        
    }
    function onUpdateClick(){
        setEditing(true)        
    }

    function SuccessHandler()
    {
        if(lobbyState.id)
            setEditing(false)
        else
            setLobbyState({id:'',
            lobbyCategory:lobbyCategory?lobbyCategory:categoryData[0],
            name:'',
            imageURL:'',
            image:null,
            maxTable:lobbyCategory?lobbyCategory.mintable:categoryData[0].mintable,
            minUnitPriceTable:''})
    }

    function FinishHandler(){
        const result = check()
        if(result.value)
        {
            if(lobby)
                dispatch(UpdateLobby(lobbyState,SuccessHandler))
            else
                dispatch(InsertLobby(lobbyState,SuccessHandler))                    
        }
        else
            dispatch(actError(result.message))
    }
    function onCancelHandler(){
        
        setLobbyState({id:lobby.id, lobbyCategory:lobby.lobbyCategory, name:lobby.name, imageURL:lobby.image,image:null, maxTable:lobby.maxTable, minUnitPriceTable:lobby.minUnitPriceTable})
        setEditing(false)
    }

    function selectedFile(event){ 
        if(event.target.files[0])
        {
            setLobbyState({...lobbyState, image:event.target.files[0], imageURL:URL.createObjectURL(event.target.files[0])})
        }
                  
    };

    const privileges = JSON.parse(getCookie("privileges"))

    const canUpdateLobby = (permission) => permission.authority === "UPDATE_LOBBY"

    return(
        <Grid item {...other} className={classes.LobbyCard}>
            
            <input
                    id={`btn-upload_${lobbyState.id}`}
                    name={`btn-upload_${lobbyState.id}`}
                    style={{ display: 'none' }}
                    type="file"
                    accept="image/*"
                    onChange={selectedFile}
                />
            <Grid className={`MainContent ${editing?classes.activeMainContent:classes.MainContent}`}>
              
                <Grid className={`MediaContent ${classes.MediaContent}`}>
                    
                    <CardMedia
                        image={lobbyState.imageURL?lobbyState.imageURL:'https://res.cloudinary.com/hehohe/image/upload/v1623337977/WeddingManagerment/placeholder-image_n9pmhu.png'}
                        className={`Media ${editing?classes.activeMedia:classes.Media}`}
                    >
                        <div className={`SubMediaContent ${classes.SubMediaContent}`}>
                            <label className={`ControlButton ${classes.ControlButton}`} htmlFor={`btn-upload_${lobbyState.id}`} >
                                    <Photo className={classes.PhotoIcon}/>
                            </label>
                        </div>
                    </CardMedia>

                    { privileges.some(canUpdateLobby) ? <Grid className={`Header ${classes.Header}`}>
                        {editing?<IconButton onClick={FinishHandler} classes={{root:classes.ActionButton,label:classes.labelButton}}><Done className={`${classes.IconButton} ${classes.DoneIcon}`}/></IconButton>
                                :<IconButton onClick={DeleteHandler} classes={{root:classes.ActionButton,label:classes.labelButton}}><DeleteOutline className={`${classes.IconButton} ${classes.DeleteIcon}`}/></IconButton>}
                        {editing&&lobby?<IconButton onClick={onCancelHandler} classes={{root:classes.ActionButton,label:classes.labelButton}}><Cancel className={`${classes.IconButton} ${classes.CancelIcon}`}/></IconButton>:null}
                        {!editing?<IconButton onClick={onUpdateClick}  classes={{root:classes.ActionButton,label:classes.labelButton}}><Edit className={`${classes.IconButton} ${classes.EditIcon}`}/></IconButton>:null}
                    </Grid> : <></>}
                    
                </Grid>
                {editing?
                <Grid className={`TextContent ${classes.TextContent} ${editing&&classes.TextContentEditing}`}>
                        <TextField
                            placeholder="T??n s???nh"
                            name="name"
                            className={classes.InputNameText}
                            value={lobbyState.name}
                            onChange={ChangeValueHandler}
                            InputProps={{
                                disableUnderline:true,
                            }}
                        />
                        <div className={classes.divCategory}>
                            <Select
                                id="lobbyCategory"
                                value={lobbyState.lobbyCategory.id}
                                onChange={ChangeCategory}
                                className={classes.InputCategory}
                                InputProps={{
                                    disableUnderline:true,
                                }}
                                >
                                {categoryData.map((category) => (
                                    <MenuItem key={category.id} value={category.id} className={classes.MenuItem}>
                                        <Typography className={classes.categoryInfo}>
                                            {`${category.name}, T???i thi???u ${category.mintable} b??n,`}   
                                        </Typography>
                                        <Typography className={classes.categoryInfo}>
                                            {`????n gi?? b??n t???i thi???u: ${category.minPriceTable}`}   
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Select> 
                        </div>                       
                        <div className={classes.divMaxTable}>
                            <TextField
                                placeholder="S??? b??n t???i ??a"
                                type='number'
                                name="maxTable"
                                value={lobbyState.maxTable}
                                onChange={ChangeMaxTable}
                                className={classes.InputMaxTableText}
                                inputProps={{min:0}}
                                InputProps={{
                                    disableUnderline:true,
                                    startAdornment: <InputAdornment position="start" >S??? b??n t???i ??a:</InputAdornment>,
                                }}
                        
                            />
                           
                        </div>
                        
                        <TextField 
                            name="minUnitPriceTable"
                            placeholder="????n gi?? b??n t???i thi???u"
                            value={lobbyState.minUnitPriceTable}
                            onChange={ChangeValueHandler}
                            InputProps={{
                                disableUnderline:true,
                                inputComponent: NumberFormatCustom,
                            }}
                            className={classes.InputPriceText}
                        />                   
                </Grid>
                : <Grid className={`TextContent ${classes.TextContent}`}>
                        <Typography variant="h4" className={classes.NameText}>
                        {lobbyState.name}
                        </Typography>
                        <Typography variant="h5" className={classes.TextDetail}>
                        {`${lobbyState.lobbyCategory.name}, T???i thi???u ${lobbyState.lobbyCategory.mintable} b??n, T???i ??a ${lobbyState.maxTable} b??n`}  
                        </Typography> 
                        <Typography  variant="h4" className={classes.PriceText}>
                        {new Intl.NumberFormat('ru-RU').format(lobbyState.minUnitPriceTable) + '??'}
                        </Typography>                    
                </Grid>  }
            </Grid>
        </Grid>
    )

}

export default LobbyCard