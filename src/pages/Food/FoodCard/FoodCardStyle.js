const styles = (theme) =>(
    {
        Card:{
            
            padding:'3rem 1.5rem',
            position:'relative',
    
        },
        Content:{
            display:'flex',
            justifyContent:"center",
            flexDirection:'column',
            '&:hover':
            {
                transform: 'translateY(-5px)',
                '& .ButtonGroup':
                {
                    opacity:'1'
                },
                '& .Image':
                {
                    opacity:'0.7',
                    boxShadow:'0 70px 40px -35px rgba(75, 75, 75, 0.2)',
                },
            }, 
            backgroundColor:'transparent',
            animation:"$First_animation 0.3s ease-out fowards",
            transition:'transform 0.3s ease-out',
            position:'relative',
            borderRadius:'20px',
        },
        "@keyframes First_animation":{
            from:{
                opacity:'0',
                transform:'scale(0.5)'
            },
            to:{
               opacity:'1',
               transform:'scale(1)'
            }
        },
        Image: {
            marginTop:'5px',
            paddingTop: '70%',
            borderRadius: '50%',
            width:'70%',
            transition:'opacity 0.8s ease-in',
            opacity:'1'  ,
            boxShadow:'0 70px 40px -35px rgba(75, 75, 75, 0.15)',
            zIndex:'0'
        },
        ButtonLabel:
        {
            margin: '0 !important'
        },
        ButtonGroup:
        {
            position:'absolute',
            width:'80px',
            height:'80px',
            top:'50%',
            left:'50%',
            transform:'translate(-50% , -50%)',
            transition:'opacity 0.8s ease-in',
            opacity:0,
    
        },
        CardMedia:{
            position:'relative',
            display:'flex',
            justifyContent:'center',
            borderRadius: '50%',
            
        },
        
        GdMoreInfo:
        {
            margin: '8px 0 8px 0',
            display:'flex',
            justifyContent:'center',
        },
        tfMoreInfo:
        {
            fontSize: '16px',
            fontWeight:'600',
            color:'black', 
            padding:'0px 10px 0px 10px',
            maxHeight:'72px',
            align:'center',
            fontFamily:'"Patrick Hand", cursive',
            overflow:'hidden'
        },
        GdName:
        {
            marginTop: '10px',
            display:'flex',
            justifyContent:'center'
        },
        tfName:
        {
            fontSize:'18px',
            lineHeight:'18px',
            letterSpacing:'1px',
            fontWeight:700,
            color:'red', 
            paddingLeft:'5px',
            paddingRight:'5px',
            textTransform:'uppercase',
            fontFamily:'"Pacifico", cursive',
            cursor:'pointer'
        },
        GdPrice:
        {
            marginBottom: '5px',
            display:'flex',
            justifyContent:'center',
            
    
        },
        tfPrice:
        {
            fontSize: '25px',
            fontWeight:'700',
            color: 'black',
            paddingLeft:'20px',
            paddingRight:'20px',
            fontFamily:'"Patrick Hand", cursive'
        },
        DialogCardName:{
            marginTop: '0',
            fontSize: '3rem',
            justifyContent:'center'
        },
        inputDisabled:
        {
            "& .MuiInputBase-root.Mui-disabled": {
                color: "#000",
            }
        },
        NameDisabled:
        {
            "& .MuiInputBase-root.Mui-disabled": {
                color: "red",
            }
        }
    
    }
    )
    
    export default styles;
    