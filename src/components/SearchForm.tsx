import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Autocomplete,
  Button,
  Stack,
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { supabase } from '../supabaseClient';

const SearchForm = () => {
  const [card, setCard] = useState<{ label: string; id: string } | null>(null);
  const [airport, setAirport] = useState<{ label: string; code: string } | null>(null);
  const [cards, setCards] = useState<{ label: string; id: string }[]>([]);
  const [airports, setAirports] = useState<{ label: string; code: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Fetch cards
      const { data: cardData } = await supabase
        .from('cards')
        .select('id, name');
      // Fetch airports
      const { data: airportData } = await supabase
        .from('airports')
        .select('code, name, city');
      setCards(
        (cardData || []).map((c: any) => ({ label: c.name, id: c.id }))
      );
      setAirports(
        (airportData || []).map((a: any) => ({ label: `${a.code} - ${a.name} (${a.city})`, code: a.code }))
      );
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({
      pathname: '/results',
      search: new URLSearchParams({
        ...(card ? { cardId: card.id } : {}),
        ...(airport ? { airport: airport.code } : {}),
      }).toString(),
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <Autocomplete
          options={cards}
          value={card}
          onChange={(_, newValue) => setCard(newValue)}
          loading={loading}
          renderInput={(params) => (
            <TextField {...params} label="Enter or select your credit card" InputProps={{ ...params.InputProps, endAdornment: loading ? <CircularProgress color="inherit" size={20} /> : params.InputProps.endAdornment }} />
          )}
        />
        <Autocomplete
          options={airports}
          value={airport}
          onChange={(_, newValue) => setAirport(newValue)}
          loading={loading}
          renderInput={(params) => (
            <TextField {...params} label="Enter your city or airport" InputProps={{ ...params.InputProps, endAdornment: loading ? <CircularProgress color="inherit" size={20} /> : params.InputProps.endAdornment }} />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          endIcon={<SearchIcon />}
          disabled={!card && !airport || loading}
          sx={{ alignSelf: 'flex-start' }}
        >
          Check Lounge Access
        </Button>
      </Stack>
    </Box>
  );
};

export default SearchForm; 