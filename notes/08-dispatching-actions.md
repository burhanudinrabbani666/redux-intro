# Dispatching Actions in React

## Overview

After reading state with `useSelector`, the next step is updating state by dispatching actions. The `useDispatch` hook from React-Redux provides access to the Redux `dispatch` function, allowing you to send actions to the store from your components.

## The useDispatch Hook

The `useDispatch` hook returns a reference to the `dispatch` function from the Redux store.

### Basic Setup

```jsx
import { useDispatch } from "react-redux";

function AccountOperations() {
  const dispatch = useDispatch();

  // Now you can dispatch actions
  function handleDeposit() {
    dispatch(deposit(500));
  }
}
```

### Key Points

- **Call once**: Typically call `useDispatch()` once at the top of your component
- **Store the reference**: Save the dispatch function to a variable
- **Use in handlers**: Call `dispatch()` inside event handlers or effects
- **Pass actions**: Dispatch action objects created by action creators

## Complete Example: Account Operations

Here's a comprehensive example showing how to dispatch multiple types of actions:

```jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, withdraw, requestLoan, payLoan } from "./accountSlice";

function AccountOperations() {
  // Local state for form inputs
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("USD");

  // Get dispatch function
  const dispatch = useDispatch();

  // Get state from Redux store
  const {
    balance,
    loan: currentLoan,
    loanPurpose: currentLoanPurpose,
  } = useSelector((state) => state.account);

  function handleDeposit() {
    try {
      if (!depositAmount) throw new Error("Please enter an amount");

      dispatch(deposit(depositAmount));
      setDepositAmount("");
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleWithdrawal() {
    try {
      if (!withdrawalAmount)
        throw new Error("Please enter a withdrawal amount");
      if (balance < withdrawalAmount) throw new Error("Insufficient balance");

      dispatch(withdraw(withdrawalAmount));
      setWithdrawalAmount("");
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleRequestLoan() {
    try {
      if (!loanAmount) throw new Error("Please enter a loan amount");
      if (!loanPurpose) throw new Error("Please specify loan purpose");
      if (currentLoan > 0)
        throw new Error("Cannot request loan: You already have an active loan");

      dispatch(requestLoan(loanAmount, loanPurpose));
      setLoanAmount("");
      setLoanPurpose("");
    } catch (error) {
      console.log(error.message);
    }
  }

  function handlePayLoan() {
    try {
      if (balance === 0) throw new Error("Insufficient balance to pay loan");
      if (currentLoan === 0) throw new Error("No active loan to pay");

      dispatch(payLoan());
    } catch (error) {
      console.log(error.message);
    }
  }

  return <div>{/* JSX for the component UI */}</div>;
}

export default AccountOperations;
```

## Breaking Down the Pattern

### 1. Import Required Hooks and Actions

```jsx
import { useDispatch, useSelector } from "react-redux";
import { deposit, withdraw, requestLoan, payLoan } from "./accountSlice";
```

### 2. Initialize Hooks

```jsx
const dispatch = useDispatch();
const { balance, loan } = useSelector((state) => state.account);
```

### 3. Create Event Handlers

```jsx
function handleDeposit() {
  // Validate input
  if (!depositAmount) return;

  // Dispatch the action
  dispatch(deposit(depositAmount));

  // Clear form
  setDepositAmount("");
}
```

## Common Patterns

### Pattern 1: Simple Dispatch

For actions without conditions:

```jsx
function handleAction() {
  dispatch(actionCreator(value));
}
```

### Pattern 2: Conditional Dispatch

For actions that require validation:

```jsx
function handleAction() {
  if (!isValid) return;

  dispatch(actionCreator(value));
}
```

### Pattern 3: Dispatch with Error Handling

For actions that need error handling:

```jsx
function handleAction() {
  try {
    if (!value) throw new Error("Value required");

    dispatch(actionCreator(value));
  } catch (error) {
    console.log(error.message);
    // Or show error to user
  }
}
```

### Pattern 4: Dispatch with Multiple Actions

Sometimes you need to dispatch multiple actions:

```jsx
function handleComplexAction() {
  dispatch(actionOne(data1));
  dispatch(actionTwo(data2));
  dispatch(actionThree(data3));
}
```

## Combining useSelector and useDispatch

A typical component uses both hooks together:

```jsx
function MyComponent() {
  // Read state
  const data = useSelector((state) => state.feature.data);

  // Get dispatch
  const dispatch = useDispatch();

  // Update state
  function handleUpdate() {
    dispatch(updateData(newData));
  }

  return <button onClick={handleUpdate}>Update</button>;
}
```

## Best Practices

### Do's ✅

- **Validate input** before dispatching
- **Clear form fields** after successful dispatch
- **Handle errors** gracefully
- **Use descriptive handler names** (e.g., `handleDeposit` instead of `handle1`)
- **Import action creators** rather than creating action objects manually

### Don'ts ❌

- **Don't dispatch in render** - Only dispatch in event handlers or effects
- **Don't mutate state directly** - Always dispatch actions
- **Don't forget validation** - Check user input before dispatching
- **Don't over-dispatch** - Batch related updates when possible

## Error Handling Strategies

### Basic Console Logging

```jsx
function handleAction() {
  try {
    dispatch(action());
  } catch (error) {
    console.log(error.message);
  }
}
```

### User-Friendly Error Display

```jsx
function handleAction() {
  try {
    dispatch(action());
  } catch (error) {
    setError(error.message);
    // Show error in UI
  }
}
```

### Toast Notifications

```jsx
function handleAction() {
  try {
    dispatch(action());
    toast.success("Action successful!");
  } catch (error) {
    toast.error(error.message);
  }
}
```

## Key Takeaways

- Use `useDispatch()` to get the dispatch function
- Call dispatch with action creators: `dispatch(actionCreator(data))`
- Validate input before dispatching actions
- Handle errors appropriately
- Clear form inputs after successful actions
- Combine with `useSelector` to read and update state

---

**Next:** [Legacy Way of Connecting Components to Redux](./09-the-legacy.md)
