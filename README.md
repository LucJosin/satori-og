<div align="center">

![banner](/examples/ts-node/images/banner.png)

[![npmjs](https://shields.io/badge/NPMJS-%232d3d85?style=for-the-badge&labelColor=%232d3d85)](https://npmjs.com/package/satori-og)
[![TypeDoc](https://shields.io/badge/TypeDoc-%232d3d85?style=for-the-badge&labelColor=%232d3d85)](https://lucjosin.github.io/satori-og/)

</div>

## Introduction

The **satori-og** is a utility library to generate **Open Graph** images using [Satori](https://github.com/vercel/satori). This tool is particularly useful for developers looking to enhance the visual of their websites or blogs by automating the creation of custom **Open Graph** images.

Using this library you will be able to create a "client" with default options (dist, height, width, fonts, renders) and once configured, generating and saving images is as simple as calling the `generateImage` function, which will store the output in a specified folder.

The "client" configuration will require the `render` param. Each render is built using **ReactNode/JSX**, giving you the ability to create dynamic and custom images. You can define multiple **renders** and choose the desired render when calling `generateImage`.

Using the [Satori Playground](https://satori-playground.vercel.app/) allows you to experiment with different designs and easily integrate them into your project. _See some simple render examples in [example/ts-node](./examples/ts-node/src/)_

## Use case

The **satori-og** library is designed to integrate with **SSG** _(Static Site Generation)_ frameworks, with a primary focus on [astro.build](https://astro.build). It allows developers to pre-define custom renders and generate distinct **Open Graph** images customized to different pages of their website (e.g: using the Props, define the render type like _default, blog, project, etc..._).

Generating image in this way, you can choose what render to use and the the options to pass any param to `generateImage`. Unlike other Open Graph generators that may limit you to basic parameters like title, description, or author, satori-og allows for a broader range of options, enabling you to tailor the images exactly to your needs.

```astro
---
const {
  render, // blog
  title,
  description,
  // ...
} = Astro.props;

const { generateImage } = createSatoriOg({
  // ...
  renders: {
    default: defaltRender,
    blog: blogRender,
    project: projectRender,
  },
});

// Only generate image when building the project
const { path } = import.meta.env.PROD
  ? await generateImage(render, {title, description})
  : 'static/default-og.png';
---

<html>
  <head>
    <!-- ... -->
    <meta
      property="twitter:image"
      itemprop="image primaryImageOfPage"
      content={Astro.site + path}
    />
    <meta
      property="og:image"
      content={Astro.site + path}
    />

    <title>{title}</title>
    <!-- ... -->
  <qhead>
</html>
```

## Getting Started

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
npm install satori-og
```

### Yarn

```
yarn add satori-og
```

### Cdn

```html
<script src="https://cdn.jsdelivr.net/npm/satori-og/dist/index.umd.min.js"></script>
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
