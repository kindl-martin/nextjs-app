'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Switch } from '@heroui/switch';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Switch
      size="sm"
      isSelected={theme === 'light'}
      onValueChange={(val) => setTheme(val ? 'light' : 'dark')}
      endContent={<MoonIcon />}
      startContent={<SunIcon />}
    />
  );
}
