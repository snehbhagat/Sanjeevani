import { TextField } from '@mui/material';

export default function FormField({ id, label, errorText, ...props }) {
  const hasError = Boolean(errorText);
  return (
    <TextField
      id={id}
      label={label}
      fullWidth
      size="medium"
      error={hasError}
      helperText={errorText}
      aria-invalid={hasError ? 'true' : 'false'}
      aria-describedby={hasError ? `${id}-error` : undefined}
      {...props}
    />
  );
}
