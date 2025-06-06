import { v4 as uuidv4 } from 'uuid';
export default function reducer (currentTodos, action) {
switch (action.type) {
    case 'ADD_ITEM':
    {
        let newItem={
                    id:uuidv4(),
                    title:action.payload.title,
                    details:"",
                    completed:false
                }
                const updatedTodo=[...currentTodos,newItem];
                localStorage.setItem("todos",JSON.stringify(updatedTodo));

                return updatedTodo;

    }
    case 'REMOVE_ITEM':
    {
        const updatedTodo=currentTodos.filter((todo)=>todo.id!==action.payload.id);
        localStorage.setItem("todos",JSON.stringify(updatedTodo));
        return updatedTodo;
    }
    case 'UPDATE_ITEM':
    {
        const updatedTodo=currentTodos.map((todo)=>{
            if(todo.id===action.payload.id){
                return {...todo, title:action.payload.title, details:action.payload.details};
            }
            return todo;
        });
        localStorage.setItem("todos",JSON.stringify(updatedTodo));
        return updatedTodo;
    }
    case 'TOGGLE_ITEM':
    {
        const updatedTodo=currentTodos.map((todo)=>{
            if(todo.id===action.payload.id){
                return {...todo, completed:!todo.completed};
            }
            return todo;
        });
        localStorage.setItem("todos",JSON.stringify(updatedTodo));
        return updatedTodo;
    }
    case "getTodos":
    {
        const todos=JSON.parse(localStorage.getItem("todos"));
        if(todos){
            return todos;
        }
        return [];
    }
    case "checkCompleted":
    {
        const completedTodos=currentTodos.filter((todo)=>todo.completed);
        return completedTodos;
    }
    default:
        { throw new Error(`Unhandled action type: ${action.type}`);}
    }
    return []   
}
