//The user will enter a date. Use that date to get the NASA picture of the day from that date! https://api.nasa.gov/
const chooseDate = document.querySelector('#choose-date')
const showDate = document.querySelector('#show-date')
const video_background = document.querySelector('#video-background');
const overlay = document.querySelector('#overlay');
const image_apod = document.querySelector('#image-apod');
const video_apod = document.querySelector('#video-apod');


// get image
document.querySelector('#get').addEventListener('click', getFetch)

function getFetch() {
  const date = document.querySelector('input').value
  console.log(date)

  const url = `https://api.nasa.gov/planetary/apod?api_key=p3lDZiie6w5no7V5TssHXYZu9FNDZs6C5otj6u2U&date=${date}`

  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      // console.log(data.explanation)

      // const x = data.explanation
      // x.split(' ').forEach(word => {

      //   for(let i=0; i<x.length; i++){
      //     let count = 0
      //     if(word.endsWith('.')) count++;
      //   }
        

      //   if(count==3){
          

      //     count=0
      //   }
      // })

      chooseDate.classList.add('hidden');
      showDate.classList.toggle('hidden');
      video_background.classList.add('hidden');
      overlay.classList.add('hidden');
      
      document.querySelector('body').style.background = 'rgb(19, 19, 19)';
      document.querySelector('#name').innerText = data.title;

      if(data.media_type === 'video'){
        video_apod.src = data.url;
        image_apod.classList.add('hidden');

        // make iframe element
      }else{
        image_apod.src = data.hdurl;
        video_apod.classList.add('hidden');
      }

      document.querySelector('#description').innerText = data.explanation;
    })
    .catch(err => {
        console.log(`error ${err}`);
    });
}



document.querySelector('#reset').addEventListener('click', reset)

function reset() {
  chooseDate.classList.toggle('hidden')
  showDate.classList.add('hidden')
  video_background.classList.toggle('hidden')
  overlay.classList.toggle('hidden')
  video_apod.classList.toggle('hidden');
  image_apod.classList.toggle('hidden');
}