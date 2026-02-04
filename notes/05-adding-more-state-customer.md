# Adding More State: Customer

## Working with Multiple Reducers

As your application grows, you'll typically need to manage different slices of state. For example, a banking app might need to track both account information and customer details separately.

Redux provides the `combineReducers` function to help you organize multiple reducers into a single root reducer.

## Why Combine Reducers?

Combining reducers offers several advantages:

- **Separation of Concerns**: Each reducer manages its own slice of state
- **Modularity**: Keep related logic together and organized
- **Scalability**: Easy to add new state slices as your app grows
- **Maintainability**: Smaller, focused reducers are easier to understand and update

## How to Combine Reducers

First, import the `combineReducers` function from Redux:

```js
import { combineReducers } from "redux";
```

Then, create a root reducer by combining your individual reducers:

```js
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
```

Finally, pass the root reducer to `createStore`:

```js
const store = createStore(rootReducer);
```

## Understanding the State Structure

When you combine reducers, your Redux state tree will be structured according to the keys you provide:

```js
{
  account: {
    // State managed by accountReducer
    balance: 0,
    loan: 0,
    loanPurpose: ""
  },
  customer: {
    // State managed by customerReducer
    fullName: "",
    nationalID: "",
    createdAt: ""
  }
}
```

Each reducer only manages its own slice of the state tree. The `accountReducer` manages the `account` state, and the `customerReducer` manages the `customer` state.

## Complete Example

```js
import { legacy_createStore as createStore, combineReducers } from "redux";

// Individual reducers
function accountReducer(state = initialAccountState, action) {
  // Handles account-related actions
  switch (action.type) {
    // ... account cases
    default:
      return state;
  }
}

function customerReducer(state = initialCustomerState, action) {
  // Handles customer-related actions
  switch (action.type) {
    // ... customer cases
    default:
      return state;
  }
}

// Combine reducers into a root reducer
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// Create the store with the combined reducer
const store = createStore(rootReducer);
```

## Accessing Combined State

When you call `store.getState()`, you'll receive the complete state object:

```js
const state = store.getState();

// Access account state
console.log(state.account);

// Access customer state
console.log(state.customer);
```

## Key Points to Remember

- Each key in `combineReducers` corresponds to a slice of your state
- Each reducer is responsible only for its own slice
- You can combine as many reducers as needed
- The property names (like `account` and `customer`) can be anything you choose
- Each individual reducer should have its own initial state

---

**Next:** [Professional Redux File Structure](./06-professional-redux-file.md)
