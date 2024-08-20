# satori-og

The satori-og is a utility library to generate open-graph images using Satori.

- [TypeDoc](https://lucjosin.github.io/satori-og/)

## Topics

- [Installation](#installation)
  - [Npm](#npm)
  - [Yarn](#yarn)
  - [Cdn](#cdn)
- [Usage](#usage)
  - [Init](#init-client)
  - [Error handling](#error-handling)
    - [Then/Catch](#thencatch)
    - [Try/Catch](#trycatch)

## Installation

### Npm

```
npm install @lucjosin/satori-og
```

### Yarn

```
yarn add @lucjosin/satori-og
```

### Cdn

```html
<script src="https://cdn.jsdelivr.net/npm/@lucjosin/satori-og/dist/index.umd.min.js"></script>
```

## Usage

- [See examples](./examples/)

### Init client

```js
import { createSatoriOg } from '<path>';
const client = createSatoriOg({ ...options });
console.log('SatoriOG: ', client);
```

### Error handling

#### Then/Catch

```js
const result = await generateImage(
  'default', // render name, defined in options
  option, // render params/options
  'default-render', // output file name (without extension)
)
  .then((data) => data)
  .catch((err) => console.error(err));

if (result) {
  console.log(
    `Image (${option.render}) generated at '${result.path}' with size ${result.width}x${result.height}`,
  );
}
```

#### Try/Catch

```js
try {
  const { path, height, width } = await generateImage(
    'default', // render name, defined in options
    render.options, // render params/options
    'default-render', // output file name (without extension)
  );

  console.log(
    `Image (${option.render}) generated at '${path}' with size ${width}x${height}`,
  );
} catch (err) {
  console.error(err);
}
```

## Repository template

This repository uses [typescript-library-boilerplate](https://github.com/VitorLuizC/typescript-library-boilerplate) as template.
