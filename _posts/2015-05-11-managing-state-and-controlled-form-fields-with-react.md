---
layout: post
title: "Managing state and controlled form fields with React"
comments: true
---

With React, you basically get two different ways to deal with forms:

* Standard input elements that can be modified by the user
* "Controlled" input elements that can only be modified programatically

The first type is pretty straightforward in React, you simply don't provide a `value` prop:

```js
React.createClass({
  render (
    <input type='text' />
  );
});
```

The value of that `<input>` element can be edited by the user in a browser, just like one would expect in a normal we app.

The other type of input—a "Controlled" input—looks almost the same, but has a `value` property:

```js
React.createClass({
  render (
    <input type='text' value="You can't change me!" />
  );
});
```

The value of this `<input>` element will stubbornly refuse to change no matter what the user does. This is generally a terrible user experience, so React will actually warn you that your input cannot be modified:

![React warning message](https://dropsinn.s3.amazonaws.com/Screen%20Shot%202015-05-11%20at%2011.12.36%20PM.png)

If you're new-ish to React you might not know why you would want to do this. The answer is _state_. React puts a big emphasis on explicitly keeping your components state in the `state` property. So in order to create a form input that responds to user input you will need to use two-way data binding. Meaning the `value` of the `<input>` element will flow from your component into the DOM, but also from the DOM into your component. In other words, they will be kept in sync.

## Manual Two-way data binding

The most common way to accomplish two-way data binding in React is to be explicit. This is by design, and it's a good practice for smaller forms. Here's how an example:

```js
React.createClass({
  getInitialState() {
    inputValue: ''
  },

  render() {
    return (
      <input
        type='text'
        value={this.state.inputValue}
        onChange={this.onChange} />
    );
  },

  onChange(e) {
    this.setState({ inputValue: e.target.value });
  }
});
```

Here we've bound our input's change event to the component's `onChange` function which will update `this.state`. Whenever `this.state` is updated the component will be re-rendered, causing the input value to reflect what the user typed.

If that's not quite clear, I highly recommend taking a look at the [Forms guide on the React website][forms].

[forms]: https://facebook.github.io/react/docs/forms.html

The code above is explicit and not overly complicated, which is great for maintainabillty. There are virtually no downsides to this approach when dealing with a small form that only contains a few inputs. Issues only begin to crop up when you have many inputs that all need to update state.

That's why we have...

## The LinkedStateMixin

React comes with a handy mixin to help you achieve two-way data-binding very quickly. Use the LinkedStateMixin to save yourself soem hassle when wiring up large forms to stay in sync with component state:

```js
// Make sure to require react with addons
var React = require('react/addons');

React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState() {
    inputValue: ''
  },

  render() {
    return (
      <input type='text' valueLink={this.linkState('inputValue')} />
    );
  }
});
```

As you can see we replaced the `value` prop with `valueLink`. If you haven't heard of `valueLink` I'll explain it in a sec.

The `LinkedStateMixin` saves us a good deal of typing, and especially when you have a large number of form fields that need to be tied to component state. The issue is that it's not very flexible. Essentially it just binds the value of an input field to `this.state`. But what if you are building a _stateless_ form component that gets all it's values from props? Or, more interestingly, what if you are using Flux and don't want to set state directly but rather call an action that updates a store?

This is what `valueLink` is great for.

## What exactly is `valueLink`?

The `valueLink` prop is a fairly under-documented feature of form inputs in React that simplifies the onChange / setState pattern described at the beginning of this post. It's a shortcut for telling an input where to get its `value` prop from and what function to call when an `onChange` event is fired. In it's most simple form the `valueLink` prop points to a plain old JS object with two distinct props:

* `value`: The value of the input at any given time
* `requestChange`: The function to call whenever `onChange` is fired on the input. `requestChange` will be called with the update value of the input, so there's no need to access the value using an event object as you might do if you were using the actual `onChange` event.

If you're familiar with React's PropTypes feature then this expression of `valueLink` as a `propType` should make it clear what you're going for:

```js
React.createClass({
  propTypes: {
    valueLink: React.PropTypes.shape({
      value: React.PropTypes.any.isRequired,
      requestChange: React.PropTypes.func.isRequired
    })
  }
});
```

## Manually linking input value to state with `valueLink`

Let's check out an example.

```js
function makeValueLink(key) {
  return {
    value: this.state[key],
    requestChange: function(newValue) {
      newState = {};
      newState[key] = newValue;
      this.setState(newState);
    }
  }
}

React.createClass({
  getInitialState() {
    inputValue: ''
  },

  render() {
    return (
      <input type='text' valueLink={makeValueLink('inputValue')} />
    );
  }
});
```

Now you will get the same two-way data binding as you did when using the `LinkedStateMixin`. What we've done here is basically created our own version of the `LinkedStateMixin` to demonstrate how `valueLink` works.

You can use `valueLink` to bind the `value` prop of any input to the state of a component. If you instead want to set state on a parent component you can pass a `valueLink` down as a prop just like you would do with an `onChange` callback.

#### Don't forget about `checkedLink`

The other important point to note is that some input types, namely `<input type='radio'>` and `<input type='checkbox'>` use the `checked` prop because they represent boolean values. They still use a `value` prop to determine what value corresponds to the `checked` prop, but it's only the `checked` prop that can be changed by the user.

React acknowledges this and provides us with the `checkedLink` prop, which works exactly like `valueLink` except it binds the `checked` prop to state instead of the `value` prop.

```js
function makeValueLink(key) {
  return {
    value: this.state[key],
    requestChange: function(newValue) {
      newState = {};
      newState[key] = newValue;
      this.setState(newState);
    }
  }
}

React.createClass({
  getInitialState() {
    booleanValue: ''
  },

  render() {
    return (
      <input type='checkbox' checkedLink={makeValueLink('booleanValue')} />
    );
  }
});
```

Note that when using `checkedLink` the shape of the object you pass in is still exactly the same, i.e. it needs a `value` prop and a `requestChange` prop. This is good because it means we can use our `makeValueLink` function to bind any type of input to state including checkboxes and radios.

## Putting it all together—Building a Flux form

The importance of `valueLink` really shines when you're using something like Flux where you don't actually want to update `this.state` directly but would like instead for data to flow through actions to stores which control the UI state. Using `valueLink` makes this is quite easy:

```js
var AppActions = require('./AppActions');

function makeValueLink(key) {
  return {
    value: this.state[key],
    requestChange: function(newValue) {
      AppActions.doSomething(key, newValue);
    }
  }
}

/**
 * This code is written much like you would if you were using the Alt Flux
 * implementation. The syntax would likely be slightly different with other
 * libraries.
 */
React.createClass({

  // Assuming our store (AppStore) has a getState method, we would get the
  // initial state like so
  getInitialState() {
    return AppStore.getState();
  },

  // Listen to our store for changes
  componentDidMount() {
    AppStore.listen(this.onChange);
  },

  // Stop listening if this component is unmounted
  componentWillUnmount() {
    AppStore.unlisten(this.onChange);
  },

  // Whenever our store emits a change event, update `this.state` to reflect
  // the state of the store.
  onChange() {
    this.setState(AppStore.getState());
  },

  render() {
    return (
      <input type='checkbox' checkedLink={makeValueLink('booleanValue')} />
    );
  }
})
```

Now whenever you check the checkbox `AppActions.doSomething` will be called with a `key` of `'booleanValue'` and a `newValue` of either `true` or `false` depending on whether or not it is checked.

Then in `AppActions` you would do whatever you want with the data and most likely dispatch it to all stores so they could update their state accordingly. `AppStore` would get the dispatch and update it's internal representation of state

Hope all this helps as you build forms with React.
