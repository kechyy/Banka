class customFunc {
  static computeNewBalance(type, findAcct, amount) {
    if (type === 'credit') {
      const { balance } = findAcct.rows[0];
      const total = parseFloat(balance) + parseFloat(amount);
      return total;
    }
    if (type === 'debit') {
      return parseFloat(findAcct.rows[0].balance) - parseFloat(amount);
    }
  }

  static updatAcions(updattype) {
    if (updattype === 'dormant') {
      return 'active';
    }
    if (updattype === 'active') {
      return 'dormant';
    }
  }

  // static validatePayeeTransaction(type, res, payeefindAcct, amount) {
  //   if (findAcct.rowCount === 0) {
  //     return res.status(404).json({
  //       status: 404,
  //       error: 'Account number does not exist '
  //     });
  //   }

  //   if (findAcct.rows[0].account_status === 'dormant') {
  //     return res.status(400).json({
  //       status: 400,
  //       error: "Transaction account is dormant! Can't persform transaction on a dormant account"
  //     });
  //   }
  //   if (findAcct.rows[0].balance < amount) {
  //     return res.status(400).json({
  //       status: 400,
  //       error: 'Insufficient Payee account balance'
  //     });
  //   }
  // }

  // static validateReceiverTransaction(type, res, payeefindAcct, amount) {
  //   if (findAcct.rowCount === 0) {
  //     return res.status(404).json({
  //       status: 404,
  //       error: 'Account number does not exist '
  //     });
  //   }

  //   if (findAcct.rows[0].account_status === 'dormant') {
  //     return res.status(400).json({
  //       status: 400,
  //       error: "Transaction account is dormant! Can't persform transaction on a dormant account"
  //     });
  //   }
  //   if (findAcct.rows[0].balance < amount) {
  //     return res.status(400).json({
  //       status: 400,
  //       error: 'Insufficient Payee account balance'
  //     });
  //   }
  // }
}


const { computeNewBalance, updatAcions } = customFunc;
export { computeNewBalance, updatAcions };
