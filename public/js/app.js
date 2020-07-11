console.log('Client side javascript file is loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');
const messageFour = document.querySelector('#message-4');

weatherForm.addEventListener('submit', evt => {
  evt.preventDefault();

  const location = search.value;

  messageOne.innerHTML = 'Loading...';
  messageTwo.innerHTML = '';
  messageThree.innerHTML = '';
  messageFour.innerHTML = '';

  // localhost use
  // fetch(`http://localhost:3000/weather?address=${location}`)

  // heroku deployment use
  fetch(`/weather?address=${location}`)
  .then( res => {
    res.json().then(data => {
      if (data.error) {
        messageOne.innerHTML = data.error;
        messageTwo.innerHTML = '';
        messageThree.innerHTML = '';
        messageFour.innerHTML = '';
      } else {
        const { location, temperature, weather, humidity, feelslike, uvIndex } = data.forecast;
        messageOne.innerHTML = 'Address: ' + location;
        messageTwo.innerHTML = 'Weather condition: ' + weather;
        messageThree.innerHTML = `Temperature: ${temperature}, feelslike ${feelslike}℃`;
        messageFour.innerHTML = `Humidity: ${humidity}%  UV Index: ${uvIndex}`;
      }
    })
  });
})
