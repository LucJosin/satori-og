import { createSatoriOg } from '@lucjosin/satori-og';
import { SatoriOptions } from '@lucjosin/satori-og/dist/types/types';
import render1 from './render1';
import render2 from './render2';

(async () => {
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

  const { generateImage } = createSatoriOg({
    satori: satoriOptions,
    dist: './images',
    overwriteImages: false,
    renders: {
      default: render1,
      render2: render2,
    },
  });

  const options = [
    {
      fileName: 'render-1',
      render: 'default',
      title: 'Satori OG',
      description:
        'A utility library to generate open-graph images using Satori',
    },
    {
      fileName: 'render-2',
      render: 'render2',
      title: 'BlueSky',
      description: 'Decentralized social network.',
    },
  ];
  for (const option of options) {
    const { path, height, width } = await generateImage(
      option.render,
      option,
      option.fileName,
    );
    console.log(
      `Image (${option.render}) generated at: ${path} with size ${width}x${height}`,
    );
  }
})();
