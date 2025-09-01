import { Box, Container } from '@mui/material';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer.jsx';
import NavBar from './components/NavBar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Home from './pages/Home.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <a
        href="#main"
        style={{ position: 'absolute', left: -10000, top: 'auto', width: 1, height: 1, overflow: 'hidden' }}
        onFocus={(e) => {
          e.target.style.left = '8px';
          e.target.style.top = '8px';
          e.target.style.width = 'auto';
          e.target.style.height = 'auto';
        }}
      >
        Skip to content
      </a>
      <NavBar />
      <Box component="main" id="main" sx={{ py: { xs: 3, md: 5 }, minHeight: '70vh' }}>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Box>Page not found. <Link to="/">Go home</Link></Box>} />
          </Routes>
        </Container>
      </Box>
      <Footer />
    </BrowserRouter>
  );
}
