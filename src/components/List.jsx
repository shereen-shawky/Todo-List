import React, { useEffect,useState ,useContext,useMemo} from 'react'
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ListItems from './ListItem.jsx';
import { v4 as uuidv4 } from 'uuid';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { completedcontext } from '../contexts/completedcontext.jsx';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { usesnackBar } from '../contexts/snackBarcontext.jsx';
export default function List() {

    let [todoItems, setTodoItems] = useContext(completedcontext);
    let {showhideSnackBar} = usesnackBar();
    let [titleInput, setTitleInput] = useState("")
    let [displayedItems, setDisplayedItems] = useState("All");
    let [deletedialogOpen, setDeleteDialogOpen] = useState(false);
    let [editdialogOpen, setEditDialogOpen] = useState(false);
    // let [Input, setInput] = useState({title: "", Details: ""});
    let [dialogTodos, setDialogTodos] = useState("");
    // Filter the todoItems based on the displayedItems state
    let completedItems = useMemo(() => {
        return todoItems.filter((item) => item.completed);
    }, [todoItems]);

    let notCompletedItems = useMemo(() => {
        return todoItems.filter((item) => !item.completed);
    }, [todoItems]);

    let filteredItems = displayedItems === "completed" ? completedItems : displayedItems === "notcompleted" ? notCompletedItems : todoItems;
    let items=filteredItems.map((item) => {
        return (
            <ListItems key={item.id} todos={item} handleDelete={handleDeleteButton}  handleEdit={handleEditButton}           />
        );
    })
     
    // function handleCompletedtoDos(todosid) {
    //     let newItems = todoItems.map((item) => {
    //         if (item.id === todosid) {
    //             return { ...item, completed: !item.completed };
    //     }
    //     return item;});
    //     setTodoItems(newItems);}
    function handleAddItem(){
        let newItem={
            id:uuidv4(),
            title:titleInput,
            details:"",
            completed:false
        }
        setTodoItems([...todoItems,newItem]);
        localStorage.setItem("todos",JSON.stringify([...todoItems,newItem]));
        showhideSnackBar("تمت إضافة المهمة بنجاح");

        setTitleInput("");
    }
    //use effect is used for side effects, like fetching data or updating the DOM
    useEffect(() => {
        const storedTodos = localStorage.getItem("todos");
        if (storedTodos) {
            setTodoItems(JSON.parse(storedTodos));
        }
    }, []);


    function handleClose() {
    setDeleteDialogOpen(false);
  }
  
  function handleDeleteButton (todos) {
    setDialogTodos(todos);
    console.log(todos);
    setDeleteDialogOpen(true);
  }
  function handleDeleteConfirm() {
    let newtodos = todoItems.filter((item) => item.id !== dialogTodos.id);
    setTodoItems(newtodos);
    localStorage.setItem("todos",JSON.stringify(newtodos));
    showhideSnackBar("تم حذف المهمة بنجاح");

    setDeleteDialogOpen(false);
  }
  function handleEditButton(todos) {
    setDialogTodos(todos);
    setEditDialogOpen(true);
  }
  function handleEditClose() {
    setEditDialogOpen(false);
  }
  function handleEditConfirm() {
    let newItems = todoItems.map((item) => {
      if (item.id === dialogTodos.id) {
        return { ...item,title: dialogTodos.title, details: dialogTodos.Details };
      }
      return item;
    });
    setTodoItems(newItems);
    localStorage.setItem("todos",JSON.stringify(newItems));

    setEditDialogOpen(false);
    showhideSnackBar("تم تعديل المهمة بنجاح");
  }
   return (
    
    <React.Fragment>
      <Container maxWidth="sm" disableGutters >
        <Card >
            <CardContent>
                <Typography gutterBottom sx={{fontSize:"40px",fontWeight:"bolder"}}>
                مهامي
                </Typography>
                <hr />

                <ButtonGroup aria-label="Basic button group" sx={{direction: 'ltr',marginTop: '20px',marginBottom: '20px'}}>
                    <Button
                        value="notcompleted"
                        onClick={() => setDisplayedItems("notcompleted")}
                        variant={displayedItems === "notcompleted" ? "contained" : "outlined"}
                    >
                        غير منجز
                    </Button>
                    <Button
                        value="completed"
                        onClick={() => setDisplayedItems("completed")}
                        variant={displayedItems === "completed" ? "contained" : "outlined"}
                    >
                        منجز
                    </Button>
                    <Button
                        value="All"
                        onClick={() => setDisplayedItems("All")}
                        variant={displayedItems === "All" ? "contained" : "outlined"}
                    >
                        الكل
                    </Button>
                </ButtonGroup>
                {items}
                <Grid container spacing={2} style={{marginTop: '20px'}}>
                    <Grid size={8} >
                        <TextField id="outlined-basic" label="عنوان المهمة" variant="outlined" style={{width:'100%'}} value={titleInput} onChange={(e)=>{setTitleInput(e.target.value)}}/>
                    </Grid>
                    <Grid size={4} >
                        <Button onClick={()=>handleAddItem()} disabled={titleInput.length==0} variant='contained' style={{width:'100%',height:'100%'}} >
                        إضافة
                        </Button>
                    
                    </Grid>
                </Grid>
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
                  <Button autoFocus  style={{color: '#b23c17'}} onClick={handleDeleteConfirm}>
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
            value={dialogTodos.title}
            onChange={(e) => setDialogTodos({...dialogTodos,title :e.target.value })}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="email"
            label="تفاصيل المهمة"
            fullWidth
            variant="standard"
            value={dialogTodos.Details}
            onChange={(e) => setDialogTodos({...dialogTodos,Details:e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>اغلاق</Button>
          <Button autoFocus onClick={handleEditConfirm} >
            تاكيد
          </Button>
        </DialogActions>
      </Dialog>
      </Container>
    </React.Fragment>
  );
}

