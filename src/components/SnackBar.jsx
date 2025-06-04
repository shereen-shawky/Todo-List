import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function SnackBar({open, messege}) {

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} style={{ direction: 'rtl' }}>
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {messege}
        </Alert>
      </Snackbar>
    </div>
  );
}
