import { Box, Container, Typography, Card, CardMedia, CardContent, Grid, CircularProgress } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const ResultsPage = () => {
  const [params] = useSearchParams();
  const cardId = params.get('cardId');
  const airportCode = params.get('airport');
  const [lounges, setLounges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLounges = async () => {
      setLoading(true);
      let query = supabase.from('lounges').select('*');
      if (cardId) {
        // Assuming you have a join table or a way to filter lounges by card
        query = query.contains('card_ids', [cardId]);
      }
      if (airportCode) {
        query = query.eq('airport_code', airportCode);
      }
      const { data } = await query;
      setLounges(data || []);
      setLoading(false);
    };
    fetchLounges();
  }, [cardId, airportCode]);

  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h5" mb={3}>
          {cardId
            ? `Lounges you can access with your card`
            : `Lounges at ${airportCode ?? 'selected airport'}`}
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={3}>
            {lounges.length === 0 ? (
              <Typography variant="body1" sx={{ m: 2 }}>
                No lounges found for your selection.
              </Typography>
            ) : (
              lounges.map((lounge) => (
                <Grid item xs={12} sm={6} md={4} key={lounge.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia component="img" height="140" image={lounge.photo || 'https://source.unsplash.com/random/400x200?lounge'} alt={lounge.name} />
                    <CardContent>
                      <Typography variant="h6">{lounge.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {lounge.airport_name || lounge.airport_code}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default ResultsPage; 