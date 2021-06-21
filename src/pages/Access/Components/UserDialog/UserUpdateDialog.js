import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Card, CardMedia, CardActionArea } from '@material-ui/core/';
import { Form, useForm } from './useForm';
import { makeStyles } from '@material-ui/core/styles';
import Controls from './controls/Controls'

const useStyles = makeStyles((theme) => ({
  item: {
        marginBottom: "20px"
    },
    card: {
        width: 250,
        marginBottom: "20px",
        alignSelf: "center"
    },
    userImage: {
        height: 250,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end"
    },
    upload: {
        marginBottom: 5,
        cursor: "pointer",
    },
    form: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        width: "30em"
    }
}));

export default function UserUpdateDialog(props) {

    const { open, handleClose, initialValues, onSubmit } = props;
    const classes = useStyles();
    const validate = (fieldValues = values) => {
        let temp = {...errors};
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" :"Không được bỏ trống";
        if ('username' in fieldValues)
            temp.username = fieldValues.username ? "" :"Không được bỏ trống";
        if ('password' in fieldValues)
            temp.password = fieldValues.password ? "" :"Không được bỏ trống";
        if ('role' in fieldValues)
            temp.role = fieldValues.role ? "" :"Không được bỏ trống";
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }
    const {values, setValues, errors, setErrors, handleInputChange, resetForm} = useForm({...initialValues, newImage: null, role: initialValues.roles[0].name}, true, validate);

    function selectedFile(event){ 
        if(event.target.files[0])
        {
            setValues({...values, newImage:event.target.files[0], imageURL:URL.createObjectURL(event.target.files[0])})
        }
    };


    const fileInput = React.useRef();

    return (
        <div>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" onEnter={resetForm} >
                    <Form onSubmit={(e) => { e.preventDefault(); if (validate(values)) { onSubmit(values); console.log(values)}}}>
                        <DialogTitle id="form-dialog-title">Sửa thông tin người dùng</DialogTitle>
                        <DialogContent className={classes.form}>
                            <input id='myInput'
                                style={{ display: 'none' }}
                                type="file"
                                ref={fileInput}
                                accept="image/*"
                                onChange={selectedFile}
                            />
                            <Card className={classes.card} >
                                <CardActionArea >
                                    <CardMedia image={values.imageURL || values.image} className={classes.userImage} onClick={()=>fileInput.current.click()} />
                                </CardActionArea>
                            </Card>
                            <Controls.Input
                                className={classes.item}
                                defaultValue=''
                                id="fullName"
                                name="fullName" 
                                label="Tên người dùng" 
                                value={values.fullName}
                                onChange={handleInputChange}
                                error={errors.fullName}/>
                            <Controls.Input
                                className={classes.item}
                                defaultValue=''
                                id="username"
                                name="username" 
                                label="Tên đăng nhập" 
                                value={values.username}
                                disabled
                                error={errors.username}/>
                            <Controls.Input
                                className={classes.item}
                                defaultValue=''
                                id="password"
                                name="password" 
                                label="Mật khẩu" 
                                value={values.password}
                                onChange={handleInputChange}
                                error={errors.password}/>
                            <Controls.Select
                                label="Tên nhóm người dùng"
                                name="role" 
                                value={values.role}
                                onChange={handleInputChange}
                                options={[{role: "ROLE_ADMIN", name: "Admin"}, {role: "ROLE_MANAGER", name: "Quản lý"}, {role: "ROLE_USER", name: "Nhân viên"}]}
                                error={errors.role}/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Hủy bỏ
                            </Button>
                            <Button onClick={() => {if (validate(values)) handleClose();}} color="primary" type="submit">
                                Cập nhật
                            </Button>
                        </DialogActions>
                    </Form> 
                </Dialog>
        </div>
    );
}