import type {
  ImageResult,
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
    ): Promise<ImageResult> => {
      if (!existsSync(options.dist)) {
        mkdirSync(options.dist);
      }

      const nodeRender = options.renders[render];
      if (!nodeRender) {
        throw new Error(`Render ${render} not found`);
      }

      let imageName = name;
      if (!imageName) {
        const random = Math.random().toString(36).substring(8);
        imageName = `${render}-${random}`;
      }

      const imagePath = options.dist + imageName + '.png';
      if (!options.overwriteImages && existsSync(imagePath)) {
        return {
          path: imagePath,
          width: options.satori.width,
          height: options.satori.height,
        };
      }

      const validatedFonts = await validateFonts(options.satori.fonts);
      // Convert to FontOptions
      const fonts = validatedFonts.map((font) => {
        return {
          name: font.name,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          data: font.data!,
          weight: font.weight,
          style: font.style,
        };
      });

      const svg = await satori(nodeRender(opts), {
        ...options.satori,
        fonts: fonts,
      });

      const resvgRender = new Resvg(svg).render();
      const pngRender = resvgRender.asPng();
      try {
        await writeFile(imagePath, pngRender);
      } catch (error) {
        throw new Error(`Failed to write image: ${error}`);
      }

      return {
        path: imagePath,
        width: resvgRender.width,
        height: resvgRender.height,
      };
    },
  };
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
  createSatoriOg,
  createSatoriOgInstance,
};
