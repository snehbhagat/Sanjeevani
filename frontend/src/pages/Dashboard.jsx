import EmergencyIcon from '@mui/icons-material/Emergency';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PeopleIcon from '@mui/icons-material/People';
import { Box, Grid } from '@mui/material';
import { useState } from 'react';
import AlertMessage from '../components/AlertMessage.jsx';
import Button from '../components/Button.jsx';
import FormField from '../components/FormField.jsx';
import Loading from '../components/Loading.jsx';
import StatCard from '../components/StatCard.jsx';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ search: '' });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await new Promise((r) => setTimeout(r, 800)); // mock
      setOk(true);
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const searchError = form.search.length > 0 && form.search.length < 3 ? 'Enter at least 3 characters' : '';

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <StatCard title="Total Donors" value="1,245" icon={<PeopleIcon color="primary" />} />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard title="Active Requests" value="32" icon={<EmergencyIcon color="error" />} />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard title="Your Badges" value="Silver" icon={<EmojiEventsIcon color="secondary" />} />
          </Grid>
        </Grid>
      </Box>

      <Box component="form" onSubmit={submit} noValidate aria-label="Quick actions" sx={{ display: 'grid', gap: 2, maxWidth: 480 }}>
        <FormField
          id="search"
          label="Search donors or requests"
          value={form.search}
          onChange={(e) => setForm((f) => ({ ...f, search: e.target.value }))}
          errorText={searchError}
        />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button type="submit" disabled={loading || Boolean(searchError)} aria-label="Run search">Search</Button>
          <Button variant="outlined" color="secondary" onClick={() => setForm({ search: '' })} aria-label="Clear search">Clear</Button>
        </Box>
      </Box>

      {loading && <Loading label="Fetching data..." />}
      <AlertMessage open={ok} onClose={() => setOk(false)} severity="success" message="Search complete" />
      {error && <AlertMessage open onClose={() => setError('')} severity="error" message={error} />}
    </Box>
  );
}
