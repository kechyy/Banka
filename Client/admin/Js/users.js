/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable no-loop-func */
let usertype;
const manageUsers = () => {
  let userHead = ''; let userBody = ''; let userFooter = '';
  fetch(userUrl, requests)
    .then(res => res.json())
    .then((result) => {
      title('Manage User', 'User Accounts');
      let j = 1;
      userHead = `<div class="col-12-xs col-12-md table">
    <table>
       <thead>
          <tr>
              <th>S/N</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Address</th>
              <th>User type</th>
              <th>Status</th>
              <th>Set Usertype</th>
          </tr>
      </thead>
      <tbody>`;
      if (result.status !== 200) {
        userBody = '<tr><td colspan="7:>No Record Found</td></tr>';
      } else {
        result.data.forEach((user) => {
          userBody += `<tr>
            <td>${j++}</td>
            <td>${user.firstname}</td>
            <td>${user.lastname}</td>
            <td>${user.email}</td>
            <td>${user.usertype}</td>
            <td>${user.user_email_status}</td>
            <td>
              <select class="usertype" data-id="${user.id}">
              <option value="">--Select--</option>
                <option value="client">Client</option>
                <option value="admin">Admin</option>
                <option value="staffAdmin">Staff Admin</option>
                <option value="cashier">Cashier</option>
              </select>
            </td>
        </tr>`;
        });
      }
      userFooter = `</tbody>
  </table>
    </div>`;
      document.getElementById('adminMain').innerHTML = userHead + userBody + userFooter;
      usertype = document.querySelectorAll('.usertype');
      for (let i = 0; i < usertype.length; i++) {
        usertype[i].addEventListener('change', () => {
          const userId = usertype[i].getAttribute('data-id');
          const callback = () => {
            const urls = `https://kechyy-banka-app.herokuapp.com/api/v1/admin/setuser/${userId}`;
            // const urls = `http://localhost:8000/api/v1/admin/setuser/${userId}`;
            fetch(urls,
              {
                method: 'POST',
                body: JSON.stringify({ usertype: usertype[i].value }),
                headers: {
                  'Content-type': 'application/json',gi
                  Authorization: session
                }
              })
              .then((respnse) => {
                console.log(respnse)
                return respnse.json();
              })
              .then((reslt) => {
                console.log(reslt)
                if (reslt.status === 200) {
                  return manageUsers();
                }
                return customNotify.show(`<p class="msg">${reslt.error}</p>`,
                  '<h3 class="err"> ERROR <br/><span class="fa fa-times msgSign"></span></h3>');
              })
              .catch((error) => {
                console.log('Request failed', error);
              });
          };
          customConfirm.show('Are you really sure you want to change the user type?',
            'WARNING<br/><span class="fa fa-warning err"></span>', callback);
        });
      }
    });
};
manageUsers();

const userBtn = document.getElementById('userBtn');
userBtn.addEventListener('click', (e) => {
  e.preventDefault();
  manageUsers();
});
