console.log('Client side javascript file is loaded');

fetch('http://puzzle.mead.io/puzzle').then(res => {
  res.json().then(data => {
    console.log(data);
  });
});

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
})
