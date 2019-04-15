const topMenu = document.querySelector('.topMenu > li a');
const dropDown = document.querySelector('.dropDown');
topMenu.addEventListener('click', (e) => {
  e.preventDefault();
  if (dropDown.style.display === 'block') {
    dropDown.style.display = 'none';
    return;
  }
  if (dropDown.style.display === '') {
    dropDown.style.display = 'block';
    return;
  }
  dropDown.style.display = 'block';
});
