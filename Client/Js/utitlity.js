
const session = sessionStorage.getItem('Authorization') ? sessionStorage.getItem('Authorization') : '';
const urls = 'http://localhost:3000/api/v1/protectedEndPoints';
const requests = {
  method: 'GET',
  headers: {
    Authorization: session
  }
};
fetch(urls, requests)
  .then(report => report.json())
  .then((res) => {
    if (res.error === 'Please supply a token') {
      window.location.href = '../index.html';
    }
  })
  .catch((error) => {
    console.log('Request failed', error);
  });

const title = (maintTitle, subTitle) => {
  document.getElementById('contentMainTitle').innerHTML = maintTitle;
  document.getElementById('contentSubTitle').innerHTML = subTitle;
};
