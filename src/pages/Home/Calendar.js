import React, { useEffect, useState } from "react";
import moment from "moment"
import {Button,IconButton,Grid, Typography, Container } from '@material-ui/core';
import useStyles from "./CalendarStyles";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Toolbar from '@material-ui/core/Toolbar';
import 'moment/locale/vi' 
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {GetFeast} from './Connect'
import {Event, Favorite, MeetingRoom, Notifications, Today } from "@material-ui/icons";
import AccessTimeIcon from '@material-ui/icons/AccessTime';


function Calendar(props)
{
    const [feastData, setFeastData] = useState([])
    const [calendarState, setCalendarState] = useState({dateObject:moment()})
    const [openSelector, setOpenSelector] = useState('')
    const classes = useStyles();

    function daysInMonth()
    {
        return calendarState.dateObject.daysInMonth();
    }

    function year()
    {
        return calendarState.dateObject.format('Y');
    }

    

    function firstDayOfMonth()
    {
        let dateObject = calendarState.dateObject;
        let firstDay = moment(dateObject)
        .startOf("month")
        .format("d"); 
        return firstDay;
    }

    function month()
    {
        return calendarState.dateObject.format('M');
    }

    function monthText(){
        return moment(calendarState.dateObject).format('MMMM')
    }

    function setYear(y)
    {
        let dateObject = Object.assign({}, calendarState.dateObject);
        let termtDateObject = moment(dateObject).set('year',y)
        setCalendarState({...calendarState,dateObject:termtDateObject})
    }

    function setMonth(m)
    {
        let dateObject = Object.assign({}, calendarState.dateObject);
        let termtDateObject = moment(dateObject).set('month',m)
        setCalendarState({...calendarState,dateObject:termtDateObject})
    }

   
    function CalendarHeader(){
        const HeadCells = moment.weekdays().map(item=>{
            return <Grid
                key={`calHeadCell_${item}`}
                className={classes.headCell}
            >{item}</Grid>
        })
        return (
            <Grid className={classes.calendarHeader}>{HeadCells}</Grid>
        )
    }
    function CalenarToolbar(props)
    {
        function DecreaseMonth()
        {
            setMonth(parseInt(month())-2)
        }
        function IncreaseMonth()
        {
            setMonth(parseInt(month()))
        }

        function goToDay(){
            let today = moment();
            setCalendarState({...calendarState,dateObject:today})
        }

        return (
            <Toolbar className={classes.toolbar}>
                <Grid className={classes.leftControlButton}>
                    <IconButton classes={{root:classes.ToolbarButton, label:classes.ButtonIcon}} onClick={DecreaseMonth}><ArrowBackIosIcon className={classes.ToolbarButonIcon}/></IconButton>
                    <Button onClick={goToDay} className={classes.btnGoToDay}>
                        <Today className={classes.ToolbarButonIcon}/>
                        HÔM NAY
                    </Button>
                </Grid>
              
               
              <ClickAwayListener onClickAway={()=>{setOpenSelector("")}}>
                    <Grid className={classes.MonthYearBox}>
                        <Typography className={classes.txtMonth} onClick={()=>{setOpenSelector("Month")}} >
                            {monthText()} 
                        </Typography>
                        <Typography className={classes.txtYear} onClick={()=>{setOpenSelector("Year")}}>
                            {year()}
                        </Typography>
                        <Grid className={classes.GridSelector}>
                            <MonthSelector 
                                currentMonth={monthText()} 
                                setMonth={setMonth} 
                                className={classes.MonthSelector} 
                                style={{display:openSelector==='Month'?'':'none'}}
                                onClose={()=>{setOpenSelector("")}}
                            />

                            <YearSelector 
                                currentYear={year()} 
                                setYear={setYear} 
                                selectMonth={()=>{setOpenSelector('Month')}} 
                                className={classes.YearSelector} 
                                style={{display:openSelector==='Year'?'':'none'}}
                            />
                        </Grid>
                    </Grid>     
                </ClickAwayListener>   
              <IconButton classes={{root:classes.ToolbarButton, label:classes.ButtonIcon}} onClick={IncreaseMonth}><ArrowForwardIosIcon className={classes.ToolbarButonIcon}/></IconButton>
               
                
            </Toolbar>
        )
    } 

    function checkCurrentDate(date)
    {
        const CurrentDate = moment().format("DD/MM/YYYY")
        let dateObject = Object.assign({}, calendarState.dateObject);
        let tempDateObject = moment(dateObject).set('date',date).format("DD/MM/YYYY")
        return CurrentDate === tempDateObject 
    }

    function SelectColor(date1, date2){
        let myOfDate1 = date1.format('MM/YYYY')
        let myOfDate2 = date2.format("MM/YYYY")
        let dateOfDate1 = parseInt(date1.format('D'))
        let dateOfDate2 = parseInt(date2.format("D"))
        if(myOfDate1 === myOfDate2 )
        {
            let difference = dateOfDate1 - dateOfDate2;
            if (difference===0)
                return "#f44336"
            else if(difference > 0 && difference <= 7)
                return "#fe9700"
            else if(difference > 7)
                return "#4caf50"
            else 
                return "#00bcd4"
        }
        else
        {
            return ""
        }
    }

    function GridStatus(props)
    {
        const {item,date} = props
        const [showDetail, setShowDetail]  = useState(false)
        let DateObject = moment(calendarState.dateObject).set('date',date)
        let CurrentDate = moment()

        const openDeltail = ()=>{
            console.log("open")
            setShowDetail(true)
        }

        const color = SelectColor(DateObject,CurrentDate)
        return (
            <Grid >
                <Typography  className={classes.GridFeastInfo} style={{backgroundColor:color}} onClick={openDeltail}>
                    {item.groomName}
                    {` - `}
                    {item.brideName}
                </Typography>
                {showDetail?
                        <ClickAwayListener onClickAway={()=>{setShowDetail(false)}}>
                            <Grid className={classes.DetaiContainer}>
                                <Notifications style={{position:'absolute', top:'0', left:0, color:color, fontSize:'25px'}}/>
                                <Grid className={classes.MainDetailContent}>
                                    <Typography className={classes.txtDetailName}>
                                        {item.groomName} 
                                    </Typography>
                                    <Favorite className={classes.DetailNameIcon}/>
                                    <Typography className={classes.txtDetailName}>
                                        {item.brideName} 
                                    </Typography>
                                </Grid>
                                <Grid className={classes.SubDetailContent}>
                                    <Typography className ={classes.txtSubText}>
                                        <Event className={classes.SubTextIcon}/>
                                        {item.weddingDate} 
                                    </Typography>
                                    <Typography className ={classes.txtSubText}>
                                        <AccessTimeIcon className={classes.SubTextIcon}/>
                                        {item.nameShift} </Typography>
                                    <Typography className ={classes.txtSubText}>
                                        <MeetingRoom className={classes.SubTextIcon}/>
                                        {item.lobbyName} </Typography>
                                    
                                </Grid>

                                
                            </Grid>
                        </ClickAwayListener>
                :null}
            </Grid>
        )
    }

    function StatusOfDay(props)
    {
        const {date} = props;
        
        let DateObject = moment(calendarState.dateObject).set('date',date)

        let txtDateOfObject = DateObject.format("DD/MM/YYYY");

       

        const allStatus = feastData.map(item=>{
            if(item.weddingDate === txtDateOfObject)
                return (
                   <GridStatus  key={`status_${item.id}`} item={item} date={date}/>
                )
        })

        return allStatus;
    }

    function CalendarBody()
    {   
        let lastMonth = moment(calendarState.dateObject).set('month', parseInt(month())-2)
        let lastDateOfLastMonth = parseInt(lastMonth.endOf('month').format('D')) - firstDayOfMonth() + 1;

        let emptyCells =[]
        for(let i=0; i<firstDayOfMonth();i++)
        {
            emptyCells.push(<Grid 
                key={`emptyCell_${i}`} 
                className={`${classes.tableCell}`}
            >
                <Typography className={`${classes.txtDateLastMonth}`}>{lastDateOfLastMonth}</Typography>  
            </Grid>)
            lastDateOfLastMonth++;
        }
           
        let DayCells = []

        for(let i=1; i<=daysInMonth();i++)
        {    
            const isCurrenDate = checkCurrentDate(i); 
            DayCells.push(
                <Grid 
                    key={`cell_${i}`} 
                    className={`${isCurrenDate?classes.cellCurrentDay:classes.tableCell}`}
                >
                    <Typography className={`${isCurrenDate?classes.txtCurrentDay:classes.txtDate}`}>{i}</Typography>
                    <Grid className={classes.CellContent}>
                        <StatusOfDay date={i}/>
                    </Grid>  
                </Grid>)
        }
           

        let allCells = [...emptyCells, ...DayCells]
        let Cells =[]
        let Rows=[]
        allCells.forEach((cell, index) => {
            if(index%7!==0||index===0)
            {
                Cells.push(cell)
            }
            else
            {
                Rows.push(
                    <Grid 
                        key={`row_${index/7}`} 
                        padding="default"
                        align='center'
                        variant='head'
                        className={classes.tableRow}
                    >
                        {Cells}
                    </Grid>)
                Cells =[];
                Cells.push(cell)                
            }

            if(index === allCells.length-1)
            {
                let lastCells = Cells.length
                for(let i = lastCells; i< 7; i++)
                    Cells.push(<Grid 
                        key={`empty_${i}`} 
                        className={classes.tableCell}
                    >
                        <Typography className={`${classes.txtDateLastMonth}`}>{`${i-lastCells + 1 }`}</Typography>
                    </Grid>)

                Rows.push(
                    <Grid 
                        key={`row_${index/7 + 1}`}
                        padding="default"
                        align='center'
                        variant='head' 
                        className={classes.tableRow} 
                    >
                        {Cells}
                    </Grid>)
            }
                
               
        });

      return Rows
        
    }

    useEffect(()=>{
        GetFeast(setFeastData)
    },[])

    return(
        <Grid className={classes.CalendarPage}>
            <Container className={classes.CalendarPaper}>
                <CalenarToolbar/>
                <CalendarHeader/>
                <CalendarBody/>
               
            </Container>
            <Container maxWidth='lg' className={classes.NoteContainer}>
                    <Typography className={`${classes.TfNote} ${classes.BlueNote}`} >Đã tổ chức</Typography>
                    <Typography className={`${classes.TfNote} ${classes.RedNote}`} >Đến ngày tổ chức</Typography>
                    <Typography className={`${classes.TfNote} ${classes.YelowNote}`} >Sắp tổ chức</Typography>
                    <Typography className={`${classes.TfNote} ${classes.GreenNote}`}>Chưa tổ chức</Typography>
            </Container>
        </Grid>
       
    )
}

export default Calendar

function MonthSelector(props)
{
    const {setMonth,currentMonth,onClose,className, ...other} = props
    const classes = useStyles();
    function onMonthClick(e){
        setMonth(e.target.getAttribute('name'))
        onClose();
    }
    const months = moment.months()
    const monthCells = months.map((item, index)=>{
        return(
            <Grid item xs={4} sm={4} md={4} lg={4}
                key={`monthItem_${index}`} 
                className={`${classes.SelectGirdItem} ${item===currentMonth?classes.CurrentItem:''}`}
                name={index}
                onClick={onMonthClick}
            >
                <Typography  
                    name={index}  
                    className={classes.SelectItem} 
                >
                    {item}
                </Typography>
            </Grid>)
    })
    
    return <Grid
        className={`${classes.monthsContainer} ${className}` }
        {...other}
    >
        {monthCells}
    </Grid>
}

function YearSelector(props)
{
    const {setYear, currentYear, selectMonth, onClose, className, ...orther} = props;
    const CurrentYear = parseInt(currentYear)
    const classes = useStyles();
    function onYearClick(e){
        selectMonth()
        setYear(e.target.getAttribute('name'))
        if(selectMonth)
            selectMonth()
        else if(onClose)
            onClose()
    }
    let yearCells = []

    for(let i= CurrentYear - 4;i<=CurrentYear+4;i++)
        yearCells.push(
            <Grid item xs={4} sm={4} md={4} lg={4} 
                key={`yearItem${i}`} 
                className={`${classes.SelectGirdItem} ${i===CurrentYear?classes.CurrentItem:''}`}
                name={i} 
                onClick={onYearClick}
            >
                <Typography 
                    name={i} 
                    className={classes.SelectItem}
                >
                    {i}
                </Typography>
            </Grid>)

    return (
    <Grid 
        className= {`${classes.yearsContainer} ${className}`} 
        {...orther}
    >
        {yearCells}
    </Grid>)
}