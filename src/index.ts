import type {
  RenderFunction,
  SatoriFontOptions,
  SatoriOgInstance,
  SatoriOgOptions,
  SatoriOptions,
} from './types';
import satori from 'satori';
import { existsSync, mkdirSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { Resvg } from '@resvg/resvg-js';
import { validateFonts } from './font';

// Instance is a singleton
let instance: SatoriOgInstance | null = null;

const cachedImages: Record<string, string> = {};

/**
 * Create a SatoriOg instance
 * @param options - SatoriOgOptions
 * @returns SatoriOg instance with 'generateImage' method
 */
function createSatoriOgInstance(options: SatoriOgOptions) {
  if (!instance) instance = createSatoriOg(options);
  return instance;
}

/**
 * Create a SatoriOg
 * @param options - SatoriOgOptions
 * @returns SatoriOg with 'generateImage' method
 */
function createSatoriOg(options: SatoriOgOptions): SatoriOgInstance {
  options.dist = normalizeDist(options.dist);
  return {
    generateImage: async (
      render: string,
      opts: Record<string, string>,
      name?: string,
    ): Promise<string> => {
      if (!existsSync(options.dist)) {
        mkdirSync(options.dist);
      }

      // Override width and height if provided in opts
      let width = options.satori.width;
      let height = options.satori.height;
      if ('height' in opts && 'width' in opts) {
        height = parseInt(opts['height']!);
        width = parseInt(opts['width']!);
      }

      const nodeRender = options.renders[render];
      if (!nodeRender) {
        throw new Error(`Render ${render} not found`);
      }

      let imageName = name;
      if (!imageName) {
        const random = Math.random().toString(36).substring(8);
        imageName = `${render}-${random}`;
      } else {
        const cachedPath = getImagePath(imageName);
        if (options.cacheImagePath && cachedPath) {
          return cachedPath;
        }
      }

      const imagePath = options.dist + imageName + '.png';
      if (!options.overwriteImages && existsSync(imagePath)) {
        return imagePath;
      }

      const validatedFonts = await validateFonts(options.satori.fonts);
      // Convert to FontOptions
      const fonts = validatedFonts.map((font) => {
        return {
          name: font.name,
          data: font.data!,
          weight: font.weight,
          style: font.style,
        };
      });

      const satoriOpts = { ...options.satori, height, width };
      const svg = await satori(nodeRender(opts), {
        ...satoriOpts,
        fonts: fonts,
      });

      const resvgRender = new Resvg(svg).render();
      const pngRender = resvgRender.asPng();
      try {
        await writeFile(imagePath, pngRender);
      } catch (error) {
        throw new Error(`Failed to write image: ${error}`);
      }

      if (options.cacheImagePath) {
        cachedImages[imageName] = imagePath;
      }

      return imagePath;
    },
  };
}

/**
 * Get image path from cache.
 *
 * The cache is populated when 'cacheImagePath' is set to true in SatoriOgOptions
 * @param id - Image id
 * @returns Image path
 */
export function getImagePath(id: string): string | undefined {
  return cachedImages[id];
}

function normalizeDist(dist: string): string {
  dist = dist.endsWith('/') ? dist : dist + '/';
  dist = dist.startsWith('/') ? dist.slice(1) : dist;
  return dist;
}

export {
  SatoriOgOptions,
  SatoriFontOptions,
  SatoriOptions,
  SatoriOgInstance,
  RenderFunction,
  createSatoriOg,
  createSatoriOgInstance,
};
