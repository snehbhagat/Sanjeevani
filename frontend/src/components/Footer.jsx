import { Box, Container, Link, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ borderTop: '1px solid', borderColor: 'divider', py: 3, backgroundColor: 'background.paper' }}>
      <Container maxWidth="lg" sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Typography variant="body2">© {new Date().getFullYear()} Sanjeevani</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Link href="#privacy">Privacy</Link>
          <Link href="#terms">Terms</Link>
          <Link href="#contact">Contact</Link>
        </Box>
      </Container>
    </Box>
  );
}
