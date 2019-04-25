class customFunc {
  static computeNewBalance(type, findAcct, amount) {
    if (type === 'credit') {
      return parseFloat(findAcct.rows[0].balance) + parseFloat(amount);
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
}

const { computeNewBalance, updatAcions } = customFunc;
export { computeNewBalance, updatAcions };
