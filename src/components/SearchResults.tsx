import React, { useState } from 'react';
import { ArrowLeft, MapPin, Clock, Star, CreditCard, Plane, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LoungePage from './LoungePage';
import { Lounge } from '@/types/lounge';

interface SearchResultsProps {
  results: Lounge[];
  searchType: 'card' | 'city' | 'network' | 'multi';
  searchQuery: string;
  selectedCard?: string;
  selectedLocation?: string;
  selectedNetwork?: string;
  eligibleCards?: string[];
  onBack: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ 
  results, 
  searchType, 
  searchQuery, 
  selectedCard,
  selectedLocation,
  selectedNetwork,
  eligibleCards = [],
  onBack 
}) => {
  const [selectedLounge, setSelectedLounge] = useState<Lounge | null>(null);

  // Scroll to top when component mounts or results change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [results]);

  if (selectedLounge) {
    return <LoungePage lounge={selectedLounge} onBack={() => setSelectedLounge(null)} searchedCard={selectedCard} />;
  }

  // Helper function to get a fallback image
  const getFallbackImage = () => {
    return '/lovable-uploads/e54585c7-7f5f-4ac5-9085-1e462e89b9e2.png';
  };

  const getResultsTitle = () => {
    if (searchType === 'multi') {
      const criteria = [];
      if (selectedCard) criteria.push(selectedCard);
      if (selectedLocation) criteria.push(selectedLocation);
      if (selectedNetwork) criteria.push(selectedNetwork);
      return `Lounges matching: ${criteria.join(', ')}`;
    } else if (searchType === 'card') {
      return `Lounges you can access with ${selectedCard}`;
    } else if (searchType === 'city') {
      return `Lounges at ${selectedLocation}`;
    } else {
      return `Lounges accepting ${selectedNetwork} cards`;
    }
  };

  const getResultsSubtitle = () => {
    if (searchType === 'multi') {
      return "Perfect matches for your search criteria:";
    } else if (searchType === 'card') {
      return "Enjoy your journey! Here's where you can relax:";
    } else if (searchType === 'city') {
      return "Available lounges at your destination:";
    } else {
      return `Lounges that accept ${selectedNetwork} network cards:`;
    }
  };

  function generateStarRating(rating: number, reviewCount: number) {
    const filledStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);
    return (
      <span className="flex items-center gap-1 text-yellow-500 font-semibold text-sm">
        <span className="text-gray-900 font-bold mr-1">{rating?.toFixed(1)}</span>
        {Array.from({ length: filledStars }).map((_, i) => <span key={i}>★</span>)}
        {halfStar && <span>☆</span>}
        {Array.from({ length: emptyStars }).map((_, i) => <span key={i + 10}>☆</span>)}
      </span>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mr-4 p-2 hover:bg-white/50 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{getResultsTitle()}</h1>
            <p className="text-gray-600 mt-1">{getResultsSubtitle()}</p>
          </div>
        </div>

        {/* Search Summary */}
        {(selectedCard || selectedLocation || selectedNetwork) && (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mb-6 border border-gray-200">
            <div className="flex items-center justify-center text-gray-700 flex-wrap gap-2">
              {selectedCard && (
                <span className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                  <CreditCard className="w-4 h-4 mr-2 text-blue-600" />
                  {selectedCard}
                </span>
              )}
              {selectedLocation && (
                <span className="flex items-center bg-amber-50 px-3 py-1 rounded-full">
                  <MapPin className="w-4 h-4 mr-2 text-amber-600" />
                  {selectedLocation}
                </span>
              )}
              {selectedNetwork && (
                <span className="flex items-center bg-green-50 px-3 py-1 rounded-full">
                  <Network className="w-4 h-4 mr-2 text-green-600" />
                  {selectedNetwork}
                </span>
              )}
              <span className="text-gray-500">• {results.length} result{results.length !== 1 ? 's' : ''}</span>
            </div>
          </div>
        )}

        {/* Results */}
        {results.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Plane className="w-16 h-16 text-gray-400 transform rotate-45" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No lounges found</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {searchType === 'card' 
                  ? selectedCard?.toLowerCase().includes('infini') || selectedCard?.toLowerCase().includes('emerald')
                    ? `"${selectedCard}" might not be in our database yet, but these premium cards offer similar lounge access:`
                    : "Sorry, no lounges available with this card. But you can unlock access with these cards:"
                  : "No lounges found matching your search criteria."
                }
              </p>
              
              {/* Show eligible cards for all search types when no lounges found */}
              {eligibleCards.length > 0 && (
                <div className="mb-8">
                  <div className="mb-8">
                   <h3 className="text-lg font-semibold text-gray-800 mb-4">
                     {searchType === 'card' 
                       ? `Cards that give you lounge access${selectedLocation ? ` at ${selectedLocation}` : ''}:`
                       : searchType === 'city' 
                         ? `Cards that unlock lounges at ${selectedLocation}:`
                         : `Cards available for ${selectedNetwork} network:`
                     }
                   </h3>
                  <div className="grid gap-4 max-w-2xl mx-auto">
                    {eligibleCards.slice(0, 5).map((cardName, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
                            <CreditCard className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-semibold text-gray-800">{cardName}</span>
                        </div>
                        <Button 
                          className="apply-now-btn shimmer bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                          style={{ position: 'relative', overflow: 'hidden', animationDuration: '2.5s', minWidth: 120 }}
                          onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(cardName + ' credit card apply online')}`, '_blank')}
                        >
                          <span style={{ position: 'relative', zIndex: 2 }}>Apply Now</span>
                        </Button>
                      </div>
                    ))}
                    {eligibleCards.length > 5 && (
                      <div className="text-center">
                        <p className="text-sm text-gray-500 mb-3">
                          +{eligibleCards.length - 5} more cards available
                        </p>
                        <Button 
                          variant="outline" 
                          className="border-blue-200 text-blue-600 hover:bg-blue-50"
                          onClick={() => {/* Show all cards logic */}}
                        >
                          View All Cards
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              )}
              
              <Button onClick={onBack} className="bg-blue-600 hover:bg-blue-700">
                Try Another Search
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((lounge, index) => (
              <Card 
                key={lounge.id} 
                className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm border-0 shadow-lg"
                onClick={() => setSelectedLounge(lounge)}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: 'fade-in 0.6s ease-out forwards'
                }}
              >
                <div className="relative h-48 bg-gradient-to-br from-blue-100 to-amber-100 rounded-t-lg overflow-hidden">
                  <img 
                    src={lounge.image} 
                    alt={lounge.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = getFallbackImage();
                    }}
                  />
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{lounge.name}</h3>
                  {/* Google-style rating display */}
                  {generateStarRating(lounge.google_rating, lounge.google_reviews)}
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{lounge.terminal} • {lounge.airport} • {lounge.city}, {lounge.state}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{lounge.hours}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {lounge.amenities.slice(0, 3).map((amenity: string) => (
                      <Badge key={amenity} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {lounge.amenities.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{lounge.amenities.length - 3} more
                      </Badge>
                    )}
                  </div>

                  {/* Show networks for network searches */}
                  {(searchType === 'network' || searchType === 'city') && lounge.networks?.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2">Accepted networks:</p>
                      <div className="flex flex-wrap gap-1">
                        {lounge.networks.slice(0, 3).map((network: string) => (
                          <Badge key={network} variant="outline" className="text-xs">
                            {network}
                          </Badge>
                        ))}
                        {lounge.networks.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{lounge.networks.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Show eligible cards for location searches */}
                  {searchType === 'city' && lounge.eligibleCards.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2">Eligible cards:</p>
                      <div className="flex flex-wrap gap-1">
                        {lounge.eligibleCards.slice(0, 2).map((card: string) => (
                          <Badge key={card} variant="outline" className="text-xs">
                            {card}
                          </Badge>
                        ))}
                        {lounge.eligibleCards.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{lounge.eligibleCards.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
