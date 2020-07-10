console.log('Client side javascript file is loaded');

fetch('http://localhost:3000/weather?address=!')
.then( res => {
  res.json().then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data.address);
      console.log(data.forecast);
    }
  })
});

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit', evt => {
  evt.preventDefault();

  const location = search.value;

  console.log(location);
})
