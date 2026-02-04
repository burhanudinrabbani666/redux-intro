# Creating the Store with Redux Toolkit

## Overview

Redux Toolkit (RTK) is the official, recommended way to write Redux logic. It simplifies Redux development by providing powerful utilities that reduce boilerplate code and include best practices by default.

## Why Use Redux Toolkit?

Redux Toolkit offers significant advantages over traditional Redux:

- **Less Boilerplate**: Write less code to accomplish the same tasks
- **Built-in Best Practices**: Includes Redux Thunk and DevTools automatically
- **Simpler Configuration**: No need to manually set up middleware or DevTools
- **Immutable Updates**: Use "mutating" syntax that's actually safe (powered by Immer)
- **Better TypeScript Support**: Excellent type inference out of the box
- **Official Recommendation**: Maintained by the Redux team

## Installation

First, install Redux Toolkit:

```bash
npm install @reduxjs/toolkit react-redux
```

**Note**: Redux Toolkit includes Redux core, so you don't need to install `redux` separately.

## Creating the Store with configureStore

The `configureStore` function simplifies store creation and automatically includes several features:

### Traditional Redux Setup (Old Way)

```jsx
import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
```

### Redux Toolkit Setup (Modern Way)

```jsx
import { configureStore } from "@reduxjs/toolkit";

import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;
```

## What configureStore Does Automatically

When you use `configureStore`, it automatically:

1. **Combines Reducers**: No need for `combineReducers` - just pass an object
2. **Adds Redux Thunk**: Thunk middleware is included by default
3. **Enables DevTools**: Redux DevTools Extension works automatically
4. **Adds Development Checks**: Includes middleware to catch common mistakes
5. **Configures Store Enhancers**: Sets up the store with sensible defaults

### The Magic Behind the Scenes

```jsx
const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});
```

This single call is equivalent to:

- Creating a root reducer with `combineReducers`
- Applying thunk middleware
- Setting up Redux DevTools
- Adding development-only checks for mutations and serializability
- Creating the store with all enhancers

## Complete Store Setup Example

Here's a complete example with the recommended file structure:

**store.js**

```jsx
import { configureStore } from "@reduxjs/toolkit";

import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;
```

**main.jsx**

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App.jsx";
import store from "./store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
```

## Adding More Reducers

As your app grows, simply add more reducers to the configuration:

```jsx
import { configureStore } from "@reduxjs/toolkit";

import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
import transactionReducer from "./features/transactions/transactionSlice";
import uiReducer from "./features/ui/uiSlice";

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
    transactions: transactionReducer,
    ui: uiReducer,
  },
});

export default store;
```

## Advanced Configuration

### Adding Custom Middleware

If you need additional middleware beyond thunk:

```jsx
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
```

**Important**: Use `getDefaultMiddleware()` to keep thunk and other default middleware.

### Disabling DevTools in Production

DevTools are automatically disabled in production builds, but you can control this:

```jsx
const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
```

### Preloaded State

Set initial state when creating the store:

```jsx
const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
  preloadedState: {
    account: {
      balance: 1000,
      loan: 0,
      loanPurpose: "",
    },
  },
});
```

## State Structure

With the above configuration, your Redux state will look like:

```javascript
{
  account: {
    // State from accountReducer
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false
  },
  customer: {
    // State from customerReducer
    fullName: "",
    nationalID: "",
    createdAt: ""
  }
}
```

## Benefits Recap

### Before Redux Toolkit

```jsx
// Multiple imports
import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

// Manual setup
const rootReducer = combineReducers({
  /* ... */
});
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
```

### With Redux Toolkit

```jsx
// Single import
import { configureStore } from "@reduxjs/toolkit";

// Automatic setup
const store = configureStore({
  reducer: {
    /* ... */
  },
});
```

**Result**: Less code, same functionality, better defaults!

## Common Patterns

### Pattern 1: Simple Store

```jsx
const store = configureStore({
  reducer: {
    feature: featureReducer,
  },
});
```

### Pattern 2: Store with Multiple Features

```jsx
const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer,
  },
});
```

### Pattern 3: Store with Custom Middleware

```jsx
const store = configureStore({
  reducer: {
    /* ... */
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customMiddleware),
});
```

## Key Takeaways

- Use `configureStore` instead of `createStore` for new projects
- Redux Toolkit includes thunk middleware and DevTools automatically
- Pass reducers as an object - `combineReducers` is handled automatically
- No need to install separate packages for thunk or DevTools
- Redux Toolkit is the modern, official way to write Redux
- Significantly less boilerplate than traditional Redux

## Migration Note

If you have an existing Redux app using `createStore`, you can gradually migrate to Redux Toolkit. Start by replacing `createStore` with `configureStore` - it's backwards compatible with your existing reducers!

---

**Next:** [Creating Slices with createSlice](./14-creating-slices.md)
