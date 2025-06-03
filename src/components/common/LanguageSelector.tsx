
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LanguageSelectorProps {
  variant?: 'dropdown' | 'buttons';
  size?: 'sm' | 'md' | 'lg';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  variant = 'dropdown',
  size = 'md'
}) => {
  const { language, setLanguage, t } = useLanguage();

  if (variant === 'buttons') {
    return (
      <div className="flex items-center gap-2">
        <Globe className="h-4 w-4 text-gray-600" />
        <div className="flex gap-1">
          <Button
            variant={language === 'en' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setLanguage('en')}
            className="text-xs px-2 py-1"
          >
            EN
          </Button>
          <Button
            variant={language === 'hi' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setLanguage('hi')}
            className="text-xs px-2 py-1"
          >
            हिं
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-gray-600" />
      <Select value={language} onValueChange={(value: 'en' | 'hi') => setLanguage(value)}>
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">{t('common.english')}</SelectItem>
          <SelectItem value="hi">{t('common.hindi')}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
