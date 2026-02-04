import { useSelector } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay() {
  // Modern way
  const { balance } = useSelector((store) => store.account);

  return <div className="balance">{formatCurrency(balance)}</div>;
}

// Old Way
// function mapStateToProps(state) {
//   return {
//     balance: state.account.balance,
//   };
// }

export default BalanceDisplay;
