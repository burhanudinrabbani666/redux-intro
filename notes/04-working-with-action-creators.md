# Working with Action Creators

## What Are Action Creators?

Action creators are functions that create and return action objects. Instead of writing action objects manually every time you dispatch, action creators encapsulate the action creation logic, making your code more maintainable and less error-prone.

## Why Use Action Creators?

Using action creators provides several benefits:

- **Consistency**: Ensures action objects have the correct structure every time
- **Reusability**: Write the action logic once, use it everywhere
- **Maintainability**: If you need to change an action's structure, you only update it in one place
- **Readability**: Makes your dispatch calls cleaner and easier to understand
- **Type Safety**: Easier to add TypeScript types later if needed

## Creating Action Creators

Let's create action creator functions for our banking application:

```js
function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}

function payLoan() {
  return { type: "account/payLoan" };
}
```

### Breaking Down the Pattern

Each action creator follows a simple pattern:

1. **Function parameters**: Accept the data needed for the action
2. **Return an object**: The object has a `type` and optionally a `payload`
3. **Payload structure**: Can be a simple value or a complex object

Notice that `payLoan()` takes no parameters because paying off a loan doesn't require additional data.

## Using Action Creators with Dispatch

Instead of manually creating action objects, you now call the action creator functions:

```js
const store = createStore(reducer);

// Dispatch actions using action creators
store.dispatch(deposit(500));
store.dispatch(withdraw(200));
store.dispatch(requestLoan(100, "Buy a Car"));
store.dispatch(payLoan());

// Check the updated state
console.log(store.getState());
```

## Comparison: Before vs After

**Without action creators (manual approach):**

```js
store.dispatch({ type: "account/deposit", payload: 500 });
```

**With action creators (cleaner approach):**

```js
store.dispatch(deposit(500));
```

The action creator approach is more concise and reduces the chance of typos in action types.

## Complete Example

```js
import { legacy_createStore as createStore } from "redux";

// Action creators
function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}

function payLoan() {
  return { type: "account/payLoan" };
}

// Create store
const store = createStore(reducer);

// Dispatch actions using action creators
store.dispatch(deposit(500));
store.dispatch(withdraw(200));
store.dispatch(requestLoan(100, "Buy a Car"));
store.dispatch(payLoan());

// View the final state
console.log(store.getState());
```

## Best Practices

- **Naming convention**: Use descriptive names that match the action they create
- **Export your action creators**: So they can be imported and used in components
- **Keep them pure**: Action creators should not have side effects
- **Consistent structure**: Follow the same pattern for all action creators

---

**Next:** [Adding More State: Customer](./05-adding-more-state-customer.md)
