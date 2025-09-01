import { Box, CircularProgress, Typography } from '@mui/material';

export default function Loading({ label = 'Loading...' }) {
  return (
    <Box role="status" aria-live="polite" sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2 }}>
      <CircularProgress size={24} />
      <Typography>{label}</Typography>
    </Box>
  );
}
