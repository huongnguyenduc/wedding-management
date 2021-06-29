import React, {useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, Typography, CircularProgress, FormControl, Select, MenuItem, InputLabel, Button } from '@material-ui/core';
import theme from '../../components/MuiTheme';
import { connect } from 'react-redux'
import FeatureList from './Components/FeatureList';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import AccessList from './Components/AccessList';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import {actGetPermissionRequest, actFetchPermissionsRequest, actAddPermissionRequest, actDeletePermissionRequest} from '../../action/permission'
import { useSnackbar } from 'notistack';
import { getCookie } from '../../action/Login'

const useStyles = makeStyles((theme) => ({
    title: {
        justifyContent: "center",
        marginTop: "10px",
        display: "flex"
    },
    select: {
        justifyContent: "center",
        marginTop: "10px",
        display: "flex"
    },
    loading: {
        alignSelf: "center"
    },
    loadingPage: {
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center"
    },
    formControl: {
        margin: theme.spacing(1),
        width: 180,
    },
    body: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        margin: "20px 0px 0px 0px",
        justifyContent: "center",
        flexWrap: "wrap"
    },
    groupButton: {
        display: "flex",
        flexDirection: "column",
    },
    reverseArrow: {
        transform: "rotate(180deg)",
    },
    arrow: {
        margin: "5px 20px"
    }
}));

function Administration(props) {
    const classes = useStyles();
    useEffect(() => {
        props.fetchPermission("ROLE_ADMIN");
    }, [])// eslint-disable-line
    const [role, setRole] = React.useState("");
    const [featureSelected, setFeatureSelected] = React.useState([]);
    const [accessSelected, setAccessSelected] = React.useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const handleClickVariant = (variant, message) => {
        enqueueSnackbar(message, { variant, autoHideDuration: 3000 });
    };
    const handleAddFeature = () => {
        featureSelected.forEach(feature => props.addPermission({rolename: role, permission: feature.authority}, updatePermission))
        setFeatureSelected([]);
        // props.getPermission(role);
        // handleClickVariant("success", "Thêm quyền thành công!")
    }

    const updatePermission = () => {
        props.getPermission(role);
        handleClickVariant("success", "Thêm quyền thành công!");
    }

    const handleRemoveAccess = () => {
        accessSelected.forEach(access => props.removePermission({rolename: role, permission: access.authority}, removePermission))
        setAccessSelected([]);
    }

    const removePermission = () => {
        props.getPermission(role);
        handleClickVariant("success", "Xóa quyền thành công!");
    }

    const handleChange = (event) => {
        setRole(event.target.value);
        props.getPermission(event.target.value);
    };

    const featureData = () => {
        if (props.allPermission.privileges && props.permission.privileges) {
            if (role === "ROLE_ADMIN")
                return props.allPermission.privileges.filter(n => !props.permission.privileges.some(m => m.id === n.id));
            else 
                return props.allPermission.privileges.filter(n => n.authority !== "UPDATE_PER" && n.authority !== "UPDATE_USER").filter(n => !props.permission.privileges.some(m => m.id === n.id));
        }
        return [];
    }
    const privileges = JSON.parse(getCookie("privileges"))

    const canUpdatePer = (permission) => permission.authority === "UPDATE_PER"

    return (
        <>
        {props ? 
            <MuiThemeProvider theme={theme}>
                <div className={classes.title}>     
                    <Typography variant="h4" color="secondary">Quản Lý Phân Quyền</Typography>
                </div>
                <div className={classes.select}>     
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Tên nhóm người dùng</InputLabel>
                        <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={role}
                        onChange={handleChange}
                        label="Tên nhóm người dùng"
                        >
                            <MenuItem value={"ROLE_ADMIN"}>Admin</MenuItem>
                            <MenuItem value={"ROLE_MANAGER"}>Quản lý</MenuItem>
                            <MenuItem value={"ROLE_USER"}>Nhân viên</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                    <div className={classes.body}>
                        <FeatureList rows={featureData()} selected={featureSelected} setSelected={setFeatureSelected} />
                        {privileges.some(canUpdatePer) ? <div className={classes.groupButton}>
                            <Button 
                            disabled={(featureSelected.length === 0 || role === "ROLE_ADMIN")} 
                            variant="contained"  
                            className={classes.arrow}  
                            style={{ borderRadius: 35, backgroundColor: (featureSelected.length === 0 || role === "ROLE_ADMIN") ? 'gray' : green[400], fontSize: "18px" }}
                            onClick={handleAddFeature}>
                                <DoubleArrowIcon style={{ color: "#fff", fontSize: "20px", marginRight: "10px" }} />
                            </Button>
                            <Button 
                            disabled={(accessSelected.length === 0 || role === "ROLE_ADMIN")} 
                            variant="contained" 
                            className={classes.arrow} 
                            style={{ borderRadius: 35, backgroundColor: (accessSelected.length === 0 || role === "ROLE_ADMIN") ? 'gray' : red[600], fontSize: "18px", }}
                            onClick={handleRemoveAccess}>
                                <DoubleArrowIcon className={classes.reverseArrow} style={{color: "#fff", fontSize: "20px", marginRight: "10px" }} />
                            </Button>
                        </div> : <div style={{width: "20px"}}></div>}
                        <AccessList rows={props.permission.privileges ? props.permission.privileges : []} selected={accessSelected} setSelected={setAccessSelected} />
                    </div>      
            </MuiThemeProvider> : 
            <div className={classes.loadingPage}>
                <CircularProgress className={classes.loading} />
            </div> }
        </>
    )
}

const mapStateToProps = state => {
    return {
        permission: state.permissionItem,
        allPermission: state.permissions
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getPermission : (id) => {
            dispatch(actGetPermissionRequest(id));
        },
        fetchPermission : () => {
            dispatch(actFetchPermissionsRequest());
        },
        addPermission : (permission, updatePermission) => {
            dispatch(actAddPermissionRequest(permission, updatePermission));
        },
        removePermission : (permission, removePermission) => {
            dispatch(actDeletePermissionRequest(permission, removePermission));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Administration);
