
const viewTransactions = () => {
  let i = 1;
  let transactionHeader = ''; let transactionBody = ''; let transactionFooter = '';
  fetch(viewTransactionUrl, {
    method: 'GET',
    headers: {
      Authorization: session
    }
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((result) => {
      transactionHeader = `<table><thead>
            <tr>
                <th>S/N</th>
                <th>Account Name</th>
                <th>Transaction ID</th>
                <th>Transaction Date</th>
                <th>Amount</th>
                <th>Transaction type</th>
            </tr>
        </thead>
        <tbody>`;
      if (result.status !== 200) {
        transactionBody = '<tr><td colspan="6">No Record Found</td></tr>';
      } else {
        result.data.forEach((transac) => {
          transactionBody += `<tr>
            <td>${i++}</td>
            <td>${transac.account_number}</td>
            <td>${transac.transaction_id}</td>
            <td>${transac.transaction_date}</td>
            <td>${transac.amount}</td>
            <td>${transac.transaction_type}</td>
        </tr>`;
        });
      }
      transactionFooter = `
          </tbody>
        </table>`;
      document.getElementById('cashierMain').innerHTML = transactionHeader + transactionBody + transactionFooter;
    })
    .catch((error) => {
      console.log('Requst Failed', error.message);
    });
};
viewTransactions();
const allTransactions = document.querySelector('.allTransactions');
allTransactions.addEventListener('click', (e) => {
  e.preventDefault();
  viewTransactions();
});
