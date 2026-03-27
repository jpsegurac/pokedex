import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'retro' | 'dark' | 'light';

const THEMES: Theme[] = ['retro', 'dark', 'light'];
const THEME_LABELS: Record<Theme, string> = {
  retro: '🎮 Retro',
  dark:  '🌙 Dark',
  light: '☀️ Light',
};

interface ThemeContextValue {
  theme: Theme;
  nextTheme: () => void;
  label: string;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'retro',
  nextTheme: () => {},
  label: '🎮 Retro',
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('pokedex-theme') as Theme) ?? 'retro';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('pokedex-theme', theme);
  }, [theme]);

  function nextTheme() {
    const idx = THEMES.indexOf(theme);
    setTheme(THEMES[(idx + 1) % THEMES.length]);
  }

  return (
    <ThemeContext.Provider value={{ theme, nextTheme, label: THEME_LABELS[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
