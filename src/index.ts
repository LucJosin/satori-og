import type {
  SatoriFontOptions,
  SatoriOgOptions,
  SatoriOptions,
} from './types';
import satori from 'satori';
import { existsSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { Resvg } from '@resvg/resvg-js';
import { validateFonts } from './font';

function createSatoriOg(options: SatoriOgOptions) {
  return {
    generateImage: async (render: string, name?: string): Promise<string> => {
      if (!existsSync(options.dist)) {
        throw new Error('Output directory does not exist');
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

      const nodeRender = options.renders[render];
      if (!nodeRender) {
        throw new Error(`Render ${render} not found`);
      }

      const svg = await satori(nodeRender, {
        ...options.satori,
        fonts: fonts,
      });

      if (!name) {
        const random = Math.random().toString(36).substring(8);
        name = `${render}-${random}`;
      }

      const imageName = `${name}.png`;
      const imagePath = options.dist + '/' + imageName;
      const pngRender = new Resvg(svg).render().asPng();

      try {
        await writeFile(imagePath, pngRender);
      } catch (error) {
        throw new Error(`Failed to write image: ${error}`);
      }

      console.info(`Image ${imageName} saved to ${options.dist}`);
      return imagePath;
    },
  };
}

export { SatoriOgOptions, SatoriFontOptions, SatoriOptions, createSatoriOg };
