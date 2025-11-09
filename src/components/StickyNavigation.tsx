import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import clubLogo from "@/assets/club-b2b-logo.png";

const StickyNavigation = () => {
  const { t } = useTranslation('common');
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const handleNavClick = (item: any) => {
    if (item.action) {
      item.action();
    } else {
      scrollToSection(item.id);
    }
  };

  const navItems = [
    { id: 'hero', label: t('nav.home'), action: () => scrollToSection('hero') },
    { id: 'inventory', label: t('nav.vehicles'), action: () => window.location.href = '/cars-collection' },
    { id: 'import-export', label: 'Import/Export', action: () => window.location.href = '/import-export' },
    { id: 'leads', label: 'Lead Management', action: () => window.location.href = '/leads' },
    { id: 'shipping', label: 'Shipping', action: () => window.location.href = '/shipping-process' },
    { id: 'services', label: t('nav.services'), action: () => scrollToSection('services') },
    { id: 'about', label: t('nav.about'), action: () => scrollToSection('about') },
    { id: 'contact', label: t('nav.contact'), action: () => scrollToSection('contact') }
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center space-x-3 cursor-pointer group">
            <img 
              src={clubLogo} 
              alt="Club B2B Performance" 
              className="w-10 h-10 object-contain transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            />
            <div className="text-white font-light tracking-wider">CLUB B2B</div>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className="text-gray-300 hover:text-white transition-colors font-light tracking-wide"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-800">
            <div className="flex flex-col space-y-3 pt-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className="text-gray-300 hover:text-white transition-colors font-light tracking-wide text-left"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </div>
  );
};

export default StickyNavigation;
