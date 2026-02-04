# Redux DevTools

## Overview

Redux DevTools is a powerful developer tool that enhances your Redux development workflow. It provides time-travel debugging, action inspection, state visualization, and much more. Think of it as a supercharged debugging console specifically designed for Redux applications.

## What Redux DevTools Offers

Redux DevTools provides several powerful features:

- **Time-Travel Debugging**: Step backward and forward through your actions
- **Action Inspection**: See every action dispatched with its payload
- **State Visualization**: View the entire state tree at any point in time
- **Action Replay**: Replay actions to reproduce bugs
- **State Diffing**: See exactly what changed in state after each action
- **Performance Monitoring**: Track action timing and performance

## Available Formats

Redux DevTools can be used in multiple ways:

1. **Browser Extension** (Recommended): For Chrome, Edge, and Firefox
2. **Standalone App**: Desktop application for any browser
3. **React Component**: Integrated directly into your app

## Installation & Setup

### Step 1: Install Browser Extension

Install the Redux DevTools extension for your browser:

- **Chrome**: [Redux DevTools Chrome Extension](https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
- **Firefox**: Search "Redux DevTools" in Firefox Add-ons
- **Edge**: Available in Edge Add-ons store

### Step 2: Install DevTools Package

Install the Redux DevTools extension package in your project:

```bash
npm install @redux-devtools/extension
```

**Package Documentation**: [@redux-devtools/extension on npm](https://www.npmjs.com/package/@redux-devtools/extension)

### Step 3: Configure Your Store

Import and integrate DevTools into your store configuration:

```jsx
import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
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

export default store;
```

## Understanding composeWithDevTools

The `composeWithDevTools` function enhances your middleware with DevTools capabilities:

**Without DevTools:**

```jsx
const store = createStore(rootReducer, applyMiddleware(thunk));
```

**With DevTools:**

```jsx
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
```

### What This Does

- Wraps your middleware with DevTools functionality
- Sends all actions and state changes to the browser extension
- Enables time-travel debugging
- Provides detailed action and state inspection

### Multiple Middleware

If you have multiple middleware, include them all:

```jsx
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger, anotherMiddleware)),
);
```

## Using Redux DevTools

### Opening the DevTools

1. Open your application in the browser
2. Open browser DevTools (F12 or Right-click → Inspect)
3. Look for the "Redux" tab
4. Start dispatching actions to see them appear!

### Key Features in Action

#### 1. Action List

Every dispatched action appears in chronological order:

```
account/deposit
account/withdraw
account/requestLoan
customer/createCustomer
```

#### 2. Action Details

Click any action to see:

- **Type**: The action type
- **Payload**: Data sent with the action
- **Time**: When it was dispatched

#### 3. State Tree

View your entire Redux state at any point:

```json
{
  "account": {
    "balance": 300,
    "loan": 100,
    "loanPurpose": "Buy a Car",
    "isLoading": false
  },
  "customer": {
    "fullName": "John Doe",
    "nationalID": "123456",
    "createdAt": "2024-01-15"
  }
}
```

#### 4. Diff View

See what changed after each action:

```diff
account: {
-  balance: 500
+  balance: 300
}
```

#### 5. Time Travel

- Click any action in the history
- State rewinds to that point
- UI updates to reflect that state
- Click "Jump" to move between states

## DevTools Options

### Development vs Production

**Important**: Only enable DevTools in development, not production.

```jsx
const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? composeWithDevTools
    : (middleware) => middleware;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);
```

### Custom Configuration

You can configure DevTools behavior:

```jsx
import { composeWithDevTools } from "@redux-devtools/extension";

const composeEnhancers = composeWithDevTools({
  name: "My Banking App",
  trace: true, // Enable stack traces
  traceLimit: 25, // Limit trace to 25 frames
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);
```

## Common DevTools Actions

### Skip Actions

- Right-click an action
- Select "Skip"
- Action is ignored (not applied to state)

### Lock Changes

- Click the "Lock" icon
- Prevents UI from updating while you inspect state
- Useful for debugging rapidly changing state

### Export/Import State

- Export current state as JSON
- Import previously saved state
- Great for sharing bug reproductions

### Clear Actions

- Click "Clear" to remove all actions
- Fresh start while keeping your app running

## Troubleshooting

### DevTools Not Appearing?

1. **Check extension is installed**: Look for Redux icon in browser toolbar
2. **Verify store configuration**: Ensure `composeWithDevTools` is used
3. **Refresh the page**: Sometimes needed after installing extension
4. **Check console for errors**: Look for Redux-related warnings

### Performance Issues?

If DevTools slows down your app with too many actions:

```jsx
const composeEnhancers = composeWithDevTools({
  maxAge: 50, // Limit history to 50 actions
  trace: false, // Disable stack traces
});
```

## Redux Toolkit Note

**Important**: If you're using **Redux Toolkit**, DevTools is automatically configured! You don't need to install or configure anything - it just works out of the box with `configureStore`.

```jsx
// Redux Toolkit - DevTools already enabled!
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});
```

## Best Practices

- **Use in development only**: Disable in production builds
- **Keep history reasonable**: Limit action history for better performance
- **Export state for bug reports**: Share exact state when reporting issues
- **Use time travel for debugging**: Great for understanding state changes
- **Monitor performance**: Use DevTools to identify slow actions

## Key Takeaways

- Redux DevTools is essential for Redux development
- Install browser extension + npm package
- Wrap middleware with `composeWithDevTools`
- Provides time-travel debugging and action inspection
- Only enable in development, not production
- Redux Toolkit includes DevTools by default

---

**Next:** [Redux Toolkit](./12-redux-toolkit.md)
