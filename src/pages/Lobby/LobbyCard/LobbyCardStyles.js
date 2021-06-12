import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme=>(
{
    LobbyCard:{
        position:'relative',
        display:'flex',
        justifyContent:'center',
        paddingLeft:'1.5rem',
        paddingRight:'1.5rem',
        padding:'3.5rem 3rem 3rem',
        overflow:'hidden',
        transition:"transform 5s",
       
       
    },
    MainContent:{
        position:'relative',
        width:'100%',
        backgroundColor:"#fff",
        paddingBottom:'20px',
        '&:hover':{
           "& .Media":{
                transform:'translate(0,-35px)'
           },
           "& .Header":{
               opacity:1
           },
            boxShadow:'0 60px 80px -35px rgba(60, 60, 60, 0.1)',
        }, 
        transition:'box-shadow 0.5s'
        
    },
    activeMainContent:{
        position:'relative',
        width:'100%',
        backgroundColor:"#c7d8ef",
        paddingBottom:'20px',
        '&:hover':{
            "& .Media":{
                 transform:'translate(0,-35px)',
                 backgroundColor:'#c7d8ef'
            },
            "& .Header":{
                opacity:1
            },
             boxShadow:'0 60px 80px -35px rgba(60, 60, 60, 0.1)',
         }, 
        transition:'box-shadow 0.5s'
    },
    Header:{
        display:'flex',
        justifyContent:'center',
        position:'absolute',
        zIndex:'0',
        width:'100%',
        backgroundColor:'transparent',
        bottom:0,
        opacity:0      
        
    },
    ActionButton:{
        padding:'5px',
        borderRadius:'0',
        paddingLeft:'1rem',
        paddingRight:'1rem'
    },
    IconButton:{
        fontSize:'20px'
    }
    ,
    MoreButton:{
        cursor:'pointer',
        fontSize:'25px',
        marginRight:'1rem',
        color:'#000'
    },
    MediaContent:{
        width:'100%',
        border:'none', 
        position:'relative' ,
        backgroundColor:'transparent',     
    },
    SubMediaContent:{
        position:'absolute',
        top:'0',
        width:'0%',
        height:'100%',
        display:'flex',
        justifyContent:'center',
        alignContent:'center',
        backgroundColor:'rgba(25,25,25,0.5)',
        opacity:'0',
        transition:'width 0.5s ease-out'
    },
    Media:{
        paddingTop:'70%',
        border:'none',
        transition:"transform 0.3s"
    },
    activeMedia:{
        paddingTop:'70%',
        border:'none',
        transition:"transform 0.3s",
        '&:hover':{
            "& .SubMediaContent":{
                width:'100%',
                opacity:'1',
            },
            "& .ControlButton":{
                opacity:1
            }
        },
    },
    TextContent:{
        display:'flex',
        flexDirection:'column',
        backgroundColor:'#fff',  
        justifyContent:'space-around'
    },
    TextContentEditing:{
        backgroundColor:'#c7d8ef'
    },
    NameText:{
        margin:'20px 0 8px',
        textAlign:'center',
        color:'#3d3935',
        "&:hover":{
            color:'#b58a61',
        },
        textTransform:'uppercase',
        letterSpacing:'1px',
        lineHeight:'30px',
        fontWeight:'600',
        fontSize:'20px',
        cursor:'pointer'
    },
    PriceText:{
        textAlign:'center',
        fontSize:'16px',
        fontWeight:'600',
        color:'#d09156'
    },
    divMoreInfo:{

    },
    TextDetail:{
        textAlign:'center',
        letterSpacing:'0.5px',
        lineHeight:'24px',
        margin:'0 0 10px',
        fontSize:'15px',
        fontWeight:'400',
        color:'#9c9c9c'
    },
    ControlButton:{
        position:'absolute',
        top:'50%',
        right:'50%',
        transform:'translate(50%, -50%)',
        opacity:0,
        borderRadius:'50%',
        padding:'10px 10px 7px 10px',
        backgroundColor:'#b58a61',
        cursor:'pointer',
    },
    buttonLable:{
        marginLeft:0
    },
    InputNameText:{
        textAlignLast:'center',
        margin:'15px 0 0px',
        "& .MuiInputBase-input":{  
            color:'#000',
            textTransform:'uppercase',
            letterSpacing:'1px',
            lineHeight:'30px',
            fontWeight:'600',
            fontSize:'20px',
        },
       
        
    },
    divCategory:{
        display:'flex',
        justifyContent:'space-around',
        flexDirection:'row'
    },
    InputCategory:{
        textAlign:'center',
        letterSpacing:'0.5px',
        lineHeight:'24px',
        margin:'0',
        fontSize:'15px',
        fontWeight:'400',
        color:'#000',
        width:'auto',
        "&:before":
        {
            borderBottom:'0'
        },
        "&:after":
        {
            borderBottom:'0'
        },
        '& .MuiInputBase-input':
        {
            padding:'0 20px 0 0'
        },
        "&.MuiInputBase-root.Mui-disabled": {
            color: '#4b4b4b',
        },
        "&:focus":{
            backgroundColor:'#fff'
        },
        '& .MuiSelect-icon':{
            top:'calc(50% - 10px)',
            fontSize:'20px'
        },
        
    },
    divMaxTable:{
        display:'flex',
        justifyContent:'center',
        flexDirection:'row'
    },
    LabelMaxTable:{
        fontSize:'16px',
        color:'#000',
    },
    InputMaxTableText:{
        textAlignLast:'start',
        paddingLeft:'15px',
        "& .MuiInputBase-input":{
            fontSize:'15px',
            color:'#000',
            minWidth:'23px',
            width:'40px'
        },
        "& .MuiTypography-root":{
            fontSize:"15px",
            color:'#000',
        }
    },
    TextMinPrice:{
        textAlignLast:'center',
        
    },
    InputPriceText:{
        textAlignLast:'center',
        "& .MuiInputBase-input":{
            textAlign:'center',
            fontSize:'16px',
            fontWeight:'600',
            color:'#d06a08'
        }
    },
    MenuItem:{
        fontSize:'13px',
    },
    labelButton:{
        marginLeft:'0'
    },
    DeleteIcon:{
        color:'#f44336'
    },
    EditIcon:{
        color:'#4caf50'
    },
    DoneIcon:{
        color:'#4caf50'
    },
    PhotoIcon:{
        fontSize:'30px'
    }
    
    
    
}
))

export default useStyles