//The user will enter a date. Use that date to get the NASA picture of the day from that date! https://api.nasa.gov/

// CHOOSE DATE variables
const chooseDate = document.querySelector('#choose-date');
const video_background = document.querySelector('#video-background');
const overlay = document.querySelector('#overlay');
// SHOW DATE variables
const showDate = document.querySelector('#show-date');
const image_apod = document.querySelector('#image-apod');
const image_src = document.querySelector('#image-src');
const body = document.querySelector('body');
const span_date = document.querySelector('#date');
const description = document.querySelector('#description');
const reset = document.querySelector('#reset');


// DARK MODE TO LIGHT MODE -> vice versa
document.querySelector('#change-mode').addEventListener('click', changeMode);
function changeMode() {

  if(body.style.background === 'rgb(255, 255, 255)'){
    body.style.background = 'rgb(19, 19, 19)';

    // elements of show date
    showDate.style.color = 'rgb(255, 255, 255)';
    span_date.style.border = '2px solid rgb(255, 255, 255)';
    span_date.style.fontWeight = '500';
    description.style.fontWeight = '500';
    reset.style.backgroundColor = 'rgb(255, 255, 255)'; 
    reset.style.color = 'rgb(19, 19, 19)';
    reset.style.fontWeight = '600';
  }else{
    body.style.background = 'rgb(255, 255, 255)';
    
    // elements of show date
    showDate.style.color = 'rgb(19, 19, 19)';
    span_date.style.border = '3px solid rgb(19, 19, 19)';
    span_date.style.fontWeight = '600';
    description.style.fontWeight = '600';
    reset.style.backgroundColor = 'rgb(19, 19, 19)';
    reset.style.color = 'rgb(255, 255, 255)';
    reset.style.fontWeight = '400';
  } 
}


// GET APOD
document.querySelector('#get').addEventListener('click', getFetch)
function getFetch() {
  const date = document.querySelector('input').value
  console.log(date)

  const url = `https://api.nasa.gov/planetary/apod?api_key=p3lDZiie6w5no7V5TssHXYZu9FNDZs6C5otj6u2U&date=${date}`

  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)  

      const descriptionArr = splitSentences(data.explanation);
      
      console.log(descriptionArr)
      
      for (let i = 0; i < descriptionArr.length; i += 2) {
          const currentElement = descriptionArr[i];
          const nextElement = descriptionArr[i + 1];
          
          document.querySelector('#description').innerText += undefinedChecker(currentElement) + ' ' + undefinedChecker(nextElement) + '\n\n';
      }

      chooseDate.classList.add('hidden');
      showDate.classList.toggle('hidden');
      video_background.classList.add('hidden');
      overlay.classList.add('hidden');
      
      body.style.background = 'rgb(19, 19, 19)';
      showDate.style.color = 'rgb(255, 255, 255)';
      reset.style.fontWeight = '600';
      document.querySelector('#name').innerText = data.title;
      // document.querySelector('#description').innerText = data.explanation;
      document.querySelector('#date').innerText = arrangeDate(data.date);
      image_apod.src = data.url;
      image_src.href = data.url;

      if(data.media_type === 'video'){
        image_apod.classList.add('hidden');

        // make iframe element
        const ifrm = document.createElement("iframe");
        ifrm.setAttribute("src", data.url);
        ifrm.style.width = "640px";
        ifrm.style.height = "480px";
        ifrm.frameborder = "0";
        ifrm.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;";
        ifrm.allowFullscreen = true;

        document.body.appendChild(ifrm);
      }

      
    })
    .catch(err => {
        console.log(`error ${err}`);
    });
}



// RESET BUTTON on click
reset.addEventListener('click', back);
function back() {
  chooseDate.classList.toggle('hidden');
  showDate.classList.add('hidden');
  video_background.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
  image_apod.classList.toggle('hidden');
}


// function to check if a str is undefined
function undefinedChecker(str){
  if(str !== undefined) return str;
  return '';
}


// function to split sentences in a string
function splitSentences(paragraph){
  const sentences = []
  let start = 0
  
  for (let i = 0; i < paragraph.length; i++) {
      if (paragraph[i] === '.' || paragraph[i] === '?' || paragraph[i] === '!') {
          const sentence = paragraph.substring(start, i + 1).trim()
  
          sentences.push(sentence)
  
          start = i + 1
      }
  }
  
  return sentences;
}


// function to return a date in an order
function arrangeDate(str) {
  const months = {
    "01" : "JAN",
    "02" : "FEB",
    "03" : "MAR",
    "04" : "APR",
    "05" : "MAY",
    "06" : "JUN",
    "07" : "JUL",
    "08" : "AUG",
    "09" : "SEP",
    "10" : "OCT",
    "11" : "NOV",
    "12" : "DEC",
  }

  let arr = str.split('-');
  console.log(arr);
  arr[1] = months[arr[1]]

  return `${arr[1]} ${arr[2]}, ${arr[0]}`
}