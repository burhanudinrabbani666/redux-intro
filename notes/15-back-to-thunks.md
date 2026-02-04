# Back to Thunks

```jsx
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  // Asynchronus /middleWare
  return async function (dispatch) {
    // API call
    dispatch({ type: "account/convertingCurrency" });

    const res = await fetch(
      `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`,
    );

    const data = await res.json();
    const converted = data.rates.USD * amount;

    dispatch({ type: "account/deposit", payload: converted });
  };
}
```

still not using react toolkit way

Next: [Creating customer slice](./16-creating-customer-slice.md)
