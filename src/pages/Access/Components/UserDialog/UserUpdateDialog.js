import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Form, useForm } from './useForm';
import { makeStyles } from '@material-ui/core/styles';
import Controls from './controls/Controls'

const useStyles = makeStyles((theme) => ({
  item: {
    marginBottom: "20px"
  },
}));

export default function UserUpdateDialog(props) {

    const { open, handleClose, initialValues, onSubmit } = props;
    const classes = useStyles();

    const validate = (fieldValues = values) => {
        let temp = {...errors};
        // if ('fullname' in fieldValues)
        //     temp.fullname = fieldValues.fullname ? "" :"Không được bỏ trống";
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }
    const {values, setValues, errors, setErrors, handleInputChange, resetForm} = useForm(initialValues, true, validate);

    const timeConverter = (UNIX_timestamp) => {
        var a = new Date(UNIX_timestamp * 1000);
        // var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        // var year = a.getFullYear();
        // var month = months[a.getMonth()];
        // var date = a.getDate();
        // var hour = a.getHours();
        // var min = a.getMinutes();
        // var sec = a.getSeconds();
        // var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        // return time;
        return a;
    }

    return (
        <div>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" onEnter={resetForm} >
                    <Form onSubmit={(e) => {e.preventDefault(); onSubmit({...values, birthday: (values.birthday.getTime() / 1000)}); console.log(values)}}>
                        <DialogTitle id="form-dialog-title">Sửa thông tin người dùng</DialogTitle>
                        <DialogContent>
                            <Controls.Input
                                className={classes.item}
                                defaultValue=''
                                id="fullname"
                                name="fullname" 
                                label="Tên người dùng" 
                                value={values.fullname}
                                onChange={handleInputChange}
                                error={errors.fullname}/>
                            <Controls.Input
                                className={classes.item}
                                defaultValue=''
                                id="username"
                                name="username" 
                                label="Tên đăng nhập" 
                                value={values.username}
                                onChange={handleInputChange}
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
                            <Controls.DatePicker
                                className={classes.item} 
                                id="birthday"
                                name="birthday" 
                                label="Ngày sinh" 
                                value={values.birthday} 
                                onChange={handleInputChange}
                                error={errors.birthday}/>
                            <Controls.Select
                                label="Tên nhóm người dùng"
                                name="role" 
                                value={values.role}
                                onChange={handleInputChange}
                                options={[{id: "1", name: "Admin"}, {id: "2", name: "Nhân viên"}, {id: "3", name: "Quản lý"}]}
                                error={errors.role}/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Hủy bỏ
                            </Button>
                            <Button onClick={handleClose} color="primary" type="submit">
                                Cập nhật
                            </Button>
                        </DialogActions>
                    </Form> 
                </Dialog>
        </div>
    );
}