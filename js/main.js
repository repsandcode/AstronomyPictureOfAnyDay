//The user will enter a date. Use that date to get the NASA picture of the day from that date! https://api.nasa.gov/
document.querySelector('button').addEventListener('click', getFetch)

function getFetch() {
  const date = document.querySelector('input').value
  console.log(date)

  const url = `https://api.nasa.gov/planetary/apod?api_key=p3lDZiie6w5no7V5TssHXYZu9FNDZs6C5otj6u2U&date=${date}`

  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)

      document.querySelector('h2').innerText = data.title
      document.querySelector('img').src = data.hdurl
      document.querySelector('p').innerText = data.explanation
    })
    .catch(err => {
        console.log(`error ${err}`)
    });

}
