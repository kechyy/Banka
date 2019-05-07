const logout = document.getElementById('logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  sessionStorage.removeItem('Authorization');
  window.location.href = '../index.html';
});
