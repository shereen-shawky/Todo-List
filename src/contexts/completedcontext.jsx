import { createContext } from "react";
import { useReducer ,useContext} from "react";
import reducer from "../Reducers/AddReducer.jsx";

let completedcontext=createContext([]);

export function CompletedContextProvider({ children }) {
    const [todoItems, dispatch] = useReducer(reducer, []);
    
    return (
        <completedcontext.Provider value={[todoItems, dispatch]}>
            {children}
        </completedcontext.Provider>
    );
}
export const useContextReducer=() =>{
   return useContext(completedcontext);
}