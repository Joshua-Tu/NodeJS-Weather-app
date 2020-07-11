console.log('Client side javascript file is loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', evt => {
  evt.preventDefault();

  const location = search.value;

  messageOne.innerHTML = 'Loading...';
  messageTwo.innerHTML = '';

  // localhost use
  // fetch(`http://localhost:3000/weather?address=${location}`)

  // heroku deployment use
  fetch(`/weather?address=${location}`)
  .then( res => {
    res.json().then(data => {
      if (data.error) {
        messageOne.innerHTML = data.error;
        messageTwo.innerHTML = '';
      } else {
        messageOne.innerHTML = 'Address: ' + data.forecast.location;
        messageTwo.innerHTML = 'Weather condition: ' + data.forecast.temperature + ', ' + data.forecast.weather;
      }
    })
  });
})
