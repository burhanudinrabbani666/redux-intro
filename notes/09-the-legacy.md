# The legacy way of connecting Components to redux

```jsx
function BalanceDisplay({ balance }) {
  // Modern way
  // const { balance } = useSelector((store) => store.account);
  console.log(balance);

  return <div className="balance">{formatCurrency(balance)}</div>;
}

// Old Way
function mapStateToProps(state) {
  return {
    balance: state.account.balance,
  };
}

export default connect(mapStateToProps)(BalanceDisplay);
```

Next: [Redux Middelware and Thunks](./09a-redux-middelware.md)
