import React, { useEffect,useState ,useContext} from 'react'
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


export default function List() {
    let [todoItems, setTodoItems] = useContext(completedcontext);
    let [titleInput, setTitleInput] = useState("")
    let [displayedItems, setDisplayedItems] = useState("All");
    
    // Filter the todoItems based on the displayedItems state
    let completedItems = todoItems.filter((item) => item.completed);
    let notCompletedItems = todoItems.filter((item) => !item.completed);
    let filteredItems = displayedItems === "completed" ? completedItems : displayedItems === "notcompleted" ? notCompletedItems : todoItems;
    let items=filteredItems.map((item) => {
        return (
            <ListItems key={item.id} todos={item}
            />
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
        setTitleInput("");
    }
    //use effect is used for side effects, like fetching data or updating the DOM
    useEffect(() => {
        const storedTodos = localStorage.getItem("todos");
        if (storedTodos) {
            setTodoItems(JSON.parse(storedTodos));
        }
    }, []);
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
      </Container>
    </React.Fragment>
  );
}

