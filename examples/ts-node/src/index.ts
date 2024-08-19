import { createSatoriOg } from '@lucjosin/satori-og';
import { SatoriOptions } from '@lucjosin/satori-og/dist/types/types';
import ogImage from './og-image';

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
        lang: '',
      },
      {
        name: 'Roboto',
        url: 'https://www.1001fonts.com/download/font/roboto.bold.ttf',
        weight: 500,
        style: 'normal',
        lang: '',
      },
    ],
  };

  const options = {
    title: 'Satori OG',
    category: 'Open Graph',
    color: '#406924',
    language: 'en',
  };

  const { generateImage } = createSatoriOg({
    satori: satoriOptions,
    dist: './images/',
    renders: { default: ogImage(options) },
  });

  const imagePath = await generateImage('default');
  console.log(`Image generated at: ${imagePath}`);
})();
