
import { useState } from 'react';
import { Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LanguageSelector = () => {
  const [currentLanguage, setCurrentLanguage] = useState('EN');

  const languages = [
    { code: 'EN', name: 'English', flag: '🇺🇸' },
    { code: 'FR', name: 'Français', flag: '🇫🇷' },
    { code: 'ES', name: 'Español', flag: '🇪🇸' }
  ];

  return (
    <div className="fixed top-4 left-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-black/80 border-gray-600 text-white hover:bg-gray-800"
          >
            <Globe className="w-4 h-4 mr-2" />
            {currentLanguage}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-black border-gray-600">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => setCurrentLanguage(lang.code)}
              className="text-white hover:bg-gray-800 cursor-pointer"
            >
              <span className="mr-2">{lang.flag}</span>
              {lang.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageSelector;
