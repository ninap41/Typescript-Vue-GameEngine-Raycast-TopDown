# vue-project

This template should help get you started developing with Vue 3 in Vite on Replit!

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

Switch to the shell and run the following to install the packages manually (replit by default will do this for you every time you press the run button).

```sh
npm install
```

### Compile and Hot-Reload for Development

Pressing the run button will start your project with hot-reload for development by using the following command.

```sh
npm run dev
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

Switch to shell and run the following command to run the unit tests.

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

Switch to shell and run the following commands to run the Cypress end-to-end tests.

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

Linting will ensure your code style is consistent.
You can configure all the preferred styles in `.eslintrc.cjs`
Run the following command in the shell to lint your code.

```sh
npm run lint
```

### Prepare for production and hosting.

1. Open the `.replit` file. If you do not see this in your files list. Then in your browser's URL, after the `#` remove everything and type `.replit`, it will look something like this `https://replit.com/@username/replname#.replit`.
2. In the `.replit` file, modify the `run` configuration from `npm run dev` to `npm run build && npm run preview`.
3. After this, go to the secrets tab and add a new secret, name this new secret `NODE_ENV` and set its value to `production`.

Now, pressing the run button will generate a new production build and host the app in production mode.
Enable Always-On for an even better hosting experience.

# Typescript-Vue-GameEngine-Raycast-TopDown
