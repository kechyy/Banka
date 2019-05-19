
// This class manages admin staff button response
class AdminActionButton{
    actionButton(){
        customNotify.show('<span class="msg">User account successfully activated','<h3 class="success"> Success</h3>');
        return;
    }

    actionDelete(){
        customNotify.show('<span class="msg">User account successfully deleted','<h3 class="success"> Success</h3>');
        return;
    }
}
const {actionButton, actionDelete} = new AdminActionButton();
