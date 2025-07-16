import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Palette, Sparkles, Smartphone, Tablet, Monitor } from 'lucide-react';

interface TabOptionsProps {
  activeTab: string;
  selectedBackground: string;
  onBackgroundChange: (value: string) => void;
}

const backgroundOptions = [
  { value: 'transparent', label: 'Transparent' },
  { value: 'white', label: 'Pure White' },
  { value: 'gradient-luxury', label: 'Luxury Gradient' },
  { value: 'showroom', label: 'Showroom Floor' },
  { value: 'studio', label: 'Photo Studio' },
  { value: 'sunset', label: 'Golden Hour' }
];

const TabOptions: React.FC<TabOptionsProps> = ({
  activeTab,
  selectedBackground,
  onBackgroundChange
}) => {
  return (
    <>
      <TabsContent value="remove-bg" className="space-y-4">
        <div>
          <Label htmlFor="background">Background Style</Label>
          <Select value={selectedBackground} onValueChange={onBackgroundChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {backgroundOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </TabsContent>

      <TabsContent value="enhance" className="space-y-4">
        <div>
          <Label>Enhancement Options</Label>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="flex items-center space-x-2">
              <Palette className="w-4 h-4" />
              <span className="text-sm">Auto Color Enhancement</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">Smart Brightness</span>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="optimize" className="space-y-4">
        <div>
          <Label>Optimize for Device</Label>
          <div className="grid grid-cols-3 gap-4 mt-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              Mobile
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Tablet className="w-4 h-4" />
              Tablet
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              Desktop
            </Button>
          </div>
        </div>
      </TabsContent>
    </>
  );
};

export default TabOptions;