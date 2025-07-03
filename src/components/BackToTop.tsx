
import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-40 bg-white text-black hover:bg-gray-200 w-12 h-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      size="icon"
    >
      <ArrowUp className="w-5 h-5" />
    </Button>
  );
};

export default BackToTop;
