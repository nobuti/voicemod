# Voicemod code challenge

## Demo and source code

[TBD]

## Requirements and restrictions

- Turn into live the provided design using the JSON data
- Result should be responsive in different devices
- It must be functional: favorites management, searching, sorting and ramdom selection must work properly

## Environment

For this code challenge, for convenience, I'm using [Create React App](https://github.com/facebook/create-react-app) to set up the environment. 

I'm using [eslint](https://eslint.org/) to check syntax, find problems, and enforce code style. Linting could help you to find errors while writing and to follow some style guides. In this case, CRA follows under the hood the [standard](https://github.com/standard/standard) style guide with some opinated options. To ease the code formatting, I'm using [prettier](https://prettier.io/). It integrates with the most popular code editors, including VS Code, and Vim, my two editor choices.

On top of that, I'm using [yarn](https://yarnpkg.com/) for dependency management.

## Install

To install all dependencies, in the project directory, you should run:

```
yarn
```

If you prefer npm:

```
npm install
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn build`

Builds the app for production to the `build` folder.

## JS conventions

CRA ships the whole environment providing some conventions from the beginning, so I chose to stick with them for convenience. As I mentioned above, ESlint and prettier are an important part of these convention rules, see the `.eslintrc` file to dig deeper.

### Architecture
The entry point is the `src/index.js` file, that renders the whole application to the DOM. It includes the service worker initialization as well, an important part in case we were developing a PWA.

The core of the application lives in the `src/App.js`, here from where we used the rest of the UI components.

From here, `components` folder includes all the code related to components. Every component is namespaced in its own folder. For instance, you can find a `select` folder inside `components` that includes:

- an `index.js` for the root component
- different js files for any child component
- a `__tests__` folder with tests and snapshots files

The `assets` folder includes any graphical resources, like images, icons, whatever, used in the UI, mostly for styling purposes.

## CSS conventions

### Architecture

I use SASS for styling. All files are located in the `src/styles` folder. The entrypoint is the `index.scss` file, that it uses as a kind of manifest importing the rest of the files. `base` folder contains all the styles needed to start working confidently, from reset styles, SASS mixins or global variables. `components` folder includes... Components! Components can be anything, as long as they:

- do one thing and one thing only.
- are re-usable and re-used across the project.
- are independent.

For instance, a search form should be treated as a component. It should be reusable, at different positions, on different pages, in various situations. It should not depend on its position in the DOM (footer, sidebar, main content...).

### Naming

I tend to follow the BEM convention with some opinated without the fuzzle of underscores. Camelcase and hyphens FTW. Basically, the main architecture division is between components and utilities. Not always have been applied to this project though.

### Utilities

Utilities can be applied directly to any element within a component. Utilities usually encapsulate low-level layout and formatting behavior.

Syntax: `u-<utilityName>`

```html
<div class="u-clear">
  <a class="u-floatLeft" href="{{url}}">
    <img class="u-block" src="{{src}}" alt="">
  </a>
  <p class="u-textUnderline">
    …
  </p>
</div>
```

### Components

The CSS responsible for component-specific styling.

Syntax: `[<namespace>-]<ComponentName>[-descendentName][--modifierName]`

This has several benefits when reading and writing HTML and CSS:

- Similar to Block, Element and Modifier, but taking a Component as a first-class citizen.
- It keeps the specificity of selectors low.
- It helps to decouple presentation semantics from document semantics.

```
.MyComponent { /* … */ }
```

A modifier is a class that changes a certain configuration of the component. Modifier names must be written in camel case and be separated from the component name by two hyphens. The class should be included in the HTML _in
addition_ to the base component class.

```css
/* Core button */
.Button { /* … */ }
/* Default button style */
.Button--default { /* … */ }
```

A component descendent is a class that is attached to a descendent node of a component. It's responsible for applying presentation directly to the descendent on behalf of a particular component. Descendent names must be written in camel case.

```css
/* Component */
.Tweet { /* … */ }
/* Descendants */
.Tweet-header { /* … */ }
.Tweet-avatar { /* … */ }
.Tweet-content { /* … */ }
```

I use `is-stateName` to reflect changes to a component's state. The rule here is to not style these classes directly; they should always be used as an adjoining class. This allows that the same state names can be used in multiple contexts, but every component must define its own styles for the state.

```css
.Tweet { /* … */ }
.Tweet.is-expanded { /* … */ }
```

### Component Variables

Custom properties are global. Components should not expose the internal structure. Variables used in components should have a flat structure after their namespace.

Syntax: `--ComponentName[-descendant|--modifier][-onState]-(cssProperty|variableName)`

```css
:root {
  --ComponentName-backgroundColor
  --ComponentName-descendant-backgroundColor
  --ComponentName--modifier-backgroundColor
  --ComponentName-onHover-backgroundColor
  --ComponentName-descendant-onHover-backgroundColor
}
```

### Theme Variables

Non-component variables must be written in camel case

```css
:root {
  --fontSize: 16px;
  --fontFamily: sans-serif;
  --lineHeight: 1.4;

  --spaceSmall: 10px;
  --spaceMedium: 15px;
  --spaceLarge: 20px;
}
```

Btw, [CSS custom properties are awesome](https://nobuti.com/thoughts/reusable-components-or-how-css-custom-props-are-awesome/) ;)

## Design

The design provided relies on a licensed font face I think. Using Google Fonts is an alternative solution that is free and works across all browsers, so I use a similar web font, [Roboto Condensed](https://fonts.google.com/specimen/Roboto+Condensed), for this purpose. From a responsive point of view, I chose to follow a mobile-first strategy. There is no information about browser support, so to narrow the scope of the test challenge I will focus on provide support on major versions released in the last year. This means the application can work on legacy browser with some limitations but it's not fully optimized. 

## Improvements

- Accesibility: [TBD]
- Legacy browser support

## Performance

[TBD]

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update the tests as appropriate.