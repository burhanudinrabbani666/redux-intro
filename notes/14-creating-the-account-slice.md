# Creating Slices with Redux Toolkit

## Overview

A "slice" in Redux Toolkit is a collection of Redux reducer logic and actions for a single feature of your app. The `createSlice` function is the core of Redux Toolkit, dramatically simplifying how you write Redux logic.

## Why createSlice?

Traditional Redux requires you to:

- Write action type constants
- Write action creator functions
- Write reducer logic with switch statements
- Manually handle immutable updates

**Redux Toolkit's `createSlice` handles all of this automatically!**

## Traditional Redux vs createSlice

### Traditional Redux (Old Way)

```jsx
// Action types
const DEPOSIT = "account/deposit";
const WITHDRAW = "account/withdraw";

// Action creators
function deposit(amount) {
  return { type: DEPOSIT, payload: amount };
}

function withdraw(amount) {
  return { type: WITHDRAW, payload: amount };
}

// Reducer
function accountReducer(state = initialState, action) {
  switch (action.type) {
    case DEPOSIT:
      return { ...state, balance: state.balance + action.payload };
    case WITHDRAW:
      return { ...state, balance: state.balance - action.payload };
    default:
      return state;
  }
}
```

### Redux Toolkit (Modern Way)

```jsx
import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "account",
  initialState: { balance: 0 },
  reducers: {
    deposit(state, action) {
      state.balance += action.payload; // Looks like mutation, but it's safe!
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
  },
});

export const { deposit, withdraw } = accountSlice.actions;
export default accountSlice.reducer;
```

**Result**: Same functionality, 70% less code!

## Creating the Account Slice

Here's a complete account slice with all common banking operations:

```jsx
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },

    withdraw(state, action) {
      state.balance -= action.payload;
    },

    requestLoan: {
      prepare(amount, loanPurpose) {
        return {
          payload: { amount, loanPurpose },
        };
      },

      reducer(state, action) {
        if (state.loan > 0) return;

        state.balance += action.payload.amount;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.loanPurpose;
      },
    },

    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },

    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

export const { deposit, withdraw, requestLoan, payLoan, convertingCurrency } =
  accountSlice.actions;

export default accountSlice.reducer;
```

## Understanding createSlice Structure

### Required Properties

```jsx
const mySlice = createSlice({
  name: "featureName", // Used to generate action types
  initialState: {
    /* ... */
  }, // Initial state for this slice
  reducers: {
    /* ... */
  }, // Reducer functions
});
```

### 1. Name Property

```jsx
name: "account";
```

- Used as prefix for generated action types
- Creates actions like: `"account/deposit"`, `"account/withdraw"`
- Should match the key in your store's reducer object

### 2. Initial State

```jsx
initialState: {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
}
```

- Defines the initial state for this slice
- Can be an object, array, or primitive value
- Becomes the default state when reducer is first called

### 3. Reducers

```jsx
reducers: {
  deposit(state, action) {
    state.balance += action.payload;
  },
}
```

- Each reducer is a function that handles one action type
- Function name becomes the action type
- Uses Immer library for safe "mutations"

## The Magic of Immer

Redux Toolkit uses **Immer** behind the scenes, allowing you to write "mutating" code that's actually safe:

### You Can Write

```jsx
state.balance += action.payload;
state.loan = 0;
```

### Instead of

```jsx
return {
  ...state,
  balance: state.balance + action.payload,
  loan: 0,
};
```

**Both are equivalent**, but the first is much simpler!

### Important Immer Rules

✅ **Do**: Mutate the state directly

```jsx
state.balance += 100;
state.items.push(newItem);
```

❌ **Don't**: Return new state AND mutate

```jsx
state.balance += 100;
return { ...state }; // Wrong! Pick one approach
```

⚠️ **Special Case**: You can return new state instead of mutating

```jsx
return { balance: 0, loan: 0 }; // This works too
```

## Handling Multiple Parameters with prepare

Sometimes you need to pass multiple arguments to an action. Use the `prepare` callback:

### Problem: Multiple Parameters

```jsx
// You want to call it like this:
dispatch(requestLoan(1000, "Buy a car"));

// But action.payload would only get the first argument!
```

### Solution: Use prepare

```jsx
requestLoan: {
  prepare(amount, loanPurpose) {
    // Transform multiple arguments into a single payload
    return {
      payload: { amount, loanPurpose },
    };
  },

  reducer(state, action) {
    // Now payload has both values
    state.loan = action.payload.amount;
    state.loanPurpose = action.payload.loanPurpose;
  },
}
```

### How prepare Works

1. **prepare function**: Takes your custom arguments and returns an object with `payload`
2. **reducer function**: Receives the prepared action and updates state
3. **Result**: Clean API for multi-parameter actions

### Complete prepare Example

```jsx
requestLoan: {
  // Step 1: Prepare the payload
  prepare(amount, loanPurpose) {
    return {
      payload: { amount, loanPurpose },
      // You can also add meta, error, etc.
    };
  },

  // Step 2: Handle the action
  reducer(state, action) {
    // Guard clause: prevent multiple loans
    if (state.loan > 0) return;

    // Update state with prepared payload
    state.balance += action.payload.amount;
    state.loan = action.payload.amount;
    state.loanPurpose = action.payload.loanPurpose;
  },
}
```

## Exporting Actions and Reducer

### Export Actions (Named Exports)

```jsx
export const { deposit, withdraw, requestLoan, payLoan } = accountSlice.actions;
```

- Automatically generated action creators
- Export them so components can dispatch actions
- Names match the reducer function names

### Export Reducer (Default Export)

```jsx
export default accountSlice.reducer;
```

- The combined reducer function for this slice
- Import this in your store configuration
- Handles all actions for this slice

## Using the Slice in Components

### Dispatching Actions

```jsx
import { useDispatch } from "react-redux";
import { deposit, withdraw, requestLoan } from "./accountSlice";

function AccountOperations() {
  const dispatch = useDispatch();

  function handleDeposit() {
    dispatch(deposit(500));
  }

  function handleRequestLoan() {
    dispatch(requestLoan(1000, "Buy a car"));
  }

  return (
    <div>
      <button onClick={handleDeposit}>Deposit $500</button>
      <button onClick={handleRequestLoan}>Request Loan</button>
    </div>
  );
}
```

### Reading State

```jsx
import { useSelector } from "react-redux";

function BalanceDisplay() {
  const balance = useSelector((state) => state.account.balance);
  const loan = useSelector((state) => state.account.loan);

  return (
    <div>
      <p>Balance: ${balance}</p>
      <p>Loan: ${loan}</p>
    </div>
  );
}
```

## Common Patterns

### Pattern 1: Simple State Update

```jsx
reducers: {
  increment(state) {
    state.count += 1;
  },
}
```

### Pattern 2: Update with Payload

```jsx
reducers: {
  setValue(state, action) {
    state.value = action.payload;
  },
}
```

### Pattern 3: Conditional Update

```jsx
reducers: {
  addItem(state, action) {
    if (state.items.length < 10) {
      state.items.push(action.payload);
    }
  },
}
```

### Pattern 4: Multiple Parameters

```jsx
reducers: {
  updateUser: {
    prepare(name, email, age) {
      return { payload: { name, email, age } };
    },
    reducer(state, action) {
      state.user = action.payload;
    },
  },
}
```

## Benefits of createSlice

- ✅ **Less Boilerplate**: No action types or action creators needed
- ✅ **Type Safety**: Better TypeScript support
- ✅ **Immutable Updates**: Immer handles immutability automatically
- ✅ **Co-location**: Actions and reducers live together
- ✅ **Auto-generated Actions**: Action creators created automatically
- ✅ **Cleaner Code**: More readable and maintainable

## Key Takeaways

- `createSlice` generates actions and reducers automatically
- Write "mutating" code safely thanks to Immer
- Use `prepare` for actions with multiple parameters
- Export actions as named exports, reducer as default
- The name property becomes the action type prefix
- Significantly reduces Redux boilerplate

---

**Next:** [Back to Thunks: Async Logic with createAsyncThunk](./15-back-to-thunks.md)
