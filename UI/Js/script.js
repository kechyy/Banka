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
const text = `Banka is a light-weight core banking 
    application that powers banking operations like account creation, customer deposit and withdrawals. `;
const titleTop = document.querySelector('.titleTop');
let i = 0;
let y = 1;
const typeText = () => {
  // eslint-disable-next-line no-plusplus
  titleTop.textContent += text.slice(i++, y++);
};
setInterval(typeText, 50);
