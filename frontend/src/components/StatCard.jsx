import { Box, Card, CardContent, Typography } from '@mui/material';

export default function StatCard({ title, value, icon }) {
  return (
    <Card elevation={1}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box aria-hidden>{icon}</Box>
          <Box>
            <Typography variant="body2" color="text.secondary">{title}</Typography>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>{value}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
