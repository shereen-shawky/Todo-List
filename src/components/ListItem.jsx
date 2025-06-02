import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useContext ,useState} from 'react';
import { completedcontext } from '../contexts/completedcontext.jsx';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
//ctrl f for search
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function ListItems({todos}) {
    let [todoItems, setTodoItems] = useContext(completedcontext);
    let [deletedialogOpen, setDeleteDialogOpen] = useState(false);
    let [editdialogOpen, setEditDialogOpen] = useState(false);
    let [Input, setInput] = useState({title:todos.title,Details:todos.details});
  function clickCheckButton() {
    let newItems = todoItems.map((item) => {
      if (item.id === todos.id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setTodoItems(newItems);
    localStorage.setItem("todos",JSON.stringify(newItems));

  }
  function handleDeleteButton () {
    setDeleteDialogOpen(true);
  }
  function handleClose() {
    setDeleteDialogOpen(false);
  }
  function handleDeleteConfirm() {
    let newtodos = todoItems.filter((item) => item.id !== todos.id);
    setTodoItems(newtodos);
    localStorage.setItem("todos",JSON.stringify(newtodos));

    setDeleteDialogOpen(false);
  }
  function handleEditButton() {
    setEditDialogOpen(true);
  }
  function handleEditClose() {
    setEditDialogOpen(false);
  }
  function handleEditConfirm() {
    let newItems = todoItems.map((item) => {
      if (item.id === todos.id) {
        return { ...item,title: Input.title, details: Input.Details };
      }
      return item;
    });
    setTodoItems(newItems);
    localStorage.setItem("todos",JSON.stringify(newItems));

    setEditDialogOpen(false);
  }
  return (
    <>
    <Card className='todoCard' sx={{ minWidth: 275 ,marginTop: 2, backgroundColor: '#283593' ,color: '#fff'}}>

      <CardContent>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            gap: 8,
          }}
        >
          <div style={{ flex: 1, textAlign: 'right' }}>
            <Typography variant='h6' style={{ fontWeight: '100', textDecorationLine: todos.completed ? 'line-through' : 'none' }}>
              {todos.title}
            </Typography>
            <Typography variant='body2' style={{ fontWeight: '100', marginTop: '5px' }}>
              {todos.details}
            </Typography>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <IconButton onClick={clickCheckButton} className='IconButton' aria-label="delete" style={{ color: todos.completed ? '#fff' : '#8bc34a', backgroundColor: todos.completed ? '#8bc34a' : '#fff', border: '3px solid #8bc34a' }}>
              <CheckIcon />
            </IconButton>
            <IconButton onClick={handleEditButton} className='IconButton' aria-label="delete" style={{ color: '#1769aa', backgroundColor: 'white', border: '3px solid #1769aa' }}>
              <EditOutlinedIcon />
            </IconButton>
            <IconButton onClick={handleDeleteButton} className='IconButton' aria-label="delete" style={{ color: '#b23c17', backgroundColor: 'white', border: '3px solid #b23c17' }}>
              <DeleteOutlineIcon />
            </IconButton>
          </div>
        </div>
      </CardContent>
      
    </Card>
    <Dialog
    style={{ direction: 'rtl' }}
        open={deletedialogOpen}
        onClose={handleClose}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          هل انت متأكد من حذف هذه المهمة؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكن التراجع عن هذا الإجراء. إذا قمت بحذف هذه المهمة، فلن تتمكن من استعادتها مرة أخرى.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>اغلاق</Button>
          <Button autoFocus onClick={handleDeleteConfirm} style={{color: '#b23c17'}}>
          نعم قم بحذفها
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
    style={{ direction: 'rtl' }}
        open={editdialogOpen}
        onClose={handleEditClose}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        تعديل المهمة
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="email"
            label="عنوان المهمة"
            fullWidth
            variant="standard"
            value={Input.title}
            onChange={(e) => setInput({...Input,title:e.target.value })}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="email"
            label="تفاصيل المهمة"
            fullWidth
            variant="standard"
            value={Input.Details}
            onChange={(e) => setInput({...Input,Details:e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>اغلاق</Button>
          <Button autoFocus onClick={handleEditConfirm} >
            تاكيد
          </Button>
        </DialogActions>
      </Dialog>
      </>
  )
}
