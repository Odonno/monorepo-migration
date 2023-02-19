# Case study on migrating a front-end application with maximum code reuse

With the constant evolution of the JavaScript ecosystem, we see a new way to build a front-end application almost every day, whether it is a new framework or a new pattern/library. A friend of mine asked me this question one day: how do you migrate a live front-end application to take advantage of a new framework without having to rewrite the entire application?

## The starting point

Let's start with a Next.js application in a mono-repository. We want to migrate our Next.js app to Astro. So our repository will contain the following projects:

2 hosts projects:

- `nextjs` a Next.js app
- `astro` an Astro app

2 apps projects:

- `docs` a documentation web app based on Storybook
- `home` the web app code used by each host project

A list of packages underneath:

- `data` a list of types and constants that can be used throughout the repository
- `eslint-config-custom` configurations for eslint
- `functions` a list of functions that can be used throughout the repository
- `layouts` a list of the layouts used in the pages
- `next-ui-wrapper` a set of components specific to Next.js (built on top of the ui library)
- `tsconfig` the default configuration for TypeScript projects
- `ui` a list of the components used in the app

The source code is hosted on GitHub here: https://github.com/Odonno/monorepo-migration

N.B. This folder structure is for demonstration purposes only. Some parts of this architecture can be added or removed in a more concrete application.

## Stateful apps

This is a simple view of modern web applications, but even with the myriad of frontend frameworks (and now meta-frameworks), we can divide pages into 2 categories: static/stateless pages and stateful pages.

Creating and migrating stateless pages is fairly straightforward. However, with stateful pages, we need to take care of the state and make sure we are using the right abstraction instead of being too attached to a framework. Let's look at what can be considered state:

- Remote states: state from an API call, state persisted in the URL (route or query params)
- Local states: internal state of a component, in-memory global state within the application (like Redux)

If the in-memory global state makes you too attached to the framework, then the best counter would be to store that state in local storage. That way, any other framework could interpret the data in local storage and "restart" from there.

## Pages migration

To make the migration of all the pages of our app as painless as possible, we need to have as little code as possible. Hopefully with Next.js and Astro this will be quite easy.

_Reusing a React page component within a Next.js page:_

```ts
export { default } from "home/pages"; // pages/index.tsx
```

_Reusing a React page component within an Astro page:_

```astro
---
import Layout from "../layouts/Layout.astro";
import Home from "home/pages";
---

<Layout>
  <Home />
</Layout>
```

In Astro, this pattern works well for purely static components but if you have dynamic components, you will need to use [template directives](https://docs.astro.build/en/reference/directives-reference/#client-directives).

_Reusing a dynamic React page component within an Astro page:_

```astro
---
import Layout from "../layouts/Layout.astro";
import Forms from "home/pages/forms";
---

<Layout>
  <Forms client:load />
</Layout>
```

Remember, this is the easy way. Astro provides a more decoupled component structure. You could remove the `home` project that contains the React pages and use React components directly. Or even better, rewrite React components in Astro. This is perfectly fine, but then you are tied to a framework again.

## API endpoints migration

Another important feature of meta-framework is the API endpoints. It is also possible to do a soft migration of these, but with a bit more boilerplate code.

Let's start with the Next.js example:

```ts
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GridApiResponse>
) {
  switch (req.method) {
    case "GET":
      convertApiResponse(res, GameApi.get(response));
    case "POST":
      convertApiResponse(res, GameApi.post(response, req.body));
    case "DELETE":
      convertApiResponse(res, GameApi.del(response));
    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE"]).status(405);
  }
}
```

The code for each API endpoint is available in a shared package. We still need to map the return value of each API function (`get`, `post`, `del`) using a mapping function called `convertApiResponse`.

```ts
export const convertApiResponse = <T>(
  res: NextApiResponse<T>,
  apiResponse: ApiResponse
) => {
  res.status(apiResponse.status || 200).json(apiResponse.response);
};
```

This is a special mapping function and it will only work for Next.js. When we work with Astro, we will have to change it a little:

```ts
export const convertApiResponse = (apiResponse: ApiResponse) => {
  return {
    status: apiResponse.status || 200,
    body: JSON.stringify(apiResponse.response),
  };
};
```

## Going beyond

From what we have seen, migrating a large codebase has become fairly straightforward. Using a mono-repository tool like [turborepo](https://turbo.build/) for this kind of task can open up some possibilities:

- A powerful tool for building and developing complex applications
- With the right tool (e.g. feature flipping), we can test activating/deactivating a host project in real time, so that we can easily revert to the previous host modelling if required
- We can even keep the two hosts alive at the same time and choose which page should be rendered by which host, using a load balancer

However, there is still room for improvement, one thing to note is that in order to migrate a large number of pages or API endpoints, we will have to write the same code over and over again… We could imagine a small script that can automatically generate code for pages/api endpoints following the appropriate pattern.

In this article, we have only described one way to accomplish a migration from a React host to a host that supports React. First of all, this is not an article to prove that Astro is better than Next.js, or vice versa. Then we could have chosen another meta-framework that is built on or supports React, such as Remix.

Special thanks to my friend [Jean-Baptiste Vigneron](https://www.jbvigneron.fr).
