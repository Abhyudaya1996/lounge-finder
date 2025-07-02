import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

const LOCAL_ASSET_PATH = '/assets/globe-plane.json';

const GlobeAnimation = () => {
  const [animationData, setAnimationData] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    const fetchAnimation = async () => {
      try {
        const res = await fetch(LOCAL_ASSET_PATH);
        const json = await res.json();
        setAnimationData(json);
      } catch {
        setAnimationData(null);
      }
    };
    fetchAnimation();
  }, []);

  // Respect users who prefer reduced motion
  const prefersReducedMotion = globalThis.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

  if (prefersReducedMotion || !animationData) {
    return null;
  }

  return <Lottie animationData={animationData} loop style={{ width: '100%', height: '100%' }} />;
};

export default GlobeAnimation; 