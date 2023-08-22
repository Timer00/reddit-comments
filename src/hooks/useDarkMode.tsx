import { useEffect, useState } from 'react';

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false);

  const flip = ()=>{
    setIsDark(!isDark);
  }

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark])

  useEffect(() => {
    const matcher = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (event: MediaQueryListEvent) => {
      setIsDark(event.matches);
    };

    setIsDark(matcher.matches);
    matcher.addEventListener('change', handleChange);

    // Cleanup after component unmount
    return () => {
      matcher.removeEventListener('change', handleChange);
    };

  }, []);

  return [isDark, flip] as const;
};

export default useDarkMode;
