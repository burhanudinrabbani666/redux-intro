# Integrating Redux with React

## Overview

Now that we have our Redux store configured, we need to connect it to our React application. Redux provides the `react-redux` library, which includes the tools needed to integrate Redux with React components.

## The Provider Component

Similar to React's Context API, Redux uses a `Provider` component to make the store available to all components in your application.

### Setting Up the Provider

In your application's entry point (`main.jsx`), wrap your app with the `Provider` component:

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

### Key Points About Provider

- **Location**: Always wrap your root component with `Provider`
- **Store Prop**: Pass your Redux store to the `store` prop
- **Single Provider**: You only need one `Provider` at the top of your component tree
- **Accessibility**: All child components can now access the Redux store

## Reading State with useSelector

The `useSelector` hook allows you to extract data from the Redux store state in any component.

### Basic Usage

Here's how to read customer data in a component:

```jsx
import { useSelector } from "react-redux";

function Customer() {
  const customer = useSelector((store) => store.customer.fullName);

  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
```

### How useSelector Works

The `useSelector` hook takes a **selector function** as an argument:

```jsx
const customer = useSelector((state) => state.customer.fullName);
//                           ↑         ↑
//                    entire Redux    navigate to
//                         state      specific data
```

**The selector function:**

1. Receives the entire Redux state as a parameter
2. Returns the specific piece of state you need
3. Automatically subscribes the component to that piece of state
4. Re-renders the component when that specific data changes

## Multiple State Selections

You can use `useSelector` multiple times in a single component:

```jsx
import { useSelector } from "react-redux";

function Customer() {
  const fullName = useSelector((state) => state.customer.fullName);
  const nationalID = useSelector((state) => state.customer.nationalID);
  const createdAt = useSelector((state) => state.customer.createdAt);

  return (
    <div>
      <h2>👋 Welcome, {fullName}</h2>
      <p>ID: {nationalID}</p>
      <p>Member since: {createdAt}</p>
    </div>
  );
}

export default Customer;
```

## Selecting Complex State

You can also select entire state slices or derive computed values:

```jsx
// Select entire customer object
const customer = useSelector((state) => state.customer);

// Derive computed values
const accountBalance = useSelector(
  (state) => state.account.balance - state.account.loan,
);

// Select multiple related values
const account = useSelector((state) => ({
  balance: state.account.balance,
  loan: state.account.loan,
  loanPurpose: state.account.loanPurpose,
}));
```

## Complete Example

Here's a full example showing the setup and usage:

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

**Customer.jsx**

```jsx
import { useSelector } from "react-redux";

function Customer() {
  const customer = useSelector((state) => state.customer.fullName);

  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
```

## Important Notes

- **Provider is required**: Without `Provider`, components cannot access the Redux store
- **useSelector causes re-renders**: Components re-render when selected state changes
- **Selector optimization**: Keep selectors simple and focused on specific data
- **Parameter naming**: You can name the parameter `state` or `store` - both are common conventions

## Comparison: Redux vs Context API

While `Provider` looks similar to Context API, Redux offers:

- **Better performance** for frequent updates
- **DevTools integration** for debugging
- **Middleware support** for async operations
- **Time-travel debugging**
- **More predictable state updates**

---

**Next:** [Dispatching Actions](./08-dispatching-actions.md)
