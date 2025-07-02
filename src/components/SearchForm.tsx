import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Autocomplete,
  Button,
  Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// Temporary mock data. Replace with API data via React-Query.
const cards = [
  { label: 'HDFC Bank Diners Club', id: 'card1' },
  { label: 'SBI Card Elite', id: 'card2' },
];

const airports = [
  { label: 'DEL - Delhi Indira Gandhi International', code: 'DEL' },
  { label: 'BOM - Mumbai Chhatrapati Shivaji', code: 'BOM' },
];

const SearchForm = () => {
  const [card, setCard] = useState<{ label: string; id: string } | null>(null);
  const [airport, setAirport] = useState<{ label: string; code: string } | null>(null);
  const navigate = useNavigate();

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
          renderInput={(params) => (
            <TextField {...params} label="Enter or select your credit card" />
          )}
        />
        <Autocomplete
          options={airports}
          value={airport}
          onChange={(_, newValue) => setAirport(newValue)}
          renderInput={(params) => (
            <TextField {...params} label="Enter your city or airport" />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          endIcon={<SearchIcon />}
          disabled={!card && !airport}
          sx={{ alignSelf: 'flex-start' }}
        >
          Check Lounge Access
        </Button>
      </Stack>
    </Box>
  );
};

export default SearchForm; 