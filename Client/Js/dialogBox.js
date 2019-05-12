/* eslint-disable new-parens */
/* eslint-disable no-unused-vars */
const dialogContent = `
<div id="dialogCont" class="dlg-container">
    <h2 id="dlg-header" class="dlg-header2"></h2>
    <div id="dlgBody" class="dlg-body"></div>
    <div class="dlg-footer">
        <a class="btn btn-blue" onclick="customNotify.okay()">Ok</a>
    </div>
</div>`;
const dialogContent2 = `
<div id="dialogCont" class="dlg-container">
    <h2 id="dlg-header" class="dlg-header2"></h2>
    <div id="dlgBody" class="dlg-body2"></div>
    <div class="dlg-footer">
      <a class="btn btn-blue" onclick="customConfirm.okay()">Ok</a>
      <a class="btn btn-red" onclick="customConfirm.cancel()">Cancel</a>
    </div>
</div>`;
// Call back function to be called when the user clicks on the button

const customNotify = new function () {
  // This method accept in argument to feed the dialog box
  this.show = (msg, msgHeader = '') => {
    // Load the DOM with the Dialog box
    document.getElementById('dialogContent').innerHTML = dialogContent;
    // Dialog Box Container
    const dlg = document.getElementById('dialogCont');
    // Dialog Box Message body
    const dlgBody = document.querySelector('#dlgBody');
    // Dialog Box Mesage Header
    const dlgHeader = document.querySelector('.dlg-header2');
    // Css style to make dialog box visible
    dlg.style = 'display:block; bottom:35%';
    dlg.style.zIndex = '999999999999999999999';
    dlg.style.opacity = 1;
    dlgBody.innerHTML = msg;
    dlgHeader.innerHTML = msgHeader;
  };
  // Function to clear the dialog box when the user click ok
  this.okay = () => {
    const dialogCont = document.getElementById('dialogCont');
    dialogCont.style.opacity = 0;
    document.getElementById('dialogContent').innerHTML = '';
  };
};

const customConfirm = new function () {
  this.show = (msg, msgHeader = '', callback) => {
    // Load the DOM with the Dialog box
    document.getElementById('dialogContent').innerHTML = dialogContent2;
    // Dialog Box Container
    const dlg = document.getElementById('dialogCont');
    // Dialog Box Message body
    const dlgBody = document.querySelector('#dlgBody');
    // Dialog Box Mesage Header
    const dlgHeader = document.querySelector('.dlg-header2');
    // Css style to make dialog box visible
    dlg.style = 'display:block; bottom:35%';
    dlg.style.zIndex = '999999999999999999999';
    dlg.style.opacity = 1;
    dlgBody.innerHTML = msg;
    dlgHeader.innerHTML = msgHeader;
    this.callback = callback;
  };

  this.okay = () => {
    this.callback();
    this.close();
  };
  this.cancel = () => {
    this.close();
    return false;
  };
  this.close = () => {
    const dialogCont = document.getElementById('dialogCont');
    dialogCont.style.opacity = 0;
    document.getElementById('dialogContent').innerHTML = '';
  };
};
