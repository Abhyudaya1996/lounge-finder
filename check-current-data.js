import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bgluvhaacblcwnxmwzvr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnbHV2aGFhY2JsY3dueG13enZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0MzM2MjIsImV4cCI6MjA2NzAwOTYyMn0.jMdMuuu77LDp7Kau-NEgZZrOCWMF2VyYh3D6RKMCCXI';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkCurrentData() {
  console.log('=== CHECKING CURRENT CARDS_LOUNGE DATA ===');
  
  // Get all data from cards_lounge
  const { data: cardLoungeData, error: cardLoungeError } = await supabase
    .from('cards_lounge')
    .select('*');

  if (cardLoungeError) {
    console.error('Card-lounge fetch error:', cardLoungeError);
    return;
  }

  console.log(`Total relationships: ${cardLoungeData?.length || 0}`);

  // Check for any HDFC cards
  const hdfcCards = cardLoungeData?.filter(rel => 
    rel.card_name && rel.card_name.toLowerCase().includes('hdfc')
  ) || [];

  console.log(`HDFC cards found: ${hdfcCards.length}`);

  if (hdfcCards.length > 0) {
    console.log('Sample HDFC cards:');
    hdfcCards.slice(0, 5).forEach(rel => {
      console.log(`  - "${rel.card_name}" (Lounge ID: ${rel.lounge_id}, Network: ${rel.network})`);
    });
  } else {
    console.log('No HDFC cards found in cards_lounge table');
    
    // Check what cards are actually there
    const uniqueCards = [...new Set(cardLoungeData?.map(rel => rel.card_name).filter(Boolean))];
    console.log(`\nUnique cards in table (${uniqueCards.length} total):`);
    uniqueCards.slice(0, 20).forEach(card => {
      console.log(`  - "${card}"`);
    });
    
    if (uniqueCards.length > 20) {
      console.log(`  ... and ${uniqueCards.length - 20} more`);
    }
  }

  // Check for any cards with "Infinia" in the name
  const infiniaCards = cardLoungeData?.filter(rel => 
    rel.card_name && rel.card_name.toLowerCase().includes('infini')
  ) || [];

  console.log(`\nCards with "Infinia" found: ${infiniaCards.length}`);
  if (infiniaCards.length > 0) {
    infiniaCards.forEach(rel => {
      console.log(`  - "${rel.card_name}" (Lounge ID: ${rel.lounge_id}, Network: ${rel.network})`);
    });
  }
}

checkCurrentData().catch(console.error); 