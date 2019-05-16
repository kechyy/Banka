/* eslint-disable no-undef */
title('Transaction', 'Credit Transaction');
const creditTransactionForm = `<form method="post" class="creditForm"> <div class="row makeTransaction">
<div class="col-6-md col-12-xs">
    <label for="accountType" class="required">Transaction type<span>*</span></label>
    <select class="input-block" id="transactionType" name="transactionType" required>
      <option value="">--Select transaction Type--</option>
      <option value="credit">Credit</option>
      <option value="debit">Debit</option>
    </select>
</div>
<div class="col-6-md col-12-xs">
    <label for="">Account Number</label>
    <input type="number" class="input-block" required minlength="10" maxlength="10" name="accountNumber" id="accountNumber" placeholder="Enter Account number">
</div>
<div class="col-6-md col-12-xs">
    <label for="">Transaction Amount</label>
    <input type="number" class="input-block" required name="amount" id="amount" placeholder="Enter Amount">
</div>
<div class="col-6-md col-12-xs">
    <label for="">Payee Name</label>
    <input type="text" class="input-block" required name="payeeName" id="payeeName" minlength="3" maxlength="255" placeholder="Enter Payee name">
</div>
<div class="col-6-md col-12-xs">
    <label for="">Payee Phone number</label>
    <input type="number" class="input-block" required name="payeePhone"  id="payeePhone" placeholder="Enter Payee phone number">
</div>
<div class="row">
  <div class="col-6-md col-12-xs">
      <input type="submit" class="btn btn-blue makeTransacBtn" id="makeTransacBtn" value="Make Transaction">
  </div>
</div>
</div></form>`;
const creditBtn = document.getElementById('creditBtn');
creditBtn.addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('cashierMain').innerHTML = creditTransactionForm;
  const creditForm = document.querySelector('.creditForm');
  creditForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const accountNumber = document.getElementById('accountNumber').value;
    const amount = document.getElementById('amount').value;
    const transactionType = document.getElementById('transactionType').value;
    // const payeeAcctNumber = document.getElementById('payeeAcctNumber').value;
    const payeeName = document.getElementById('payeeName').value;
    const payeePhone = document.getElementById('payeePhone').value;
    const creditTransactionUrl = `http://localhost:8000/api/v1/cashier/transactions/${accountNumber}/${transactionType}`;
    const transactionBody = {
      amount,
      payeeName,
      transactionType,
      payeePhone
    };
    const creditTransactionRequest = {
      method: 'POST',
      body: JSON.stringify(transactionBody),
      headers: {
        'Content-type': 'application/json',
        Authorization: session
      }
    };
    fetch(creditTransactionUrl, creditTransactionRequest)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((result) => {
        if (result.status !== 201) {
          return customNotify.show(`<p class="msg">${result.error}</p>`,
            '<h3 class="err"> Error<br/><span class="fa fa-times msgSign"></span></h3>');
        }
        viewTransactions();
        return customNotify.show('<p class="msg">Transaction Successful</p>',
          '<h3 class="suces"> SUCCESS<br/><span class="fa fa-check msgSign"></span></h3>');
      })
      .catch((error) => {
        console.log('Request Failed', error.message);
      });
  });
});
