import { CardMedia, Grid, IconButton, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react"
import useStyles from "./LobbyCardStyles"
import { useDispatch, useSelector } from 'react-redux'
import { Cancel, DeleteOutline, Done, Photo, Refresh } from "@material-ui/icons";
import NumberFormatCustom from '../../Food/FormartNumber'
import InputAdornment from '@material-ui/core/InputAdornment';
import {InsertLobby, UpdateLobby, DeleteLobby} from '../Connect'
import { actError } from "../actions/actions";

function LobbyCard(props){
    const {lobby, ...other} = props

    const StoreData = useSelector(state => state.changeLobbyData);
    const categoryData = StoreData.LobbyCategory;
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
            lobbyCategory:categoryData[0],
            name:'',
            imageURL:'',
            image:null,
            maxTable:0,
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
        const category = categoryData.find(item=>{return item.id == event.target.value})
        setLobbyState({...lobbyState,lobbyCategory:category})
    }

    function DeleteHandler(){
        const confirm = window.confirm("Thông tin về sảnh sẽ bị xoá khỏi hệ thống, bạn có muốn tiếp tục?")
        if(confirm)
            dispatch(DeleteLobby(lobbyState))
    }

    function check()
    {
        if(lobbyState.name&&lobbyState.lobbyCategory&&lobbyState.maxTable!=''&&lobbyState.minUnitPriceTable&&lobbyState.imageURL)
        {  
            if(lobbyState.maxTable<lobbyState.lobbyCategory.mintable)
            {    
                return {value:false ,message:'Số bàn tối đa không thể nhỏ hơn số bàn tối thiểu!'}
            }
            else
                return {value:true ,message:''}
        }
        else {
            return {value:false ,message:'Vui lòng nhập đủ thông tin!'}
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
            lobbyCategory:categoryData[0],
            name:'',
            imageURL:'',
            image:null,
            maxTable:0,
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

                    <Grid className={`Header ${classes.Header}`}>
                        {editing?<IconButton onClick={FinishHandler} classes={{root:classes.ActionButton,label:classes.labelButton}}><Done className={`${classes.IconButton} ${classes.DoneIcon}`}/></IconButton>
                                :<IconButton onClick={DeleteHandler} classes={{root:classes.ActionButton,label:classes.labelButton}}><DeleteOutline className={`${classes.IconButton} ${classes.DeleteIcon}`}/></IconButton>}
                        {editing&&lobby?<IconButton onClick={onCancelHandler} classes={{root:classes.ActionButton,label:classes.labelButton}}><Cancel className={`${classes.IconButton} ${classes.CancelIcon}`}/></IconButton>:null}
                        {!editing?<IconButton onClick={onUpdateClick}  classes={{root:classes.ActionButton,label:classes.labelButton}}><Refresh className={`${classes.IconButton} ${classes.EditIcon}`}/></IconButton>:null}
                    </Grid>
                    
                </Grid>
                {editing?
                <Grid className={`TextContent ${classes.TextContent} ${editing&&classes.TextContentEditing}`}>
                        <TextField
                            placeholder="Tên sảnh"
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
                                >
                                {categoryData.map((category) => (
                                    <MenuItem key={category.id} value={category.id} className={classes.MenuItem}>
                                    {`${category.name}, Tối thiểu ${category.mintable} bàn`}
                                    </MenuItem>
                                ))}
                            </Select> 
                        </div>                       
                        <div className={classes.divMaxTable}>
                            <TextField
                                placeholder="Số bàn tối đa"
                                type='number'
                                name="maxTable"
                                value={lobbyState.maxTable}
                                onChange={ChangeMaxTable}
                                className={classes.InputMaxTableText}
                                InputProps={{
                                    disableUnderline:true,
                                    startAdornment: <InputAdornment position="start" >Số bàn tối đa:</InputAdornment>,
                                }}
                        
                            />
                           
                        </div>
                        
                        <TextField 
                            name="minUnitPriceTable"
                            placeholder="Giá tối thiểu"
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
                        {`${lobbyState.lobbyCategory.name}, Tối thiểu ${lobbyState.lobbyCategory.mintable} bàn, Tối đa ${lobbyState.maxTable} bàn`}  
                        </Typography> 
                        <Typography  variant="h4" className={classes.PriceText}>
                        {new Intl.NumberFormat('ru-RU').format(lobbyState.minUnitPriceTable*1000000) + 'đ'}
                        </Typography>                    
                </Grid>  }
            </Grid>
        </Grid>
    )

}

export default LobbyCard