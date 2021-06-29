import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from 'react-redux'
import {actAddTableCategoryRequest} from './../../../action/tableCategory';
import { useSnackbar } from 'notistack';

function AddTableCategoryDialog(props) {

  const {open, handleClose} = props;
  const [tableCategoryName, setTableCategoryName] = React.useState('');

  const handleNameChange = (event) => {
    setTableCategoryName(event.target.value);
  };

  const [tableCategoryNote, setTableCategoryNote] = React.useState('');

  const handleNoteChange = (event) => {
    setTableCategoryNote(event.target.value);
  };
  const { enqueueSnackbar } = useSnackbar();
    const handleClickVariant = (variant, message) => {
        enqueueSnackbar(message, { variant, autoHideDuration: 3000 });
    };
    const addTableCategorySuccess = () => {
      handleClickVariant("success", "Thêm loại bàn thành công!")
      handleClose();
  }
  const addTableCategoryFailure = () => {
      handleClickVariant("error", "Lỗi hệ thống. Thêm loại bàn thất bại!")
  }
  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Thêm loại bàn</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tên loại bàn"
            value={tableCategoryName}
            onChange={handleNameChange}
            fullWidth
          />
          <TextField
            margin="dense"
            id="name"
            label="Ghi chú"
            fullWidth
            value={tableCategoryNote}
            onChange={handleNoteChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy bỏ
          </Button>
          <Button 
          color="primary" 
          onClick={() => {
            if (props.tableCategories.some((category) => category.name.replace(/\s/g, '').toUpperCase() === tableCategoryName.replace(/\s/g, '').toUpperCase()))
              enqueueSnackbar("Tên loại bàn bị trùng", { variant: "warning", autoHideDuration: 3000 });
            else 
              props.addTableCategoriesInfo({name: tableCategoryName, moreInfo: tableCategoryNote}, addTableCategorySuccess, addTableCategoryFailure);
          }}>
            Thêm loại bàn
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = state => {
    return {
        tableCategories: state.tableCategories,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        addTableCategoriesInfo : ({name, moreInfo}, addTableCategorySuccess, addTableCategoryFailure) => {
            dispatch(actAddTableCategoryRequest({name, moreInfo}, addTableCategorySuccess, addTableCategoryFailure));
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddTableCategoryDialog);