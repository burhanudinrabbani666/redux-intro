# Redux vs Context API

**CONTEXT API + useReducer**

- Built into React
- Easy to set up a single context
- Additional state “slide” requires new context set up from scratch (“provider hell” in App.js)
- No mechanism for async operations
- Performance optimization is a pain
- Only React DevTools

**REDUX**

- Requires additional package (larger bundle size)
- More work to set up initially
- Once set up, it’s easy to create additional state “slices”
- Supports middleware for async operations
- Performance is optimized out of the box
- Excellent DevTools

## WHEN TO USE CONTEXT API OR REDUX?

**CONTEXT API + useReducer**

> ⚠️ “Use the Context API for global state management in small apps”

- When you just need to share a value that doesn’t change often [Color theme, preferred language, authenticated user, …]
- When you need to solve a simple prop drilling problem
- When you need to manage state in a local sub-tree of the app

**REDUX**

> ⚠️ “Use Redux for global state management in large apps”

- When you have lots of global UI state that needs to be updated frequently (because Redux is optimized for this) [Shopping cart, current tabs, complex filters or search, …]
- When you have complex state with nested objects and arrays (because you can mutate state with Redux Toolkit)

> There is no right answer that fits every project. It all depends on the project needs!

Next Project:
[]()
