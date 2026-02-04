# Professional Redux File Structure: State Slices

## Overview

As your Redux application grows, organizing your code properly becomes essential. The **feature-based** (or slice-based) structure is the recommended approach for structuring Redux applications. This pattern groups all related files by feature rather than by file type.

## Why Use This Structure?

The feature-based approach offers several benefits:

- **Colocation**: All files related to a feature live together
- **Scalability**: Easy to add new features without cluttering the structure
- **Maintainability**: Find everything related to a feature in one place
- **Team Collaboration**: Different team members can work on different features independently
- **Clear Boundaries**: Each feature is self-contained with its own logic and components

## Recommended File Structure

Here's how a professional Redux application should be organized:

```
src/
├── App.jsx
├── features/
│   ├── accounts/
│   │   ├── AccountOperations.jsx
│   │   ├── accountSlice.js
│   │   └── BalanceDisplay.jsx
│   └── customers/
│       ├── CreateCustomer.jsx
│       ├── Customer.jsx
│       └── customerSlice.js
├── index.css
├── main.jsx
└── store.js
```

## Breaking Down the Structure

### Root Level Files

- **`App.jsx`**: Main application component
- **`main.jsx`**: Application entry point
- **`store.js`**: Redux store configuration
- **`index.css`**: Global styles

### Features Directory

The `features/` folder contains all feature-specific code, organized by domain:

#### Accounts Feature (`features/accounts/`)

- **`accountSlice.js`**: Contains the Redux logic (reducer, actions, initial state)
- **`AccountOperations.jsx`**: Component for deposit/withdraw operations
- **`BalanceDisplay.jsx`**: Component to display account balance

#### Customers Feature (`features/customers/`)

- **`customerSlice.js`**: Contains the Redux logic for customer data
- **`CreateCustomer.jsx`**: Component for creating new customers
- **`Customer.jsx`**: Component for displaying customer information

## What Goes in a Slice File?

Each slice file (e.g., `accountSlice.js`) typically contains:

1. **Initial State**: The default state for this feature
2. **Reducer Function**: Logic for handling actions
3. **Action Creators**: Functions to create actions
4. **Selectors** (optional): Functions to extract specific data from state

Example structure:

```js
// accountSlice.js

// Initial state
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

// Reducer
function accountReducer(state = initialState, action) {
  switch (action.type) {
    // ... cases
    default:
      return state;
  }
}

// Action creators
export function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

// Export reducer as default
export default accountReducer;
```

## Benefits of This Approach

### Feature Isolation

Each feature is self-contained. If you need to update the accounts feature, all relevant files are in `features/accounts/`.

### Easy Navigation

Looking for account-related code? Check the `accounts` folder. Need customer logic? It's in the `customers` folder.

### Scalability

Adding a new feature is straightforward:

```
features/
├── accounts/
├── customers/
└── transactions/    ← New feature
    ├── transactionSlice.js
    ├── TransactionList.jsx
    └── TransactionItem.jsx
```

## Alternative: Redux Toolkit Slice Pattern

When using Redux Toolkit (recommended for modern apps), your slice files become even cleaner:

```js
// accountSlice.js with Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "account",
  initialState: { balance: 0, loan: 0, loanPurpose: "" },
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
  },
});

export const { deposit, withdraw } = accountSlice.actions;
export default accountSlice.reducer;
```

## Key Takeaways

- Organize by **feature**, not by file type
- Keep related code together in feature folders
- Use descriptive names for slice files (`accountSlice.js`, not `slice.js`)
- Export the reducer as default, actions as named exports
- This structure scales well as your application grows

---

**Next:** [Back to React](./07-back-to-react.md)
