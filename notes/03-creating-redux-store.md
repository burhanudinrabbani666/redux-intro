# Creating a Redux Store

## Overview

The Redux store is the central hub that holds your application's state. It serves as the single source of truth for your entire application state tree.

## Basic Store Setup

To create a Redux store, you'll use the `createStore` function from Redux:

```js
import { legacy_createStore as createStore } from "redux";

const store = createStore(reducer);
```

### Important Note About Deprecation

The `createStore` function is marked as deprecated in modern Redux. However, it still works perfectly fine and is useful for learning Redux fundamentals. For production applications, the Redux team recommends using **Redux Toolkit** and its `configureStore` function instead, which provides better defaults and developer experience.

## Dispatching Actions

Once you have a store, you can dispatch actions to update the state. Actions are plain JavaScript objects that describe what happened in your application.

### Example: Banking Application Actions

Here's how you might dispatch various actions for a banking application:

```js
// Deposit money into the account
store.dispatch({ type: "account/deposit", payload: 500 });

// Withdraw money from the account
store.dispatch({ type: "account/withdraw", payload: 200 });

// Request a loan with an amount and purpose
store.dispatch({
  type: "account/requestLoan",
  payload: { amount: 100, purpose: "Buy a Car" },
});

// Pay off the loan
store.dispatch({ type: "account/payLoan" });
```

### Key Concepts

- **`store.dispatch()`**: The method used to send actions to the Redux store
- **`type`**: A string that describes the action (conventionally uses the format `domain/eventName`)
- **`payload`**: The data associated with the action (optional, can be any value)

## Accessing the State

To view the current state of your store, use the `getState()` method:

```js
console.log(store.getState());
```

This returns the entire state tree, allowing you to inspect what's currently stored in your Redux state.

## Complete Example

```js
import { legacy_createStore as createStore } from "redux";

// Create the store with a reducer
const store = createStore(reducer);

// Dispatch a series of actions
store.dispatch({ type: "account/deposit", payload: 500 });
store.dispatch({ type: "account/withdraw", payload: 200 });
store.dispatch({
  type: "account/requestLoan",
  payload: { amount: 100, purpose: "Buy a Car" },
});
store.dispatch({ type: "account/payLoan" });

// Log the final state
console.log(store.getState());
```

---

**Next:** [Working with Action Creators](./04-working-with-action-creators.md)
