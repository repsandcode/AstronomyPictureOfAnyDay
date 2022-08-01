//The user will enter a date. Use that date to get the NASA picture of the day from that date! https://api.nasa.gov/
const chooseDate = document.querySelector('#choose-date')
const showDate = document.querySelector('#show-date')
const video_background = document.querySelector('#video-background');
const overlay = document.querySelector('#overlay');
const image_apod = document.querySelector('#image-apod');
const image_src = document.querySelector('#image-src');

// change mode
document.querySelector('#change-mode').addEventListener('click', changeMode);
function changeMode() {
  
}


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
      const date = arrangeDate(data.date);
      // const sentencesArr = splitSentences(data.explanation);
      // let count = 0, 
      //     str = '', 
      //     pars = Math.ceil(sentencesArr.length/3),
      //     newArr = [];

      // console.log(sentencesArr)

      // for (let i = 0; i < sentencesArr.length; i++) {
      //   if(count===3){
      //     count = 0;
      //     newArr.push(str);
      //     str = '';
          
      //   }else{
      //     str += sentencesArr[i];
      //     count++;
      //   }
      //   console.log(newArr)
      // }

      // for (let i = 0; i < newArr.length; i++) {
      //   console.log(newArr[i])
      // }

      chooseDate.classList.add('hidden');
      showDate.classList.toggle('hidden');
      video_background.classList.add('hidden');
      overlay.classList.add('hidden');
      
      document.querySelector('body').style.background = 'rgb(19, 19, 19)';
      document.querySelector('#name').innerText = data.title;
      document.querySelector('#description').innerText = data.explanation;
      document.querySelector('#date').innerText = date;
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



document.querySelector('#reset').addEventListener('click', reset)

function reset() {
  chooseDate.classList.toggle('hidden')
  showDate.classList.add('hidden')
  video_background.classList.toggle('hidden')
  overlay.classList.toggle('hidden')
  image_apod.classList.toggle('hidden');
}

function splitSentences(str){
  return str.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
}

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