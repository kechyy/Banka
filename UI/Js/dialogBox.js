const customNotify = new function(){
    // This method accept in argument to feed the dialog box
    this.show = (msg,msgHeader="")=>{
        // Load the DOM with the Dialog box
        document.getElementById('dialogContent').innerHTML = dialogContent;
        // Dialog Box Container
        const dlg = document.getElementById('dialogCont');
        // Dialog Box Message body
        const dlgBody = document.querySelector('#dlgBody');
        // Dialog Box Mesage Header
        const dlgHeader = document.querySelector('.dlg-header');
        // Css style to make dialog box visible
        dlg.style = 'display:block; bottom:35%';
        dlg.style.zIndex = '999999999999999999999'
        dlg.style.opacity = 1;
        dlgBody.innerHTML = msg;
        dlgHeader.innerHTML = msgHeader;
    }
    // Function to clear the dialog box when the user click ok
    this.okay = ()=>{
        const dialogCont = document.getElementById('dialogCont');
        dialogCont.style.opacity = 0;
        document.getElementById('dialogContent').innerHTML = "";
    }
}
const  dialogContent = `
<div id="dialogCont" class="dlg-container">
    <div id="dlg-header" class="dlg-header"></div>
    <div id="dlgBody" class="dlg-body">This is our custom alert dialog. Pres 'Ok' to close this</div>
    <div class="dlg-footer">
        <a class="btn btn-gray" onclick="customNotify.okay()">Ok</a>
    </div>
</div>`


    
   
    
    