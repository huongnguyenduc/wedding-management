import React, { useEffect } from 'react'
import { Typography, Container, Grid, TextField, MuiThemeProvider, FormControl, MenuItem, InputLabel, Select, Fab, Button, ButtonGroup } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';
import AddIcon from '@material-ui/icons/Add';
import DateFnsUtils from '@date-io/date-fns';
import useStyles from './styles';
import theme from './MuiTheme';
import Search from '@material-ui/icons/SearchOutlined';
import EnhancedTable from './WeddingDataTable';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { getDataTable } from './actions/getData';

function Wedding() {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [searchKind, setSearchKind] = React.useState('Tên chú rể');
    const selectedWedding = useSelector(state => state.selectedRow);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setSearchKind(event.target.value);
    };
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

  useEffect(() => {
        dispatch(getDataTable());
    });


    return (
        <>
        <MuiThemeProvider theme={theme}>
            <Fab color='primary' aria-label='add' variant='extended' className={classes.fab} href='#formWedding' >
                <AddIcon /> 
                Thêm tiệc cưới
            </Fab>
            <Grid container spacing={3} justify='center' direction='column'>
                <Grid item xs={12}>
                    <Typography variant="h4" align='center' className={classes.title}>Quản lý tiệc cưới</Typography>
                </Grid>
                <Grid item xs={12} id='formWedding'>
                    <Container maxWidth='lg' className={classes.formWedding} >
                        <Container className={classes.formWeddingTitle}>    
                            <Typography variant="subtitle" align='center'>Thông tin đặt tiệc</Typography>
                        </Container>
                        <Grid container spacing={6} direction='row'>
                                <Grid item xs={12} md={6} lg={3} align='center' className={classes.formWeddingGridItem} >
                                <TextField 
                                    fullWidth
                                    defaultValue=''
                                    id="groomName" 
                                    label="Tên chú rể" 
                                    value={selectedWedding.groomName || ''}
                                    variant="outlined" 
                                    className={classes.textField} 
                                    InputProps={{
                                        classes: {
                                            input: classes.resize,
                                        },
                                    }}/>
                                </Grid>
                                <Grid item xs={12} md={6} lg={3} align='center'>
                                <TextField 
                                    id="brideName" 
                                    label="Tên cô dâu" 
                                    fullWidth 
                                    value={selectedWedding.brideName || ''}
                                    variant="outlined" 
                                    className={classes.textField}
                                    InputProps={{
                                        classes: {
                                            input: classes.resize,
                                        },
                                    }}/>
                                </Grid>
                                <Grid item xs={12} md={6} lg={3} align='center'>
                                <TextField 
                                    id="phoneNumber" 
                                    label="Điện thoại" 
                                    value={selectedWedding.phoneNumber || ''}
                                    fullWidth 
                                    variant="outlined" 
                                    className={classes.textField}
                                    InputProps={{
                                        classes: {
                                            input: classes.resize,
                                        },
                                    }}/>
                                </Grid>
                                <Grid item xs={12} md={6} lg={3} align='center' >
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker 
                                        className={classes.textField}
                                        fullWidth
                                        disableToolbar
                                        id="weddingDate" 
                                        label="Ngày tổ chức" 
                                        variant="inline"
                                        format="dd/MM/yyyy" 
                                        value={convertDateToStringMDY(selectedWedding.weddingDate) || new Date()} 
                                        onChange={handleDateChange}
                                        InputProps={{
                                        classes: {
                                            input: classes.resize,
                                        },
                                    }}/>
                                        </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid item xs={12} md={6} lg={3} align='center'>
                                <TextField 
                                    id="time" 
                                    label="Giờ"
                                    type="time" 
                                    fullWidth 
                                    variant="outlined"
                                    defaultValue="11:00" 
                                    className={classes.textField}
                                    InputProps={{
                                        classes: {
                                            input: classes.resize,
                                        },
                                        step: 300*3,
                                    }}/>
                                </Grid>
                                
                                <Grid item xs={12} md={6} lg={3} align='center'>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker 
                                        className={classes.textField}
                                        fullWidth
                                        disableToolbar
                                        id="registerDate" 
                                        label="Ngày đặt tiệc" 
                                        variant="inline" 
                                        format="dd/MM/yyyy"
                                        defaultValue={new Date()} 
                                        value={selectedDate} 
                                        onChange={handleDateChange}
                                        InputProps={{
                                        classes: {
                                            input: classes.resize,
                                        },
                                    }}/>
                                        </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid item xs={12} md={6} lg={3} align='center'>
                                <TextField 
                                    id="shift" 
                                    label="Ca" 
                                    variant="outlined" 
                                    value={selectedWedding.shift || ''}
                                    fullWidth 
                                    className={classes.textField}
                                    InputProps={{
                                        classes: {
                                            input: classes.resize,
                                        },
                                    }}/>
                                </Grid>
                                <Grid item xs={12} md={6} lg={3} align='center'>
                                <TextField 
                                    id="lobby" 
                                    label="Sảnh"
                                    value={selectedWedding.lobby || ''} 
                                    variant="outlined" 
                                    fullWidth 
                                    className={classes.textField}
                                    InputProps={{
                                        classes: {
                                            input: classes.resize,
                                        },
                                    }}/>
                                </Grid>
                                <Grid item xs={12} md={6} lg={3} align='center'>
                                <TextField 
                                    id="deposit" 
                                    label="Tiền đặt cọc (VND)" 
                                    fullWidth 
                                    variant="outlined" 
                                    className={classes.textField}
                                    value={new Intl.NumberFormat(
                                        'vi-VN',
                                        { style: 'currency', currency: 'VND' })
                                        .format(selectedWedding.deposit) || ''}
                                    InputProps={{
                                        classes: {
                                            input: classes.resize,
                                        },
                                    }}/>
                                </Grid>
                                <Grid item xs={12} md={6} lg={3} align='center'>
                                <TextField 
                                    id="note" 
                                    label="Ghi chú" 
                                    fullWidth
                                    value={selectedWedding.note || ''}
                                    variant="outlined" 
                                    className={classes.textField}
                                    InputProps={{
                                        classes: {
                                            input: classes.resize,
                                        },
                                    }}/>
                                </Grid>
                                <Grid item xs={12} md={6} lg={3} align='center' alignItems='center'>
                                    <Button variant="outlined" color="primary" label="Chi tiết" fullfill size='large'>
                                        Mở Đặt bàn và Dịch vụ
                                    </Button>
                                </Grid>
                                <Grid item xs={12} md={6} lg={3} align='left' >
                                    <ButtonGroup variant="text" color="primary" aria-label="text primary button group" size='large'>
                                        <Button>Hoàn tất</Button>
                                        <Button>Hủy</Button>
                                    </ButtonGroup>
                                </Grid>
                        </Grid>                                     
                    </Container>
                </Grid>
                <Grid item xs={12}>
                    <Container maxWidth='lg' className={classes.listFormWedding}>
                        <Grid container spacing={2} direction='row'>
                            <Grid item xs={12} md={7}>
                                <Grid container spacing={1} alignItems="flex-end">
                                    <Grid item xs={3} align='right'>
                                        <Search />
                                    </Grid>
                                    <Grid item xs={9}>
                                        <TextField 
                                            id="searchWedding" 
                                            fullWidth 
                                            label={"Tìm kiếm theo " + searchKind.toLowerCase()}
                                            InputProps={{
                                                classes: {
                                                    input: classes.resize,
                                                },
                                            }} />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <FormControl className={classes.formControl} style={{minWidth: 300}} >
                                    <InputLabel id="select-search-kind-label" >Tìm kiếm theo</InputLabel>
                                    <Select
                                    fullWidth
                                    labelId="select-search-kind-label"
                                    id="select-search-kind"
                                    value={searchKind}
                                    onChange={handleChange}
                                    label="Tìm kiếm theo"
                                    >
                                    <MenuItem value={'Tên chú rể'}>Tên chú rể</MenuItem>
                                    <MenuItem value={'Tên cô dâu'}>Tên cô dâu</MenuItem>
                                    <MenuItem value={'Số điện thoại'}>Số điện thoại</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <EnhancedTable />
                            </Grid>
                        </Grid>
                    </Container>
                </Grid>
            </Grid>
            </MuiThemeProvider>  
        </>
    )
}

function convertDateToStringMDY(date) {
    if (date == null) return;
        let day = date.getDay();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let MM_dd_yyyy = month + "-" + day + "-" + year; // That's your formatted date.
        return MM_dd_yyyy;
}

export default Wedding;
