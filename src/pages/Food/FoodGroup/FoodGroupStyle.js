const styles = (theme) =>(
    {
        FoodGroupContainer:{
            paddingTop:'3rem',
            paddingBottom:'10rem',
            display:'flex', 
            justifyContent:"center", 
            flexDirection:'column',
            minHeight:'600px',
            alignItem:'center',
            animation:"$First_animation 0.3s ease-out",
            zIndex:'-1'
    
        },
        "@keyframes First_animation":{
            from:{
                opacity:'0',
                transform:'scale(0)'
            },
            to:{
               opacity:'1',
               transform:'scale(1)'
            }
        },
    
        FoodGroup:
        {
           "&:before": {
                position: "absolute",
                content: '""',
                backgroundColor: "#000",
                top:'-10px',
                right:'15px',
                height:'10px',
                width:'calc(100% - 30px)',
                borderRadius:'7px 7px 0 0',
                opacity:'0.2'
            },
    
            '&::after':
            {
                position: "absolute",
                content: '""',
                backgroundColor: "#000",
                bottom:'-10px',
                right:'15px',
                height:'10px',
                width:'calc(100% - 30px)',
                borderRadius:'0 0 7px 7px',
                opacity:'0.2'
            },
            display:'flex',
            justifyContent:'center',
            flexWrap:'wrap',
            border:'1px solid',
            borderRadius:'10px',
            position:'relative',
            marginTop:'10rem',
            boxShadow:'0 5px 10px 0 rgba(26,47,51,0.4)',
            paddingTop:'2rem',
            paddingBottom:'2rem',
        },
        GroupLabel:
        {
            "&:before": {
                position: "absolute",
                content: '""',
                backgroundColor: "#000",
                top:'-10px',
                right:'-10px',
                height:'50px',
                width:'100px',
                borderRadius:'2000px 2000px 0 0',
                zIndex:'-3',
                opacity:'0.2'
            },
            position:'absolute',
            minHeight:'50px',
            minWidth:'80px',
            left:'calc(50% - 40px)',
            top:'-50px',
            borderRadius:'1000px 1000px 0 0',
            backgroundColor:'#fff',
            opacity:1,
            display:'flex',
            justifyContent:"center",
            paddingTop:'5px'       
    
        }
    
    }
    )
    
    export default styles;
    