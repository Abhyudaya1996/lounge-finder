import { Box, Container, Typography } from '@mui/material';
import GlobeAnimation from './components/GlobeAnimation';
import SearchForm from './components/SearchForm';
import { Routes, Route } from 'react-router-dom';
import ResultsPage from './pages/ResultsPage';

const App = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Routes>
        <Route
          path="/"
          element={
            <Container
              maxWidth="md"
              sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                py: 4,
              }}
            >
              <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                Beat the queue. Check your lounge eligibility on Lounge Finder.
              </Typography>
              <Typography variant="subtitle1" mb={4}>
                Find out which airport lounges you can access with your credit card, or discover the best cards for your city.
              </Typography>
              <Box sx={{ width: '100%', mb: 4 }}>
                <SearchForm />
              </Box>
              <Box
                sx={{
                  width: { xs: 300, md: 400 },
                  height: { xs: 300, md: 400 },
                  position: 'relative',
                }}
              >
                <GlobeAnimation />
              </Box>
            </Container>
          }
        />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Box>
  );
};

export default App; 