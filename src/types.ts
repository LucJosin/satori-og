import type { ReactNode } from 'react';

export interface SatoriOgOptions {
  dist: string;
  renders: Record<string, ReactNode>;
  satori: SatoriOptions;
}

// Types copied from Satori
export interface SatoriFontOptions {
  url?: string;
  data?: ArrayBuffer;
  name: string;
  weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  style: 'normal' | 'italic';
}

export interface SatoriOptions {
  width: number;
  height: number;
  fonts: SatoriFontOptions[];
}
