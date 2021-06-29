import React, {useEffect, useState} from 'react'
import Grid from '@material-ui/core/Grid';
import useStyles from "./RevenueStyle"
import { Typography, Toolbar, ClickAwayListener,Button, Container, Tabs, Tab, Box, Backdrop, CircularProgress  } from '@material-ui/core';
import moment from "moment"
import 'moment/locale/vi' 
import RevenueTable from './RevenueTable/RevenueTable';
import MonthlyRevenueChart from './RevenueChart/RevenueChart'
import  PieChart from './PieChart/PieChart';
import ReportTable from './Table/Table'
import  {GetReport, GetFoodReport, GetLobbyReport, GetServiceReport } from './connect'
import {ExportReport} from './exportReport'

function Revenue() {
    const classes = useStyles()
    const [revenueState, setRevenueState] = useState({dateObject:moment()})
    const [tab, setTab] = useState(0)
    const [monthlyReport, setMonthlyReport] = useState([])
    const [foodReport, setFoodReport] = useState([])
    const [serviceReport, setServiceReport] = useState([])
    const [lobbyReport, setLobbyReport] = useState([])
    const [monthReportData, setMonthReportData] = useState({Categories:[], Data:[]});
    const [lobbyChart, setLobbyChart] = useState({Series:[], Labels:[]})
    const [pending, setPending] = useState(4);

    function error()
    {
        setMonthlyReport([]);
        setFoodReport([]);
        setServiceReport([]);
        setLobbyReport([]);
        setPending(4);
    }

    function Success()
    {
        setPending(pending+1);
    }

    useEffect(()=>{
        setPending(0);
        GetReport(month(), year(), setMonthlyReport,Success, error)
        GetFoodReport(month(), year(),setFoodReport,Success, error)
        GetServiceReport(month(), year(),setServiceReport,Success, error)
        GetLobbyReport(month(), year(), setLobbyReport,Success, error)
    },[revenueState])
    
    

    function daysInMonth()
    {
        return revenueState.dateObject.daysInMonth();
    }

    function year()
    {
        return revenueState.dateObject.format('Y');
    }

    function month()
    {
        return moment(revenueState.dateObject).format('M')
    }

    function monthText(){
        return moment(revenueState.dateObject).format('MMMM')
    }

    function setYear(y)
    {
        let dateObject = Object.assign({}, revenueState.dateObject);
        let termtDateObject = moment(dateObject).set('year',y)
        setRevenueState({...revenueState,dateObject:termtDateObject})
    }

    function setMonth(m)
    {
        let dateObject = Object.assign({}, revenueState.dateObject);
        let termtDateObject = moment(dateObject).set('month',m)
        setRevenueState({...revenueState,dateObject:termtDateObject})
    }

    //Init data for month Report

    function Percent(d)
    {
        let dateObject = Object.assign({}, revenueState.dateObject);
        let dateCheck = moment(dateObject).set('date',d).format("YYYY-MM-DD")
        let find = monthlyReport.find(item=>item.date === dateCheck)
        if(find)
        {
        return find.ratio.toFixed(3)*100;
        }  
        else
            return 0;
    }

    function InitMonthlyRevenueChart()
    {
        let Categories=[]
        let Data= [];
        for(let date = 1; date <daysInMonth(); date++)
        {
            Categories.push(date.toString())
            Data.push(Percent(date))
        }
        setMonthReportData({...monthReportData,Categories:Categories,Data:Data})
    }

    useEffect(()=>{
        InitMonthlyRevenueChart()
    },[monthlyReport])

    //Init data for Lobby report

  
    function InitMonthlyReport()
    {
        let Series = []
        let Labels = []
        lobbyReport.forEach(item=>{
            Series.push(item.count)
            Labels.push(item.lobbyName)
        })
        setLobbyChart({...lobbyChart,Series:Series, Labels:Labels})
    }

   useEffect(()=>{
        InitMonthlyReport()
   },[lobbyReport])

    function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    function changePage(event, newValue){
        setTab(newValue)
    }


    function InitDataForMonthlyRevenue()
    {
        if(monthlyReport.length===0)
         {
            return {featCount:0, totalRevenue:0, totalFine:0}
         }   
        else
        {
            let reportMonth = monthlyReport[0].reportMonth;
            let revenue = reportMonth.revenue;
            let Feast = 0;
            let Fine = 0;
            for(let i=0; i<monthlyReport.length;i++)
            {
                Feast+=monthlyReport[i].feastCount
                let bills = monthlyReport[i].bills
                for(let t=0;t<bills.length;t++)
                {
                    Fine+=bills[t].totalFine
                }
            }
            return {featCount:Feast, totalRevenue:revenue, totalFine:Fine}
        }
    }

    // export report 
    function exportHandler()
    {
        const allData = []

        let monthData = []   
        const monthHeader = ["Ngày", "Số lượng tiệc", "Doanh số", "Tỉ lệ" ]
        monthData.push(monthHeader)
        monthlyReport.forEach(item =>{
            monthData.push([item.date, item.feastCount, 
                item.revenue.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND'}),
                `${item.ratio.toFixed(4)*100} %`])
        })
        allData.push({sheet:'Báo cáo tháng', data: monthData})
        
        /////
        const ServiceHeader = ["Tên", "Số lượng"]

        let lobbyData = []   
        lobbyData.push(ServiceHeader)
        lobbyReport.forEach(item =>{
            lobbyData.push([item.lobbyName, item.count])
        })
        allData.push({sheet:'Báo cáo sảnh', data: lobbyData})
        //////

        let foodData=[]
        foodData.push(ServiceHeader)
        foodReport.forEach(item =>{
            foodData.push([item.foodName, item.count])
        })
        allData.push({sheet:'Báo cáo món ăn', data: foodData})
        /////

        let serviceData = []   
        serviceData.push(ServiceHeader)
        serviceReport.forEach(item =>{
            serviceData.push([item.serviceName, item.count])
        })
        allData.push({sheet:'Báo cáo dịch vụ', data: serviceData})

        ExportReport(`Doanh thu tháng ${month()}/${year()}`, allData)
    }

    return (
        <Grid className={classes.Revenuepage}>
            
            <Backdrop open={pending < 4} className={classes.backdrop} onClick={(e)=>{e.stopPropagation()}}>
                    <CircularProgress  color="inherit"/>
            </Backdrop>
            <Container maxWidth='lg'>
                {/* <ExportReport></ExportReport> */}
                <RevenueToolbar currentMonth={month()} setMonth={setMonth} currentYear={year()} setYear={setYear} onExport={exportHandler}/>
                <MonthlyRevenue data={InitDataForMonthlyRevenue()}/>
            </Container>   
            <Container maxWidth='lg' className={classes.MainContent}>
                <Tabs 
                    value={tab} 
                    onChange={changePage} 
                    aria-label="simple tabs example"
                    variant="scrollable"
                    scrollButtons="on"
                    className={classes.Tabs}
                >
                    <Tab label="Tổng quát"  {...a11yProps(0)} className={classes.Tab}/>
                    <Tab label="Chi tiết"  {...a11yProps(1)} className={classes.Tab}/>            
                </Tabs>

                <TabPanel value={tab} index={0} className={classes.TabPanel}>
                    <MonthlyRevenueChart Title={`Doanh thu tháng ${monthText()}/${year()}`} categories={monthReportData.Categories} data={monthReportData.Data} className={classes.ChartPanel} format="%"/>
                </TabPanel>
                <TabPanel value={tab} index={1} className={classes.TabPanel}>
                    <RevenueTable revenues={monthlyReport} year={year()} month={monthText()}/>
                </TabPanel>
            </Container>
            

            <Container maxWidth='lg' className={classes.LobbyChart}>
                <Typography 
                    className={classes.LobbyChartLable}
                    component="div"
                >
                    Sảnh
                </Typography>
                <PieChart series={lobbyChart.Series} labels={lobbyChart.Labels}  />
            </Container>

            <Container className={classes.Food_Service_Report}>
                <Grid item xs={12} sm={12} md={6} lg={6} className={classes.Service_report}>
                    <ReportTabPanel data={foodReport} Title="Món ăn" categoryName="foodName"/>
                </Grid>
                
                <Grid item xs={12} sm={12} md={6} lg={6} className={classes.Food_report}>
                    <ReportTabPanel data={serviceReport} Title="Dịch vụ" categoryName="serviceName"/>
                </Grid>
            </Container>
        </Grid>

    )
}

export default Revenue;

function Categories(arrData, name)
{
    const categories = arrData.map(item=>{
        return item[name].toLowerCase()
    })
    return categories;
}

function Data(arrData, ){
    const data = arrData.map(item=>{
        return item.count
    })
    return data;
}
function ReportTabPanel(props)
{
    const {data, categoryName, Title } = props;
    const [tab, setTab] = useState(0)
    function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    function changePage(event, newValue){
        setTab(newValue)
    }

    const classes = useStyles();
    return(
        <Grid className={classes.ReportPanel}>
        <Tabs 
            value={tab} 
            onChange={changePage} 
            aria-label="simple tabs example"
            variant="scrollable"
            scrollButtons="on"
            className={classes.Tabs}
        >
            <Tab label="Tổng quát"  {...a11yProps(0)} className={classes.Tab}/>
            <Tab label="Chi tiết"  {...a11yProps(1)} className={classes.Tab}/>            
        </Tabs>
            <TabPanel value={tab} index={0} className={classes.TabPanel}>
                <MonthlyRevenueChart id={Title} Title={Title} categories={Categories(data, categoryName)} data={Data(data)} className={classes.ChartPanel} format=""/>
            </TabPanel>
            <TabPanel value={tab} index={1} className={classes.TabPanel}>
                <ReportTable TableData={data} Title={Title} attrName={categoryName}/>
            </TabPanel>
    </Grid>
    )
    
}


function MonthlyRevenue(props)
{
    const {data, ...other } = props
    const classes = useStyles()
    return(
        <Grid {...other} className={classes.RevenueTextContent}>
            <Grid item xs={12} sm={6} md={4} lg={4}  className={classes.TextPanel}>
                <Grid className={classes.PanelContent}>
                    <Typography className={classes.ValueLabel}>Số lượng tiệc</Typography>
                    <Typography className={classes.TextValue}>{data.featCount}</Typography>
                </Grid>     
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4} className={classes.TextPanel}>
                <Grid className={classes.PanelContent}>
                    <Typography className={classes.ValueLabel}>Tổng doanh thu</Typography>
                    <Typography className={classes.TextValue}>
                    {data.totalRevenue.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                    })}</Typography>
                </Grid> 
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4} className={classes.TextPanel}>
                <Grid className={classes.PanelContent}>
                    <Typography  className={classes.ValueLabel}>Tổng tiền phạt</Typography>
                    <Typography className={classes.TextValue}>
                        {
                            data.totalFine.toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND'
                            })
                        
                        }</Typography>
                </Grid>
                 
            </Grid>
        </Grid>
    )
}

function RevenueToolbar(props)
    {
        const {currentMonth, currentYear, setMonth, setYear, onExport} = props
        const classes = useStyles();
        const [openSelector, setOpenSelector] = useState("")
        
        const months = moment.months()

        return (
            <Toolbar className={classes.toolbar}>
                <Typography className={classes.toolbarTitle}>
                    Doanh thu
                </Typography>
                <ClickAwayListener onClickAway={()=>{setOpenSelector("")}}>
                    <Grid className={classes.MonthYearBox}>
                        <Typography className={classes.txtMonth} onClick={()=>{setOpenSelector("Month")}} >
                            {months.find((m, index)=>index == currentMonth - 1)} 
                        </Typography>
                        <Typography className={classes.txtYear} onClick={()=>{setOpenSelector("Year")}}>
                            {currentYear}
                        </Typography>
                        <Grid className={classes.GridSelector}>
                            <MonthSelector 
                                currentMonth={currentMonth - 1} 
                                setMonth={setMonth} 
                                className={classes.MonthSelector} 
                                style={{display:openSelector==='Month'?'':'none'}}
                                onClose={()=>{setOpenSelector("")}}
                            />

                            <YearSelector 
                                currentYear={currentYear} 
                                setYear={setYear} 
                                selectMonth={()=>{setOpenSelector('Month')}} 
                                className={classes.YearSelector} 
                                style={{display:openSelector==='Year'?'':'none'}}
                            />
                        </Grid>
                    </Grid>     
                </ClickAwayListener>                 
                <Button onClick={onExport} className={classes.ToolbarButton}>
                Xuất
                </Button>
            </Toolbar>
        )
    } 


function MonthSelector(props)
{
    const {setMonth,currentMonth,onClose,className, ...other} = props
    const classes = useStyles();
    const CurrentMonth = parseInt(currentMonth)
    function onMonthClick(e){
        setMonth(e.target.getAttribute('name'))
        onClose();
    }
    const months = moment.months()
    const monthCells = months.map((item, index)=>{
        return(
            <Grid item xs={4} sm={4} md={4} lg={4}
                key={`monthItem_${index}`} 
                className={`${classes.SelectGirdItem} ${index===CurrentMonth?classes.CurrentItem:''}`}
                name={index}
                onClick={onMonthClick}
            >
                <Typography  
                    name={index}  
                    className={classes.SelectItem} 
                >
                    {`${item}`}
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

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={0}>
           {children}   
          </Box>
        )}
      </div>
    );
  }
  
