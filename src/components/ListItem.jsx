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
import {useContextReducer}  from '../contexts/completedcontext.jsx';
import { usesnackBar } from '../contexts/snackBarcontext.jsx';
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

export default function ListItems({todos,handleDelete,handleEdit}) {
    // let [todoItems, setTodoItems] = useContext(completedcontext);
    let {showhideSnackBar} = usesnackBar();
    let [todoItems, dispatch] = useContextReducer();
    
  function clickCheckButton() {
    dispatch({
      type: 'TOGGLE_ITEM',
      payload: todos,
    });
    // let newItems = todoItems.map((item) => {
    //   if (item.id === todos.id) {
    //     return { ...item, completed: !item.completed };
    //   }
    //   return item;
    // });
    // setTodoItems(newItems);
    // localStorage.setItem("todos",JSON.stringify(newItems));

    showhideSnackBar(todos.completed ? "تم إلغاء إكمال المهمة" : "تم إكمال المهمة بنجاح");

  }
  function handleDeleteButton () {
    handleDelete(todos);
  }
  
  function handleEditButton() {
    handleEdit(todos);
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
            flexWrap: 'wrap', // Allow wrapping on small screens
          }}
        >
          <div style={{ flex: 1, textAlign: 'right', minWidth: 0 }}>
            <Typography
              variant='h6'
              style={{
                fontWeight: '100',
                textDecorationLine: todos.completed ? 'line-through' : 'none',
                wordBreak: 'break-word', // Prevent overflow
              }}
            >
              {todos.title}
            </Typography>
            <Typography
              variant='body2'
              style={{
                fontWeight: '100',
                marginTop: '5px',
                wordBreak: 'break-word', // Prevent overflow
              }}
            >
              {todos.details}
            </Typography>
          </div>
          <div style={{
            display: 'flex',
            gap: 8,
            flexShrink: 0, // Prevent buttons from shrinking too much
            marginTop: 8,
          }}>
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
    
      
      </>
  )
}
