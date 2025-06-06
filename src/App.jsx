import { useState } from 'react'
import './App.css'
import List from "./components/List"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {CompletedContextProvider} from './contexts/completedcontext.jsx';
import { v4 as uuidv4 } from 'uuid';
import {SnackBarProvider} from './contexts/snackBarcontext.jsx';

const theme = createTheme({
  typography: {
    fontFamily: 'A',
  },
  palette: {
  primary: {
    main: '#1976d2',
  },}
});
let initialItems=[
    { id: uuidv4(), title: 'مهمة 1',details:"", completed: false },
    { id: uuidv4(), title: 'مهمة 2',details:"", completed: false },
    { id: uuidv4(), title: 'مهمة 3',details:"", completed: false },
]

function App() {

  let [todoItems, setTodoItems] = useState(initialItems);

  return (
    
    <CompletedContextProvider >
    <ThemeProvider theme={theme}>
    <SnackBarProvider>
    <div className="App" style={{ direction: 'rtl', fontFamily: 'A' ,display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <List />
    </div>
    </SnackBarProvider>
    </ThemeProvider>
    </CompletedContextProvider>
  )
}

export default App
