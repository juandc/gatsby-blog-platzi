# Crea tu propio Blog con React, Gatsby y Markdown

Gatsby es un _framework open source_ muy innovador que integra tecnologías como React y GraphQL para que nuestras aplicaciones funcionen increíblemente rápido, tanto en desarrollo como en producción.

## ¿Por qué Gatsby?

Gatsby es muy popular. Esto se debe a que muchas personas, empresas y tecnologías están migrando sus aplicaciones a Gatsby. El ejemplo que más me impresionó fue la [Documentación Oficial de React.js](https://http://reactjs.org), pero también hay muchos otros ejemplos importantes como el [Blog personal de Dan Abramov (overreacted.io)](https://overreacted.io) o la [Página web de Kent C. Dodds](https://kentcdodds.com).

Entre muchas otras cosas, Gatsby nos ayuda a integrar diferentes fuentes de información para consumirlas desde nuestra aplicación: desde un CMS como WordPress o Sanity.io, APIs, servicios o bases de datos como Firebase, entre otras.

> _Gatsby no solo es rápido, también es seguro. Esto se debe a que nos permite recolectar la información de nuestro sitio mientras desarrollamos, así no debemos hacer peticiones ni guardar tokens o llaves privadas cuando hacemos deploy a producción._
> _¡Pero de eso hablaremos en otra ocasión!_

En el [Curso de Desarrollo de Aplicaciones Web con Gatsby JS](https://platzi.com/gatsby) vamos a crear una tienda online usando todas las características de Gatsby y algunas integraciones/plugins para trabajar con imágenes, SEO y Stripe.

En este tutorial vamos a dar el primer paso de toda persona que quiere trabajar con Gatsby: vamos a construir nuestro propio blog.

## Cómo empezar tu primer proyecto con Gatsby

Hay dos formas de iniciar nuestros proyectos con Gatsby:

### Usando Starters

Esta es la forma más rápida. Solo debes buscar el [starter que más te guste](https://gatsbyjs.com/starters), instalarlo y correrlo:

```bash
# De forma global:
npm install gatsby --global
gatsby new nombre-de-tu-proyecto url-del-starter

# Usando NPX:
npx gatsby new nombre-de-tu-proyecto url-del-starter

# Ahora sí, correrlo:
cd nombre-de-tu-proyecto
npm run develop
```

> _Si no sabes cuál starter usar, Gatsby te permite usar [`gatsby-starter-default`](https://github.com/gatsbyjs/gatsby-starter-default), el starter más sencillo de todos._

Te voy a dar un pequeño spoiler: Tu blog puede estar listo en menos de 5 minutos si usas este starter:  [`gatsby-starter-blog`](https://github.com/gatsbyjs/gatsby-starter-blog).

Pero en Platzi somos la comunidad de personas más interesantes y atractivas de toda Latinoamérica, así que no solo vamos a usar un starter que tiene todo listo por nosotros, vamos a construir el blog “desde cero” (está entre comillas porque Gatsby ya hizo gran parte del trabajo por nosotros, como mínimo debemos entender muy bien cómo y por qué funciona tan bien).

### “A mano”

Comenzamos como en cualquier otro proyecto de Node. Instalamos las dependencias normales de React y Gatsby:

```bash
npm init -y
npm i react react-dom gatsby --save
```

Nuestra aplicación necesita los siguientes scripts:

- **`develop (gatsby develop)`**: correr nuestra aplicación en desarrollo.
- **`build (gatsby build)`**: compilar nuestra aplicación para producción.
- **`serve (gatsby serve)`**: emular cómo correrá la aplicación en un servidor de producción.

Vamos a crear diferentes carpetas para nuestro código y el contenido del blog:

- **`content/`**: en esta carpeta guardaremos archivos en markdown (`.md`) con el contenido y metadata de las publicaciones.
- **`src/pages`**: recuerda que Gatsby no solo sirve para construir Blogs, también nos ayuda a construir cualquier otro tipo de aplicaciones. En esta carpeta vivirán las páginas con URLs que no cambian. Por ejemplo: la página de inicio, el 404, sobre nosotros, suscríbete, portafolio, etc.
- **`src/templates/`**: así como en `src/pages`, en esta carpeta tendremos las páginas de nuestro sitio, solo que estas no tendrán una URL fija, sino mostrarán el contenido correcto de cada página dependiendo de la URL que los invoque. No te preocupes, te lo explicaré a fondo un poco más adelante.
- **`src/components/`**: ¡Adivina! Todos nuestros componentes en React.
- **`src/utils`**: código JavaScript que vamos a reutilizar en diferentes partes de nuestra aplicación.

Más adelante crearemos los archivos de estas carpetas. Ahora debemos configurar algunos archivos de Gatsby:

- **`gatsby-browser.js`**: toda la configuración de este archivo sucede en el navegador. Podemos hacer peticiones a alguna API, utilizar librerías como Google Maps o cualquier otra cosa que queremos que pase solo cuando los usuarios cargan nuestra página web en la etapa de desarrollo.
- **`gatsby-ssr.js`**: funciona igual que el anterior, solo que `gatsby-browser.js` carga en la etapa de desarrollo y `gatsby-ssr.js` en la etapa de producción.
- **`gatsby-node.js`**: configuramos todo lo que tiene que ver con la construcción de nuestro sitio web. Podemos generar páginas a partir de la información de nuestros plugins o, incluso, utilizando APIs externas a nuestra aplicación.
- **`gatsby-config.js`**: configuramos la metadata (título, descripción y autor) y los plugins de Gatsby que usaremos para construir nuestra aplicación.

## Plugins

Los plugins son código que alguien más de la comunidad escribió por nosotros para que podamos configurar nuestra aplicación. A diferencia de WordPress, donde usar más de 3 o 4 plugins afecta muchísimo la velocidad de nuestras aplicaciones, los plugins de Gatsby no afectan la carga de nuestro sitio web.

De hecho, en muchos casos pueden ayudarnos a mejorar nuestro rendimiento. Esto se debe a que no cargamos un script por cada plugin, ya que todo el código será compilado antes de ir a producción en forma de un sitio estático precompilado.

> _Lo siento mucho, WordPress. I love Gatsby. Pero mira el lado bueno, Gatsby nos permite consumir la data desde WordPress, así que no dejaremos de lado al 100%..._ :grimacing::sweat_smile::joy:

Para nuestro proyecto vamos a instalar los siguientes plugins:

```bash
npm install --save gatsby-source-filesystem gatsby-transformer-remark
```

Y los configuramos junto con nuestra metadata en el archivo `gatsby-config.js` (depende del plugin si creamos un objeto con la configuración del plugin o si es suficiente con solo el nombre):

```js
// gatsby-config.js

module.exports = {
  siteMetadata: {
    title: `Nombre del proyecto`,
    author: `Tu nombre`,
    description: `¡Una descripción chevere!`,
  },
  plugins: [
    `gatsby-transformer-remark`, // este plugin no necesita configuración
    {
      resolve: `gatsby-source-filesystem`, // este sí
      options: {
        path: `${__dirname}/content`,
        name: `content`,
      },
    },
  ],
};
```

## Páginas

Ahora vamos a escribir nuestra primer página en `src/pages/index.js`:

```js
// src/pages/index.js

import React from 'react';

export default function HomePage() {
  return (
    <h2>Hello, World!</h2>
  );
}
```

> ¡No olvides encender tu servidor con `npm run develop` (o `gatsby develop`) y entrar a localhost:8000!

Y de esta forma podremos ver el “Hello, Word” de nuestro proyecto. No olvides que puedes crear todas las que quieras en la carpeta `src/pages/`, pero para transformar nuestros archivos markdown en páginas utilizaremos otro método.

## Generando páginas a partir de Markdown

Los primero es crear nuestro primer archivo en markdown siguiendo la siguiente estructura (`content/im-a-blogpost.md`):

```md
---
title: "¿Soy del futuro?"
description: ¿Será del futuro?
date: '2039-06-24'
---
¡Correcto! Este es un artículo del futuro y lo sabes muy bien. 😉
```

Ahora vamos a usar los plugins que instalamos anteriormente para generar una página por cada archivo markdown que encontremos en la carpeta `content/`. Para esto debemos modificar un poco el archivo `gatsby-node.js`.

Primer paso: usar `onCreateNode` para conseguir la URL de cada archivo de markdown:

```js
// gatsby-node.js

const path = require("path");
const { createFilePath, createFileNode } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ 
      node, 
      getNode, 
      basePath: 'pages' 
    });

    createNodeField({
      node,
      name: 'slug',
      value: slug
    });
  }
}
```

Segundo paso: crear una página a la que pueden entrar los usuarios usando la URL que generamos en el primer paso y el template que crearemos más adelante:

```js
// gatsby-node.js

const path = require("path");
const { createFilePath, createFileNode } = require(`gatsby-source-filesystem`);

/* … */

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogpostTemplate = path.resolve(`./src/templates/blogpost.js`);
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `)
  .then(result => {
    if (result.errors) throw result.errors;

    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach((post, index) => {
      createPage({
        path: post.node.fields.slug,
        component: blogpostTemplate,
        context: {
          slug: post.node.fields.slug,
        },
      });
    });

    return null;
  });
};
```

> En estas clases del Curso de Gatsby aprenderás a profundidad cómo funcionan las consultas en Gatsby con GraphQL:
> [¿Cómo funciona GraphQL en Gatsby?](https://platzi.com/clases/1618-gatsby/20989-rol-de-graphql-en-gats-3/)
> [Queries, Edges (conexiones) y Nodos en Gatsby](https://platzi.com/clases/1618-gatsby/20991-queries-conexionesedges-y-nodos-en-gats-9/)

Tercer paso: crear un template en React para usar en páginas de los blogposts. Debemos exportar una constante `query` con la consulta de GraphQL y, como siempre, un componente de React que recibirá el contenido del blogpost como props:

```js
// src/templates/blogpost.js

import React from 'react';
import { graphql } from 'gatsby';

export const query = graphql`
query PostQuery($slug: String!) {
  markdownRemark(fields: { slug: { eq: $slug } }) {
    html
    frontmatter {
      title
      description
      date
    }
  }
}
`;

export default function BlogPost(props) {
  const post = props.data.markdownRemark;
  const { title, description, date } = post.frontmatter;
  return (
    <div>
      <h1>{title}</h1>
      <i>{description}</i> - <small>{date}</small>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  );
}
```

De esta forma podemos entrar a [localhost:8000/im-a-blogpost](localhost:8000/im-a-blogpost) y ver nuestro componente blogpost con el contenido que guardamos en markdown.

Bueno, terminamos. ¡Pero no! Solo podemos ver los blogposts si conocemos su URL, pero una página profesional debe listar los blogposts que hemos escrito y llevarnos a ellos cuando hacemos click.

## Listar las publicaciones desde la página principal

Vamos a hacer lo mismo que en el paso anterior, pero en vez de recibir una sola publicación, recibiremos y mostraremos todas:

```js
// src/pages/index.js

import React from 'react'
import { Link, graphql } from 'gatsby'

export const listQuery = graphql`
query ListQuery {
  allMarkdownRemark {
    edges {
      node {
        fields{
          slug
        }
        frontmatter {
          title
          description
          date
        }
      }
    }
  }
}
`;

export default function IndexPage(props) {
  const postList = props.data.allMarkdownRemark;

  return (
    <>
      <h1>Home!</h1>
      {postList.edges.map(({ node }, i) => (
        <Link to={node.fields.slug} className="link" >
          <div className="post-list">
            <h3>{node.frontmatter.title}</h3>
            <i>
              {node.frontmatter.description}
            </i> - <small>{node.frontmatter.date}</small>
          </div>
        </Link>
      ))}
    </>
  );
}
```

## Conclusión

Esta es solo una pequeña demostración de todas las maravillosas aplicaciones que puedes construir con Gatsby.

Te invito a tomar el [Curso de Desarrollo de Aplicaciones con Gatsby JS](https://platzi.com/gatsby) para entender a fondo cómo funciona cada parte de Gatsby construyendo una tienda en línea.

**#NuncaParesDeAprender** :nerd_face::green_heart:
