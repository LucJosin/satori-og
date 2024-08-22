import type { SatoriOptions } from 'satori-og';
import { createSatoriOgInstance } from 'satori-og';
import blogRender from './renders/blog';
import defaultRender from './renders/default';

const satoriOptions: SatoriOptions = {
  width: 1200,
  height: 630,
  fonts: [
    {
      name: 'Roboto',
      url: 'https://www.1001fonts.com/download/font/roboto.regular.ttf',
      weight: 300,
      style: 'normal',
    },
    {
      name: 'Roboto',
      url: 'https://www.1001fonts.com/download/font/roboto.bold.ttf',
      weight: 500,
      style: 'normal',
    },
  ],
};

/**
 * Generate an image using the satori-og library
 *
 * If the image already exists, it will return the path to the image
 */
export async function getOpenGraphPath(
  render: string,
  data: Record<string, string>,
  name: string
) {
  // Create satori instance will create for the first call and
  // save the instance for the next calls.
  // This is useful when you want to generate multiple images
  //
  // If you want to generate a single image, you can create the instance using
  // const satoriOg =  createSatoriOg({...})
  const instance = createSatoriOgInstance({
    satori: satoriOptions,
    dist: './dist/public',
    overwriteImages: false,
    cacheImagePath: true,
    renders: {
      default: defaultRender,
      blog: blogRender,
    },
  });

  return await instance.generateImage(render, data, name);
}

export function getFixedImagePath(path: string) {
  return path.replace('./dist', '');
}
