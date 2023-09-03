import { useEffect, useState } from 'react';

export function useScreenDimensions() {
  const [dimensions, setDimensions] = useState({width: 0, height: 0});

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({height: window.innerHeight, width: window.innerWidth});
    };
    window.addEventListener('resize', updateDimensions);
    updateDimensions(); // Calculate first dimensions
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);  // Run once to calculate initial dimensions

  return [dimensions.width, dimensions.height] as [number, number];
}

export default useScreenDimensions;
