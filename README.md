# rct-day-picker-range-component [![npm version](//badge.fury.io/js/rct-day-picker-range-component.svg)](//badge.fury.io/js/rct-day-picker-range-component)

---

Component for the day picker range controller

## Demo

A live storybook is available to see how the component looks like @ http://react-packages.ws3.adventurebucketlist.com

## Installation

1. A recommended way to install ***rct-day-picker-range-component*** is through [npm](//www.npmjs.com/search?q=rct-day-picker-range-component) package manager using the following command:

```bash
npm i rct-day-picker-range-component --save
```

Or use `yarn` using the following command:

```bash
yarn add rct-day-picker-range-component
```

2. Depending on where you want to use the component you will need to import the class `RctDayPickerRangeComponent` to your project JS file as follows:

```js
import RctDayPickerRangeComponent from 'rct-day-picker-range-component'
```

For instance if you want to use this component in your `App.js` component, you can use the RctDayPickerRangeComponent component in the JSX code as follows:

```js
import React from 'react'
// ...
import RctDayPickerRangeComponent from 'rct-day-picker-range-component'
// ...
const App = () => (
  <div className="App">
    <RctDayPickerRangeComponent />
  </div>
)
```

## AngularJS

`rct-day-picker-range-component` also supports integration in an AngularJS app, therefore you can call the AngularJS component directive into your AngularJS app and it will appears properly, you can have more details about its AngularJS integration [here](./src/index.ng.js).

Here are the steps you need to follow to get the component working on your AngularJS app:

* install the component thanks to npm as shown above
* add the following tag to the main `index.html` file of your app:

```html
<script src="node_modules/rct-ng-vendor/dist/index.ng.js"></script>
<script src="node_modules/rct-day-picker-range-component/dist/index.ng.js"></script>
```

* inject the component AngularJS module to your app module as below:

```js
angular
  .module('app', ['rct-day-picker-range-component'])
  // ...
```

* use the component directive where ever you want to add the component in your app as follow:

```html
<rct-day-picker-range-component></rct-day-picker-range-component>
```
