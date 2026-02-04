import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, payLoan, requestLoan, withdraw } from "./accountSlice";

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("USD");

  const dispatch = useDispatch();
  const {
    balance,
    loan: currentLoan,
    loanPurpose: currentLoanPurpose,
    isLoading,
  } = useSelector((store) => store.account);

  function handleDeposit() {
    try {
      if (!depositAmount) throw new Error("Insert amount");

      dispatch(deposit(depositAmount, currency));

      setDepositAmount("");
      setCurrency("");
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleWithdrawal() {
    try {
      if (!withdrawalAmount) throw new Error("Insert withdrawal");

      if (balance < withdrawalAmount)
        throw new Error("balance less than withdraw");
      dispatch(withdraw(withdrawalAmount));
      setWithdrawalAmount("");
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleRequestLoan() {
    try {
      if (!loanAmount) throw new Error("Insert amount");
      if (!loanPurpose) throw new Error("Insert your purpose");

      if (currentLoan > 0) throw new Error("Cant loan. You already have Loan");

      dispatch(requestLoan(loanAmount, loanPurpose));
      setLoanAmount("");
      setLoanPurpose("");
    } catch (error) {
      console.log(error.message);
    }
  }

  function handlePayLoan() {
    try {
      if (balance === 0) throw new Error("Dont have any Balance");

      dispatch(payLoan());
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          <button onClick={handleDeposit} disabled={isLoading}>
            {isLoading ? "Converting..." : `Deposit ${depositAmount}`}
          </button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>

        <div>
          <span>
            Pay back{" "}
            {currentLoan > 0 ? `$${currentLoan} (${currentLoanPurpose})` : ""}
          </span>
          <button onClick={handlePayLoan}>Pay loan</button>
        </div>
      </div>
    </div>
  );
}

export default AccountOperations;
