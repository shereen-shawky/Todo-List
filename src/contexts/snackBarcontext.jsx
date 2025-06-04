import SnackBar from './../components/SnackBar';
import  { useState,useContext,createContext } from 'react';

const SnackBarContext=createContext({});

export function SnackBarProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [messege, setMessege] = useState("");

  const showhideSnackBar = (message) => {
    setMessege(message);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  return (
    <SnackBarContext.Provider value={{ showhideSnackBar }}>
      {children}
      <SnackBar open={open} messege={messege} />
    </SnackBarContext.Provider>
  );
};
export const usesnackBar=() =>{
  return useContext(SnackBarContext);
}