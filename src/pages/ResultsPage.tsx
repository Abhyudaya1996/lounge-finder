import { Box, Container, Typography, Card, CardMedia, CardContent, Grid } from '@mui/material';
import { useLocation, useSearchParams } from 'react-router-dom';

// Temporary mock data
const lounges = [
  {
    id: 'lounge1',
    name: 'Plaza Premium Lounge',
    airport: 'DEL - Delhi',
    photo: 'https://source.unsplash.com/random/400x200?lounge',
  },
  {
    id: 'lounge2',
    name: 'Above Ground Lounge',
    airport: 'BOM - Mumbai',
    photo: 'https://source.unsplash.com/random/400x201?airport-lounge',
  },
];

const ResultsPage = () => {
  const [params] = useSearchParams();
  const cardId = params.get('cardId');
  const airportCode = params.get('airport');

  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h5" mb={3}>
          {cardId
            ? `Lounges you can access with your card`
            : `Lounges at ${airportCode ?? 'selected airport'}`}
        </Typography>
        <Grid container spacing={3}>
          {lounges.map((lounge) => (
            <Grid item xs={12} sm={6} md={4} key={lounge.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia component="img" height="140" image={lounge.photo} alt={lounge.name} />
                <CardContent>
                  <Typography variant="h6">{lounge.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {lounge.airport}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ResultsPage; 