<div align="center">

![banner](/examples/ts-node/images/banner.png)

[![npmjs](https://shields.io/badge/NPMJS-%232d3d85?style=for-the-badge&labelColor=%232d3d85)](https://npmjs.com/package/satori-og)
[![TypeDoc](https://shields.io/badge/TypeDoc-%232d3d85?style=for-the-badge&labelColor=%232d3d85)](https://lucjosin.github.io/satori-og/)

</div>

## Introduction

The **satori-og** is a utility library for generating custom **Open Graph** images using [Satori](https://github.com/vercel/satori). It’s perfect for developers wanting to enhance their websites or blogs with automated images.

With **satori-og**, you can create a "client" with default settings (e.g., dimensions, fonts, renders) and generate images easily by calling the generateImage function. The "client" requires a render parameter, allowing you to build dynamic images with **ReactNode/JSX**. You can define multiple **renders** and select the appropriate one when generating images.

Use the [Satori Playground](https://satori-playground.vercel.app/) to experiment with designs and integrate them into your project. Check out examples in [example/ts-node](./examples/ts-node/src/).

## Use case

The **satori-og** library is designed to integrate with **SSG** _(Static Site Generation)_ frameworks, with a primary focus on [astro.build](https://astro.build). It lets you **pre-define** renders for different page types (e.g., default, blog, project), offering more flexibility than standard **Open Graph** generators. You can customize images by choosing a render and passing any parameters to `generateImage`.

Simple Astro example:

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
