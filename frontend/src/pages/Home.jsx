import ChatIcon from '@mui/icons-material/Chat';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import Button from '../components/Button.jsx';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={7}>
          <Typography variant="h2" component="h1" gutterBottom>
            Find and coordinate blood donations faster
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Sanjeevani helps patients and donors connect quickly with clear, accessible tools.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button color="primary" aria-label="Start a donor request">Request Blood</Button>
            <Button color="secondary" variant="outlined" aria-label="Register as donor">Become a Donor</Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper elevation={0} sx={{ p: 3, bgcolor: 'primary.50', border: '1px solid', borderColor: 'primary.100' }}>
            <Typography variant="subtitle1" gutterBottom>Why Sanjeevani?</Typography>
            <ul>
              <li>Simple, consistent navigation</li>
              <li>Fast, responsive interface</li>
              <li>Accessible and inclusive design</li>
            </ul>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <Feature icon={<VolunteerActivismIcon />} title="Donate with Confidence" text="Clear steps, reminders, and secure profiles." />
        </Grid>
        <Grid item xs={12} md={4}>
          <Feature icon={<QueryStatsIcon />} title="Track Requests" text="See status and updates in real time." />
        </Grid>
        <Grid item xs={12} md={4}>
          <Feature icon={<ChatIcon />} title="Get Help" text="Guided answers from our assistant." />
        </Grid>
      </Grid>
    </Container>
  );
}

function Feature({ icon, title, text }) {
  return (
    <Box sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
        <Box aria-hidden>{icon}</Box>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>{title}</Typography>
      </Box>
      <Typography color="text.secondary">{text}</Typography>
    </Box>
  );
}
