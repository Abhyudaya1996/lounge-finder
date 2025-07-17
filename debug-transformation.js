import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bgluvhaacblcwnxmwzvr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnbHV2aGFhY2JsY3dueG13enZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0MzM2MjIsImV4cCI6MjA2NzAwOTYyMn0.jMdMuuu77LDp7Kau-NEgZZrOCWMF2VyYh3D6RKMCCXI';

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugTransformation() {
  console.log('=== DEBUGGING DATA TRANSFORMATION ===');
  
  // Fetch data
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

  console.log(`1. Raw data: ${loungesData?.length || 0} lounges, ${cardLoungeData?.length || 0} card-lounge relationships`);

  // Check for HDFC cards in card_lounge data
  const hdfcRelationships = cardLoungeData?.filter(rel => 
    rel.card_name && rel.card_name.toLowerCase().includes('hdfc')
  ) || [];

  console.log(`2. HDFC relationships found: ${hdfcRelationships.length}`);
  
  if (hdfcRelationships.length > 0) {
    console.log('3. Sample HDFC relationships:');
    hdfcRelationships.slice(0, 5).forEach(rel => {
      console.log(`   - Card: "${rel.card_name}", Lounge ID: ${rel.lounge_id}, Network: "${rel.network}"`);
    });
  }

  // Check lounge IDs that have HDFC cards
  const hdfcLoungeIds = [...new Set(hdfcRelationships.map(rel => rel.lounge_id))];
  console.log(`4. Unique lounge IDs with HDFC cards: ${hdfcLoungeIds.length}`);
  console.log('   Lounge IDs:', hdfcLoungeIds.slice(0, 10), hdfcLoungeIds.length > 10 ? '...' : '');

  // Check if these lounge IDs exist in the lounges data
  const existingLoungeIds = loungesData?.map(lounge => lounge.Lounge_Id) || [];
  console.log(`5. Total lounge IDs in lounges table: ${existingLoungeIds.length}`);
  
  const matchingLoungeIds = hdfcLoungeIds.filter(id => existingLoungeIds.includes(id));
  console.log(`6. HDFC lounge IDs that exist in lounges table: ${matchingLoungeIds.length}`);

  // Test the transformation for a specific lounge
  if (matchingLoungeIds.length > 0) {
    const testLoungeId = matchingLoungeIds[0];
    console.log(`\n7. Testing transformation for lounge ID: ${testLoungeId}`);
    
    const testLounge = loungesData?.find(lounge => lounge.Lounge_Id === testLoungeId);
    const testRelations = cardLoungeData?.filter(cl => cl.lounge_id === testLoungeId) || [];
    
    console.log(`   Lounge name: "${testLounge?.['Lounge Name']}"`);
    console.log(`   Relations found: ${testRelations.length}`);
    
    if (testRelations.length > 0) {
      console.log('   Card names in relations:');
      testRelations.forEach(rel => {
        console.log(`     - "${rel.card_name}" (Network: ${rel.network})`);
      });
    }
    
    // Test the transformation
    const eligibleCards = testRelations.map(rel => rel.card_name || 'Unknown Card');
    console.log(`   Transformed eligible cards: ${eligibleCards.length} cards`);
    console.log('   Cards:', eligibleCards);
  }

  // Check for any data type mismatches
  console.log('\n8. Checking data types...');
  console.log('   Sample lounge ID type:', typeof loungesData?.[0]?.Lounge_Id);
  console.log('   Sample card-lounge lounge_id type:', typeof cardLoungeData?.[0]?.lounge_id);
  
  // Check if there are any null or undefined values
  const nullLoungeIds = cardLoungeData?.filter(rel => rel.lounge_id === null || rel.lounge_id === undefined);
  console.log(`   Card-lounge relationships with null lounge_id: ${nullLoungeIds?.length || 0}`);
  
  const nullCardNames = cardLoungeData?.filter(rel => rel.card_name === null || rel.card_name === undefined);
  console.log(`   Card-lounge relationships with null card_name: ${nullCardNames?.length || 0}`);
}

debugTransformation().catch(console.error); 