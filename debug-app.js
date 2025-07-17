import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bgluvhaacblcwnxmwzvr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnbHV2aGFhY2JsY3dueG13enZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0MzM2MjIsImV4cCI6MjA2NzAwOTYyMn0.jMdMuuu77LDp7Kau-NEgZZrOCWMF2VyYh3D6RKMCCXI';

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugAppSearch() {
  console.log('=== DEBUGGING APP SEARCH LOGIC ===');
  
  // First, let's fetch the data exactly like the app does
  console.log('1. Fetching data from database...');
  
  const { data: loungesData, error: loungesError } = await supabase
    .from('LoungesDB')
    .select('*');

  if (loungesError) {
    console.error('Lounges fetch error:', loungesError);
    return;
  }

  const { data: cardLoungeData, error: cardLoungeError } = await supabase
    .from('cards_lounge')
    .select('*');

  if (cardLoungeError) {
    console.error('Card-lounge fetch error:', cardLoungeError);
    return;
  }

  console.log(`2. Raw data: ${loungesData?.length || 0} lounges, ${cardLoungeData?.length || 0} card-lounge relationships`);

  // Transform data exactly like the app does
  const transformedLounges = loungesData?.map((lounge) => {
    const loungeRelations = cardLoungeData?.filter((cl) => cl.lounge_id === lounge.Lounge_Id) || [];
    const eligibleCards = loungeRelations.map((rel) => rel.card_name || 'Unknown Card');
    const networks = [...new Set(loungeRelations.map((rel) => rel.network).filter(Boolean))];

    return {
      id: lounge.Lounge_Id,
      name: lounge['Lounge Name'] || 'Unknown Lounge',
      airport: lounge['Airport Name'] || 'Unknown Airport',
      city: lounge.City || 'Unknown City',
      state: lounge.State || 'Unknown State',
      eligibleCards,
      networks,
    };
  }) || [];

  console.log(`3. Transformed data: ${transformedLounges.length} lounges`);

  // Test the search logic
  const searchCard = 'HDFC Bank Infinia Credit Card';
  console.log(`4. Testing search for: "${searchCard}"`);

  // Get all unique card names from the transformed data
  const allCardNames = new Set();
  transformedLounges.forEach(lounge => {
    lounge.eligibleCards.forEach(card => allCardNames.add(card));
  });

  console.log('5. All unique card names in system:', Array.from(allCardNames));

  // Check if the card exists
  const cardExists = Array.from(allCardNames).some(card => 
    card.toLowerCase().includes(searchCard.toLowerCase()) || 
    searchCard.toLowerCase().includes(card.toLowerCase())
  );
  console.log(`6. Card exists in relationships: ${cardExists}`);

  // Test the actual search logic
  const results = transformedLounges.filter(lounge => {
    const matchesCard = lounge.eligibleCards.some(card => {
      const cardLower = card.toLowerCase();
      const searchLower = searchCard.toLowerCase();
      
      // Try exact match first
      if (cardLower === searchLower) {
        console.log(`Exact match found: "${card}" for search "${searchCard}"`);
        return true;
      }
      
      // Try partial matches
      if (cardLower.includes(searchLower) || searchLower.includes(cardLower)) {
        console.log(`Partial match found: "${card}" for search "${searchCard}"`);
        return true;
      }
      
      // Try matching individual words
      const cardWords = cardLower.split(' ');
      const searchWords = searchLower.split(' ');
      
      // Check if most significant words match (excluding common words)
      const significantSearchWords = searchWords.filter(word => 
        !['credit', 'card', 'bank'].includes(word) && word.length > 2
      );
      
      // If we have significant search words, check if ALL of them are found in the card name
      if (significantSearchWords.length > 0) {
        const allWordsFound = significantSearchWords.every(searchWord => 
          cardWords.some(cardWord => cardWord.includes(searchWord) || searchWord.includes(cardWord))
        );
        
        if (allWordsFound) {
          console.log(`Word match found: "${card}" for search "${searchCard}" (all words: ${significantSearchWords.join(', ')})`);
          return true;
        }
      }
      
      return false;
    });

    return matchesCard;
  });

  console.log(`7. Search results: ${results.length} lounges found`);
  
  if (results.length > 0) {
    console.log('8. First few results:');
    results.slice(0, 3).forEach(lounge => {
      console.log(`   - ${lounge.name} (${lounge.city}) - Eligible cards: ${lounge.eligibleCards.join(', ')}`);
    });
  } else {
    console.log('8. No results found - checking why...');
    
    // Check what cards are actually in the lounges
    const loungesWithHDFC = transformedLounges.filter(lounge => 
      lounge.eligibleCards.some(card => card.toLowerCase().includes('hdfc'))
    );
    
    console.log(`   Found ${loungesWithHDFC.length} lounges with HDFC cards`);
    if (loungesWithHDFC.length > 0) {
      console.log('   Sample HDFC cards found:');
      loungesWithHDFC.slice(0, 3).forEach(lounge => {
        const hdfcCards = lounge.eligibleCards.filter(card => card.toLowerCase().includes('hdfc'));
        console.log(`     - ${lounge.name}: ${hdfcCards.join(', ')}`);
      });
    }
  }
}

debugAppSearch().catch(console.error); 