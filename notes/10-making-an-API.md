# Making API Calls with Redux Thunk

## Overview

By default, Redux only supports synchronous actions. However, real-world applications often need to perform asynchronous operations like API calls, timers, or data fetching. **Redux Thunk** is middleware that allows you to write action creators that return functions instead of action objects, enabling asynchronous logic in Redux.

## What is Redux Thunk?

Redux Thunk is a middleware that intercepts actions before they reach the reducer. It allows action creators to:

- Return **functions** instead of action objects
- Perform **async operations** (API calls, delays, etc.)
- Dispatch **multiple actions** from a single action creator
- Access the current **state** if needed

## Installation

Install Redux Thunk as a dependency:

```bash
npm install redux-thunk
```

## Setting Up Redux Thunk

### Step 1: Import Required Functions

```jsx
import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { thunk } from "redux-thunk";
```

### Step 2: Apply Middleware to Store

Add the thunk middleware when creating your store:

```jsx
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
```

**What this does:**

- `applyMiddleware(thunk)` enhances the store with thunk capabilities
- Now action creators can return functions (thunks) in addition to action objects
- The store will automatically execute these functions

## How Thunks Work

### Regular Action Creator (Synchronous)

Returns an action object:

```jsx
function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
```

### Thunk Action Creator (Asynchronous)

Returns a function that receives `dispatch` (and optionally `getState`):

```jsx
function deposit(amount) {
  return async function (dispatch, getState) {
    // Perform async operations here
    const data = await fetchSomeData();

    // Dispatch actions when ready
    dispatch({ type: "account/deposit", payload: data });
  };
}
```

## Real-World Example: Currency Conversion

Here's a practical example that converts currency before depositing:

```jsx
export function deposit(amount, currency) {
  // If already in USD, return regular action
  if (currency === "USD") {
    return { type: "account/deposit", payload: amount };
  }

  // If conversion needed, return a thunk function
  return async function (dispatch) {
    // Dispatch loading action
    dispatch({ type: "account/convertingCurrency" });

    try {
      // Make API call to convert currency
      const res = await fetch(
        `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`,
      );
      const data = await res.json();

      // Calculate converted amount
      const converted = data.rates.USD * amount;

      // Dispatch success action with converted amount
      dispatch({ type: "account/deposit", payload: converted });
    } catch (error) {
      // Handle errors
      dispatch({ type: "account/conversionError", payload: error.message });
    }
  };
}
```

## Breaking Down the Thunk

### 1. Conditional Logic

```jsx
if (currency === "USD") {
  return { type: "account/deposit", payload: amount };
}
```

If no conversion is needed, return a regular action object immediately.

### 2. Return an Async Function

```jsx
return async function (dispatch) {
  // Async logic here
};
```

For async operations, return a function that receives `dispatch`.

### 3. Dispatch Loading State

```jsx
dispatch({ type: "account/convertingCurrency" });
```

Optional: Dispatch an action to show loading UI.

### 4. Perform Async Operation

```jsx
const res = await fetch(/* API URL */);
const data = await res.json();
```

Make the API call and process the response.

### 5. Dispatch Final Action

```jsx
dispatch({ type: "account/deposit", payload: converted });
```

Dispatch the final action with the processed data.

## Common Thunk Patterns

### Pattern 1: Simple Async Thunk

```jsx
function fetchData() {
  return async function (dispatch) {
    const data = await api.getData();
    dispatch({ type: "data/loaded", payload: data });
  };
}
```

### Pattern 2: Thunk with Loading States

```jsx
function fetchData() {
  return async function (dispatch) {
    dispatch({ type: "data/loading" });

    try {
      const data = await api.getData();
      dispatch({ type: "data/success", payload: data });
    } catch (error) {
      dispatch({ type: "data/error", payload: error.message });
    }
  };
}
```

### Pattern 3: Thunk with State Access

```jsx
function conditionalFetch() {
  return async function (dispatch, getState) {
    const { lastFetch } = getState().data;

    // Only fetch if data is stale
    if (Date.now() - lastFetch > 60000) {
      const data = await api.getData();
      dispatch({ type: "data/loaded", payload: data });
    }
  };
}
```

### Pattern 4: Thunk Dispatching Multiple Actions

```jsx
function complexOperation() {
  return async function (dispatch) {
    dispatch({ type: "operation/start" });

    const step1 = await doFirstThing();
    dispatch({ type: "step1/complete", payload: step1 });

    const step2 = await doSecondThing(step1);
    dispatch({ type: "step2/complete", payload: step2 });

    dispatch({ type: "operation/complete" });
  };
}
```

## Updating the Reducer

Make sure your reducer handles the loading action:

```jsx
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

function accountReducer(state = initialState, action) {
  switch (action.type) {
    case "account/convertingCurrency":
      return { ...state, isLoading: true };

    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };

    case "account/conversionError":
      return { ...state, isLoading: false };

    default:
      return state;
  }
}
```

## Using Thunks in Components

Dispatch thunks the same way as regular actions:

```jsx
import { useDispatch } from "react-redux";
import { deposit } from "./accountSlice";

function DepositForm() {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");

  function handleDeposit() {
    // Dispatch the thunk - it will handle the async logic
    dispatch(deposit(Number(amount), currency));
    setAmount("");
  }

  return (
    <div>
      <input value={amount} onChange={(e) => setAmount(e.target.value)} />
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
      </select>
      <button onClick={handleDeposit}>Deposit</button>
    </div>
  );
}
```

## Advantages of Redux Thunk

- **Simple to understand**: Just functions returning functions
- **Flexible**: Can dispatch multiple actions, access state, and handle complex logic
- **No boilerplate**: Minimal setup required
- **Standard approach**: Widely used and well-documented

## Modern Alternative: Redux Toolkit

**Note:** If you're starting a new project, consider using **Redux Toolkit** instead. It includes Redux Thunk by default and provides a simpler API with `createAsyncThunk`:

```jsx
import { createAsyncThunk } from "@reduxjs/toolkit";

const deposit = createAsyncThunk(
  "account/deposit",
  async ({ amount, currency }) => {
    const res = await fetch(
      `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`,
    );
    const data = await res.json();
    return data.rates.USD * amount;
  },
);
```

## Key Takeaways

- Redux Thunk enables async operations in Redux
- Thunks are action creators that return functions instead of objects
- The returned function receives `dispatch` and `getState` as arguments
- Install with `npm install redux-thunk`
- Apply middleware with `applyMiddleware(thunk)`
- Dispatch thunks the same way as regular actions
- Great for API calls, timers, and complex async logic

---

**Next:** [Redux DevTools](./11-redux-devtools.md)
