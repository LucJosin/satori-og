import type { SatoriFontOptions } from './types';
import { existsSync, mkdirSync } from 'node:fs';
import { writeFile, readFile } from 'node:fs/promises';

export async function validateFonts(
  fonts: SatoriFontOptions[],
): Promise<SatoriFontOptions[]> {
  const validatedFonts: SatoriFontOptions[] = [];
  if (!existsSync('.fonts/')) {
    mkdirSync('.fonts/');
  }

  for (const font of fonts) {
    if (!font.name) {
      throw new Error('Font name is required');
    }

    // Check if font file exists, if so, add to validatedFonts
    const fontFile =
      `${font.name}-${font.style}-${font.weight}.ttf`.toLocaleLowerCase();
    if (existsSync(`.fonts/${fontFile}`)) {
      const fontData = await readFile(`.fonts/${fontFile}`);
      font.data = fontData.buffer;
      validatedFonts.push(font);
      continue;
    }

    if (font.url) {
      if (!font.url.startsWith('http')) {
        throw new Error('Invalid font URL');
      }

      const fontRes = await fetch(font.url);
      if (!fontRes.ok) {
        throw new Error(`Failed to fetch font: ${fontRes.statusText}`);
      }

      font.data = await fontRes.arrayBuffer();

      try {
        await writeFile(`.fonts/${fontFile}`, Buffer.from(font.data));
      } catch (error) {
        throw new Error(`Failed to write font: ${error}`);
      }

      validatedFonts.push(font);
      continue;
    }

    throw new Error('Font not found and no URL provided');
  }

  if (validatedFonts.length !== fonts.length) {
    throw new Error('Failed to validate all fonts');
  }

  return validatedFonts;
}
