// @ts-check

import terser from '@rollup/plugin-terser';
import typescript2 from 'rollup-plugin-typescript2';
import packageJSON from './package.json' assert { type: 'json' };

const today = Date().split(' ').splice(1, 3).join(' ');

/**
 * Comment with library information to be appended in the generated bundles.
 */
const banner = `/*!
 * v${packageJSON.version}
 * ${packageJSON.name} (${today})
 * 
 * Github (SDK): https://github.com/LucJosin/satori-og/
 * TypeDoc: https://lucjosin.github.io/satori-og/
 * 
 * (c) ${packageJSON.author.name} (@${packageJSON.author.username}) - ${packageJSON.author.url}
 * Released under the ${packageJSON.license} License.
 */
`;

/**
 * Creates an output options object for Rollup.js.
 * @param {import('rollup').OutputOptions} options
 * @returns {import('rollup').OutputOptions}
 */
function createOutputOptions(options) {
  return {
    banner,
    name: 'SatoriOg',
    exports: 'named',
    sourcemap: true,
    ...options,
  };
}

/**
 * @type {import('rollup').RollupOptions}
 */
const options = {
  input: './src/index.ts',
  external: ['satori', '@resvg/resvg-js', 'node:fs', 'node:fs/promises'],
  output: [
    createOutputOptions({
      file: './dist/index.min.js',
      format: 'commonjs',
      plugins: [terser()],
    }),
    createOutputOptions({
      file: './dist/index.min.cjs',
      format: 'commonjs',
      plugins: [terser()],
    }),
    createOutputOptions({
      file: './dist/index.min.mjs',
      format: 'esm',
      plugins: [terser()],
    }),
    createOutputOptions({
      file: './dist/index.esm.min.js',
      format: 'esm',
      plugins: [terser()],
    }),
    createOutputOptions({
      file: './dist/index.umd.min.js',
      format: 'umd',
      plugins: [terser()],
      globals: {
        'satori': 'Satori',
        '@resvg/resvg-js': 'resvgJs',
        'node:fs': 'node_fs',
        'node:fs/promises': 'promises',
      },
    }),
  ],
  plugins: [
    typescript2({
      clean: true,
      useTsconfigDeclarationDir: true,
      tsconfig: './tsconfig.bundle.json',
    }),
  ],
};

export default options;
