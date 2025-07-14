import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, Users, Wifi, Coffee, Car, Utensils, Bath, Baby, Star, CreditCard, Globe, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useLocation } from 'react-router-dom';
import { Lounge } from '@/types/lounge';

interface LoungePageProps {
  lounge: Lounge;
  onBack: () => void;
  searchedCard?: string;
}

const ContactSvg = ({ className = '' }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 84.04" fill="#e11d48" width="20" height="20">
    <title>call-message</title>
    <path d="M34.11,3h83a5.8,5.8,0,0,1,5.79,5.79V70.27a5.76,5.76,0,0,1-1,3.25,2.32,2.32,0,0,1-.55.82,2.2,2.2,0,0,1-.54.38,5.78,5.78,0,0,1-3.7,1.35H68a15.44,15.44,0,0,0,.42-4.45h47.22L84.8,39.23,74.62,47.91h0a2.22,2.22,0,0,1-2.84,0L61.1,39.23h0l-9.69,9.71A12.4,12.4,0,0,0,47,47.07L57.64,36.41,37.91,20.32a14,14,0,0,0-.68-3.42l-.79-3.49L73.15,43.34,115.26,7.46H35.11L34.11,3ZM17.46,31a61.46,61.46,0,0,0,4.73,14.91A51.89,51.89,0,0,0,32.61,60.48a1.47,1.47,0,0,0,1.17.45,5.31,5.31,0,0,0,2-.67,17.91,17.91,0,0,0,2.1-1.36c3.14-2.18,7-4.89,10.29-1.85.08.07.12.14.2.2L58.84,68.78a1.13,1.13,0,0,1,.1.13,6.09,6.09,0,0,1,.79,5.77,14.31,14.31,0,0,1-3.94,5.76,13.76,13.76,0,0,1-7.94,3.46,29.8,29.8,0,0,1-8.28-.4,27.16,27.16,0,0,1-11.31-4.73,54.16,54.16,0,0,1-9.86-9.43l-.24-.29c-1.52-1.8-3.16-3.73-4.69-5.88A78.72,78.72,0,0,1,1,34.34C-.72,25.59-.37,16.85,3.33,9.62c2-4,5.06-7.2,9-8.69,3.44-1.32,7.51-1.34,12.13.63a1.67,1.67,0,0,1,1,1.24l3.73,16.58a4.57,4.57,0,0,1-.82,4.88,9.43,9.43,0,0,1-4.29,2.5c-.56.24-1.21.45-1.9.67-2.27.74-4.86,1.61-4.73,3.65v0Zm70.72,5.33,30.26,31.73V10.58L88.18,36.36Z"/>
  </svg>
);

const PhoneSvg = ({ className = '' }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 122.88 122.267" fill="#e11d48">
    <g>
      <path d="M33.822,50.291c4.137,7.442,8.898,14.604,15.074,21.133C55.1,77.984,62.782,83.962,72.771,89.03l0.01,0.005l0.002-0.005 c0.728,0.371,1.421,0.362,2.072,0.118c0.944-0.353,1.927-1.137,2.883-2.086c0.729-0.726,1.643-1.924,2.631-3.223 c3.846-5.054,8.601-11.301,15.314-8.193c0.142,0.065,0.276,0.141,0.402,0.226l22.373,12.852c0.08,0.046,0.157,0.095,0.23,0.147 c2.966,2.036,4.177,5.172,4.19,8.683c0.014,3.621-1.329,7.674-3.274,11.101c-2.565,4.517-6.387,7.502-10.761,9.525 c-4.17,1.928-8.798,2.954-13.267,3.608c-6.989,1.025-13.578,0.374-20.288-1.692c-6.55-2.017-13.176-5.385-20.4-9.86l-0.526-0.326 c-3.326-2.06-6.906-4.276-10.389-6.904C31.108,93.296,18.007,79.283,9.512,63.904C2.361,50.958-1.552,36.995,0.581,23.681 C1.75,16.375,4.901,9.743,10.333,5.35c4.762-3.853,11.188-5.94,19.448-5.203c0.973,0.084,1.793,0.639,2.255,1.419l0.006-0.003 l14.324,24.27c2.11,2.718,2.344,5.415,1.203,8.096c-0.943,2.218-2.892,4.251-5.476,6.168c-0.786,0.65-1.708,1.325-2.659,2.021 C36.236,44.459,32.578,47.136,33.822,50.291L33.822,50.291z M44.67,75.422C38.066,68.44,33.035,60.88,28.695,53.065 c-0.076-0.123-0.144-0.253-0.202-0.39c-3.174-7.459,2.52-11.625,7.493-15.262c0.845-0.618,1.663-1.217,2.401-1.829l0.002,0.003 c0.043-0.036,0.088-0.071,0.135-0.105c1.843-1.354,3.171-2.647,3.678-3.837c0.289-0.679,0.182-1.426-0.466-2.265 c-0.111-0.129-0.213-0.271-0.303-0.423L27.795,5.852c-5.869-0.241-10.419,1.321-13.784,4.044 c-4.239,3.429-6.723,8.759-7.674,14.699c-1.905,11.894,1.716,24.594,8.292,36.5c8.078,14.623,20.575,27.977,32.864,37.25 c3.379,2.55,6.776,4.653,9.932,6.607l0.526,0.326c6.818,4.223,13.017,7.386,19.052,9.244c5.876,1.809,11.634,2.38,17.729,1.486 c4.009-0.587,8.113-1.485,11.668-3.129c3.351-1.55,6.248-3.785,8.134-7.104c1.496-2.637,2.53-5.653,2.521-8.222 c-0.006-1.63-0.472-3.029-1.605-3.844L93.2,80.93c-2.461-1.081-5.629,3.081-8.193,6.45c-1.104,1.452-2.125,2.792-3.156,3.817 c-1.477,1.466-3.118,2.723-4.962,3.411c-2.136,0.799-4.395,0.834-6.755-0.37l0.002-0.004C59.522,88.849,51.323,82.457,44.67,75.422 L44.67,75.422z"/>
    </g>
  </svg>
);

// Helper function for Google-style star rating
function generateStarRating(rating: number, reviewCount: number) {
  const filledStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);
  return (
    <span className="flex items-center gap-1 text-yellow-500 font-semibold text-base">
      <span className="text-gray-900 font-bold mr-1">{rating?.toFixed(1)}</span>
      {Array.from({ length: filledStars }).map((_, i) => <span key={i}>★</span>)}
      {halfStar && <span>☆</span>}
      {Array.from({ length: emptyStars }).map((_, i) => <span key={i + 10}>☆</span>)}
      <span className="text-gray-600 font-normal ml-2">({reviewCount} reviews)</span>
    </span>
  );
}

const LoungePage: React.FC<LoungePageProps> = ({ lounge, onBack, searchedCard }) => {
  // --- CUSTOM CAROUSEL LOGIC ---
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [validImages, setValidImages] = useState<string[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;
    // Check which images actually exist
    const checkImages = async () => {
      const checks = await Promise.all(
        (lounge.allImages || []).map(
          src =>
            new Promise<string | null>(resolve => {
              const img = new window.Image();
              img.src = src;
              img.onload = () => resolve(src);
              img.onerror = () => resolve(null);
            })
        )
      );
      const filtered = checks.filter(Boolean) as string[];
      if (isMounted) {
        setValidImages(filtered.length > 0 ? filtered : ['/lovable-uploads/e54585c7-7f5f-4ac5-9085-1e462e89b9e2.png']);
      }
    };
    checkImages();
    return () => {
      isMounted = false;
    };
  }, [lounge.allImages]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (validImages.length <= 1) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          prevImage();
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextImage();
          break;
        case 'Home':
          e.preventDefault();
          goToImage(0);
          break;
        case 'End':
          e.preventDefault();
          goToImage(validImages.length - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [validImages.length, isTransitioning]);

  // Touch/swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const nextImage = () => {
    if (isTransitioning || validImages.length <= 1) return;
    setIsTransitioning(true);
    setCurrentImageIndex((prev) => (prev + 1) % validImages.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const prevImage = () => {
    if (isTransitioning || validImages.length <= 1) return;
    setIsTransitioning(true);
    setCurrentImageIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToImage = (index: number) => {
    if (isTransitioning || index === currentImageIndex) return;
    setIsTransitioning(true);
    setCurrentImageIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const getAmenityIcon = (amenity: string) => {
    const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
      'Free WiFi': Wifi,
      'Food & Beverages': Utensils,
      'Comfortable Seating': Users,
      'Shower Facilities': Bath,
      'Kids Play Area': Baby,
      'Business Center': Coffee,
      'Parking': Car,
    };
    
    const IconComponent = iconMap[amenity] || Coffee;
    return <IconComponent className="w-5 h-5" />;
  };

  // Helper function to get a fallback image
  const getFallbackImage = () => {
    return '/lovable-uploads/e54585c7-7f5f-4ac5-9085-1e462e89b9e2.png';
  };

  // Get search params from location (for smarter logic)
  let cardsToShow = lounge.eligibleCards;
  if (searchedCard && lounge.eligibleCards.some(card => card.toLowerCase() === searchedCard.toLowerCase())) {
    cardsToShow = [lounge.eligibleCards.find(card => card.toLowerCase() === searchedCard.toLowerCase())];
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mr-4 p-2 hover:bg-white/50 rounded-full transition-all duration-300 ease-out hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">{lounge.name}</h1>
            <div className="flex items-center text-gray-600 mt-2">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{lounge.terminal} • {lounge.airport} • {lounge.city}, {lounge.state}</span>
            </div>
          </div>
        </div>

        {/* --- CUSTOM CAROUSEL --- */}
        <div 
          className="relative h-64 md:h-96 bg-gradient-to-br from-blue-100 to-amber-100 rounded-xl overflow-hidden mb-8 shadow-lg group"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Image */}
          <div className="relative w-full h-full">
            <img
              src={validImages[currentImageIndex]}
              alt={`${lounge.name} - Image ${currentImageIndex + 1}`}
              className={`w-full h-full object-cover transition-all duration-300 ease-out ${
                isTransitioning ? 'scale-105 opacity-80' : 'scale-100 opacity-100'
              }`}
              onError={e => {
                (e.target as HTMLImageElement).src = '/lovable-uploads/e54585c7-7f5f-4ac5-9085-1e462e89b9e2.png';
              }}
            />
            
            {/* Image Counter */}
            {validImages.length > 1 && (
              <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                {currentImageIndex + 1} / {validImages.length}
              </div>
            )}
          </div>

          {/* Navigation Arrows */}
          {validImages.length > 1 && (
            <>
              <Button
                onClick={prevImage}
                disabled={isTransitioning}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg backdrop-blur-sm transition-all duration-300 ease-out opacity-0 group-hover:opacity-100 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                size="sm"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              <Button
                onClick={nextImage}
                disabled={isTransitioning}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg backdrop-blur-sm transition-all duration-300 ease-out opacity-0 group-hover:opacity-100 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                size="sm"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </>
          )}

          {/* Dot Indicators */}
          {validImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {validImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  disabled={isTransitioning}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ease-out ${
                    index === currentImageIndex
                      ? 'bg-white scale-125 shadow-lg'
                      : 'bg-white/50 hover:bg-white/80 hover:scale-110'
                  } disabled:cursor-not-allowed`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Google-style rating display */}
          {lounge.google_rating && lounge.google_reviews && (
            <div className="absolute top-4 right-4 bg-white/90 rounded-lg px-4 py-2 shadow text-gray-900 flex items-center backdrop-blur-sm">
              {generateStarRating(lounge.google_rating, lounge.google_reviews)}
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Info */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  Hours & Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Opening Hours</h4>
                  <p className="text-gray-600">{lounge.hours}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Location</h4>
                  <p className="text-gray-600">{lounge.location}</p>
                  <p className="text-sm text-blue-600 mt-1 cursor-pointer hover:underline">
                    How to find this lounge inside the terminal →
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Coffee className="w-5 h-5 mr-2 text-blue-600" />
                  Amenities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {lounge.amenities.map((amenity: string) => (
                    <div key={amenity} className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-blue-600 mr-3">
                        {getAmenityIcon(amenity)}
                      </div>
                      <span className="text-sm font-medium text-gray-800">{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Guest Policy */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-600" />
                  Guest Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Guest Access</h4>
                  <p className="text-gray-600">{lounge.guestPolicy}</p>
                </div>
                {lounge.paidAccess && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Paid Access</h4>
                      <p className="text-gray-600">{lounge.paidAccess}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Contact Details */}
            {(lounge.google_address || lounge.contactNo || lounge.email || lounge.map_link_new) && (
              <Card className="shadow-md border-0 bg-[#f9f9f9] rounded-xl p-6">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <ContactSvg className="w-5 h-5" />
                    <span>Contact Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5 pt-0">
                  {lounge.google_address && (
                    <div className="flex items-center gap-2 text-gray-800 text-base">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <span>{lounge.google_address}</span>
                    </div>
                  )}
                  {lounge.contactNo && (
                    <div className="flex items-center gap-2 text-gray-800 text-base">
                      <PhoneSvg className="w-5 h-5" />
                      <a href={`tel:${lounge.contactNo.replace(/\s+/g, '')}`} className="hover:underline focus:underline transition-colors">
                        {lounge.contactNo.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3')}
                      </a>
                    </div>
                  )}
                  {lounge.email && (
                    <div className="flex items-center gap-2 text-gray-800 text-base">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12l-4-4-4 4m8 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0V6a2 2 0 00-2-2H6a2 2 0 00-2 2v6" /></svg>
                      <a href={`mailto:${lounge.email}`} className="hover:underline focus:underline transition-colors">{lounge.email}</a>
                    </div>
                  )}
                  {lounge.map_link_new && (
                    <Button
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-200"
                      onClick={() => window.open(lounge.map_link_new, '_blank')}
                    >
                      <MapPin className="w-5 h-5 mr-1" />
                      Get Directions
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Access Cards */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Access with these cards
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {cardsToShow.map((card: string, index: number) => {
                  const maxLen = 22;
                  const isTruncated = card.length > maxLen;
                  const displayName = isTruncated ? card.slice(0, maxLen) + '…' : card;
                  return (
                    <div key={`${card}-${index}`} className="flex items-center justify-between gap-2 bg-white/10 rounded-lg p-3 mb-2">
                      <span
                        className="font-semibold text-blue-50 text-left whitespace-pre-line max-w-[120px] truncate cursor-pointer"
                        title={isTruncated ? card : undefined}
                      >
                        {displayName}
                      </span>
                      <Button
                        className="apply-now-btn bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full px-6 py-2 shadow-md transition-all duration-200 text-base"
                        style={{ minWidth: 120 }}
                        onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(card + ' credit card apply online')}`, '_blank')}
                      >
                        Apply Now
                      </Button>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoungePage;
