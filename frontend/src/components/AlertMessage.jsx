import { Alert, Snackbar } from '@mui/material';

export default function AlertMessage({ open, onClose, severity = 'success', message }) {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Alert onClose={onClose} severity={severity} variant="filled" sx={{ width: '100%' }} role="alert">
        {message}
      </Alert>
    </Snackbar>
  );
}
