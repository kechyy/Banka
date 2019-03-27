    const customNotify = new function(){
        this.show = (msg,msgHeader="")=>{
            document.getElementById('dialogContent').innerHTML = dialogContent;
            const dlg = document.getElementById('dialogCont');
            const dlgBody = document.querySelector('#dlgBody');
            const dlgHeader = document.querySelector('.dlg-header');
            dlg.style.bottom = '45%';
            dlg.style.zIndex = '999999999999999999999'
            dlg.style.opacity = 1;
            dlgBody.innerHTML = msg;
            dlgHeader.innerHTML = msgHeader;
            
            document.getElementById('freelayer').style.display=''
        }
        
        this.okay = ()=>{
            const dialogCont = document.getElementById('dialogCont');
            dialogCont.style.top = '-50px';
            dialogCont.style.opacity = 0;
            document.getElementById('freelayer').style.display='none';
        }
    }
    const  dialogContent = `<div id="freelayer" class="freez-layer" style="display: none"></div>
<div id="dialogCont" class="dlg-container">
    <div id="dlg-header" class="dlg-header"></div>
    <div id="dlgBody" class="dlg-body">This is our custom alert dialog. Pres 'Ok' to close this</div>
    <div class="dlg-footer">
        <a class="btn btn-gray" onclick="customNotify.okay()">Ok</a>
    </div>
</div>`


    
   
    
    