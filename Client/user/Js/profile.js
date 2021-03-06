/* eslint-disable no-undef */
const request = {
  method: 'GET',
  headers: {
    Authorization: sessionStorage.getItem('Authorization')
  }
};
let profileDetails;
fetch(profileUrl, request)
  .then(response => response.json())
  .then((result) => {
    title('User Profile', 'Profile Information');
    profileDetails = `<div class="col-3-md acctPhoto">
        <img src="../images/avatar1.jpg" alt="">
    </div>
    <div class="col-8-md acctDetails">
        <table>
            <tbody>
                <tr>
                    <td><strong> First Name</strong></td>
                    <td><strong>${result.data.firstname}</strong></td>
                </tr>
                <tr>
                    <td><strong>LastName</strong> </td>
                    <td>${result.data.lastname}</td>
                </tr>
                <tr>
                    <td><strong>Email Address</strong> </td>
                    <td>${result.data.email}</td>
                </tr>
                <tr>
                    <td><strong>User type</strong> </td>
                    <td>${result.data.usertype}</td>
                </tr>
                <tr>
                    <td><strong>Status</strong> </td>
                    <td>${result.data.user_email_status}</td>
                </tr>
            </tbody>
        </table>
    </div>`;
    document.getElementById('userMain').innerHTML = profileDetails;
  })
  .catch((error) => {
    console.log('Request failed', error);
  });

const userProfiles = document.querySelector('.userProfiles');
userProfiles.addEventListener('click', (e) => {
  e.preventDefault();
  title('User Profile', 'Profile Information');
  document.getElementById('userMain').innerHTML = profileDetails;
});
