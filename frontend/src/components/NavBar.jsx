import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((v) => !v);

  const NavLinks = ({ onClick }) => (
    <Box sx={{ display: { xs: 'block', md: 'flex' }, gap: 2 }} role="navigation" aria-label="Primary">
      <Button component={RouterLink} to="/" onClick={onClick} color="inherit">Home</Button>
      <Button component={RouterLink} to="/dashboard" onClick={onClick} color="inherit">Dashboard</Button>
      <Button component={RouterLink} to="/about" onClick={onClick} color="inherit">About</Button>
    </Box>
  );

  return (
    <AppBar position="sticky" color="primary" enableColorOnDark>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <BloodtypeIcon aria-hidden sx={{ ml: 1 }} />
          <Typography variant="h6" component={RouterLink} to="/" color="inherit" sx={{ textDecoration: 'none', flexGrow: 1, fontWeight: 700 }}>
            Sanjeevani
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <NavLinks />
          </Box>

          <IconButton
            edge="end"
            color="inherit"
            onClick={toggle}
            sx={{ display: { xs: 'inline-flex', md: 'none' } }}
            aria-label="Open navigation menu"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
        {open && (
          <Box sx={{ display: { xs: 'block', md: 'none' }, px: 2, pb: 2 }}>
            <NavLinks onClick={() => setOpen(false)} />
          </Box>
        )}
      </Container>
    </AppBar>
  );
}
