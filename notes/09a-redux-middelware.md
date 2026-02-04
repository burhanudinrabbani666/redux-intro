# Redux Middlware and Thunks

What is a "thunk"?
The word "thunk" is a programming term that means "a piece of code that does some delayed work". Rather than execute some logic now, we can write a function body or code that can be used to perform the work later.

For Redux specifically, "thunks" are a pattern of writing functions with logic inside that can interact with a Redux store's dispatch and getState methods.

Using thunks requires the redux-thunk middleware to be added to the Redux store as part of its configuration.

Thunks are a standard approach for writing async logic in Redux apps, and are commonly used for data fetching. However, they can be used for a variety of tasks, and can contain both synchronous and asynchronous logic.

[Redux thunks](https://redux.js.org/usage/writing-logic-thunks)

**Next:** [making an API call redux thunks](./10-making-an-API.md)
