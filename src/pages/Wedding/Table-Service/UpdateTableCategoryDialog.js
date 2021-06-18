import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from 'react-redux'
import {actUpdateTableCategoryRequest} from './../../../action/tableCategory';
import { useSnackbar } from 'notistack';

function UpdateTableCategoryDialog(props) {

  const {open, handleClose, data} = props;
  const [tableCategoryName, setTableCategoryName] = React.useState(data.name);

  const handleNameChange = (event) => {
    setTableCategoryName(event.target.value);
  };

  const [tableCategoryNote, setTableCategoryNote] = React.useState(data.moreInfo);

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
        <DialogTitle id="form-dialog-title">Sửa loại bàn</DialogTitle>
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
          onClick={() => {props.updateTableCategoriesInfo({id: data.id, name: tableCategoryName, moreInfo: tableCategoryNote}); handleClickVariant("success", "Sửa loại bàn thành công!"); handleClose();}}>
            Chỉnh sửa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        updateTableCategoriesInfo : ({id, name, moreInfo}) => {
            dispatch(actUpdateTableCategoryRequest({id, name, moreInfo}));
        },
    }
}
export default connect(null, mapDispatchToProps)(UpdateTableCategoryDialog);