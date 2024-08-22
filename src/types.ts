import type { ReactNode } from 'react';

export type RenderFunction = (opts: Record<string, string>) => ReactNode;

export interface SatoriOgInstance {
  /**
   * Generate an image given a render name and options
   * @param render - Render function name
   * @param opts - Render function options
   * @param name - Image name without extenstion (optional)
   * @returns Image path
   */
  generateImage: (
    render: string,
    opts: Record<string, string>,
    name?: string,
  ) => Promise<string>;
}

export interface SatoriOgOptions {
  /**
   * Output directory
   */
  dist: string;
  /**
   * Render functions
   */
  renders: Record<string, RenderFunction>;
  /**
   * Satori options
   */
  satori: SatoriOptions;
  /**
   * Define if images from dist should be overwritten
   */
  overwriteImages?: boolean;
  /**
   * Define if image paths should be cached
   */
  cacheImagePath?: boolean;
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
