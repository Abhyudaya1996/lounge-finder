import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xqjqflqjqjqjqjqjqjqj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxanFmbHFqcWpxanFqcWpxanFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5NzE5NzQsImV4cCI6MjA0NzU0Nzk3NH0.Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8Ej8';
const supabase = createClient(supabaseUrl, supabaseKey);

async function debugHDFCInfinia() {
  console.log('=== DEBUGGING HDFC INFINIA ===\n');

  // 1. Check if HDFC Infinia exists in cards table
  console.log('1. Checking cards table for HDFC Infinia...');
  const { data: cardsData, error: cardsError } = await supabase
    .from('cards')
    .select('*')
    .ilike('Card_Name', '%HDFC%Infinia%');

  if (cardsError) {
    console.error('Cards error:', cardsError);
    return;
  }

  console.log('HDFC Infinia cards found:', cardsData.length);
  cardsData.forEach(card => {
    console.log(`- Card ID: ${card.Card_ID}, Name: "${card.Card_Name}", Network: ${card.CG_Name}`);
  });

  // 2. Check if HDFC Infinia exists in cards_lounge table
  console.log('\n2. Checking cards_lounge table for HDFC Infinia...');
  const { data: cardLoungeData, error: cardLoungeError } = await supabase
    .from('cards_lounge')
    .select('*')
    .ilike('card_name', '%HDFC%Infinia%');

  if (cardLoungeError) {
    console.error('Card-lounge error:', cardLoungeError);
    return;
  }

  console.log('HDFC Infinia in cards_lounge found:', cardLoungeData.length);
  cardLoungeData.forEach(rel => {
    console.log(`- Lounge ID: ${rel.lounge_id}, Card: "${rel.card_name}", Network: ${rel.network}`);
  });

  // 3. Check all HDFC cards in cards_lounge
  console.log('\n3. Checking all HDFC cards in cards_lounge...');
  const { data: allHDFCData, error: allHDFCError } = await supabase
    .from('cards_lounge')
    .select('*')
    .ilike('card_name', '%HDFC%');

  if (allHDFCError) {
    console.error('All HDFC error:', allHDFCError);
    return;
  }

  console.log('All HDFC cards in cards_lounge:', allHDFCData.length);
  const uniqueHDFCCards = [...new Set(allHDFCData.map(rel => rel.card_name))];
  uniqueHDFCCards.forEach(card => {
    console.log(`- "${card}"`);
  });

  // 4. Check what lounges HDFC Infinia should have access to
  if (cardLoungeData.length > 0) {
    console.log('\n4. Checking lounges that HDFC Infinia should have access to...');
    const loungeIds = cardLoungeData.map(rel => rel.lounge_id);
    
    const { data: loungesData, error: loungesError } = await supabase
      .from('LoungesDB')
      .select('*')
      .in('Lounge_Id', loungeIds);

    if (loungesError) {
      console.error('Lounges error:', loungesError);
      return;
    }

    console.log('Lounges HDFC Infinia should have access to:', loungesData.length);
    loungesData.forEach(lounge => {
      console.log(`- "${lounge['Lounge Name']}" in ${lounge.City}`);
    });
  }

  // 5. Simulate the transformation logic
  console.log('\n5. Simulating transformation logic...');
  const { data: allLoungesData } = await supabase.from('LoungesDB').select('*');
  const { data: allCardLoungeData } = await supabase.from('cards_lounge').select('*');
  
  const transformedLounges = allLoungesData?.map((lounge) => {
    const loungeRelations = allCardLoungeData?.filter((cl) => cl.lounge_id === lounge.Lounge_Id) || [];
    const eligibleCards = loungeRelations.map((rel) => rel.card_name || 'Unknown Card');
    
    // Check if this lounge has HDFC Infinia
    const hasHDFCInfinia = eligibleCards.some(card => 
      card.toLowerCase().includes('hdfc') && card.toLowerCase().includes('infini')
    );
    
    if (hasHDFCInfinia) {
      console.log(`Lounge "${lounge['Lounge Name']}" has HDFC Infinia access. Eligible cards:`, eligibleCards);
    }
    
    return {
      id: lounge.Lounge_Id,
      name: lounge['Lounge Name'],
      eligibleCards
    };
  }) || [];

  const loungesWithHDFCInfinia = transformedLounges.filter(lounge => 
    lounge.eligibleCards.some(card => 
      card.toLowerCase().includes('hdfc') && card.toLowerCase().includes('infini')
    )
  );

  console.log(`\nTotal lounges with HDFC Infinia access: ${loungesWithHDFCInfinia.length}`);
}

debugHDFCInfinia().catch(console.error); 