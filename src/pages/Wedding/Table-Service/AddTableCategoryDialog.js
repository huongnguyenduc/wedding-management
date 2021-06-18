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
          onClick={() => {props.addTableCategoriesInfo({name: tableCategoryName, moreInfo: tableCategoryNote}); handleClickVariant("success", "Thêm loại bàn thành công!"); handleClose();}}>
            Thêm loại bàn
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        addTableCategoriesInfo : ({name, moreInfo}) => {
            dispatch(actAddTableCategoryRequest({name, moreInfo}));
        },
    }
}
export default connect(null, mapDispatchToProps)(AddTableCategoryDialog);