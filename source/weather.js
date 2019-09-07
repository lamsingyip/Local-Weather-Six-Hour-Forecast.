"strict mode";

// Do a CORS request to get Davis weather hourly forecast

// Create the XHR object.
function createCORSRequest(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);  // call its open method
  return xhr;
}

// Make the actual CORS request.
function makeCorsRequest() {

  let url = "http://api.openweathermap.org/data/2.5/forecast/hourly?q=Davis,CA,US&units=imperial&APPID=c66c3158bea434ed767bfba99ac7a2ba";
  let xhr = createCORSRequest('GET', url);

  // checking if browser does CORS
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Load some functions into response handlers.
  xhr.onload = function() {
      let responseStr = xhr.responseText;  // get the JSON string 
      let object = JSON.parse(responseStr);  // turn it into an object
      console.log(JSON.stringify(object, undefined, 2));  // print it out as a string, nicely formatted

      //Add code here
      //current time
      let currentTime = object.list[0].dt_txt;
      let tid = 'currentTime0';
      cwt(currentTime,tid);

      //current weather
      let currentWeather = object.list[0].weather[0].description;
      let wid = 'currentWeather0';
      cwpic(currentWeather, wid);

      //current temp
      let currentTemp = object.list[0].main.temp;   
      currentTemp = parseInt(currentTemp);
      let cTemp = document.getElementById("currentTemperature");
      cTemp.textContent = currentTemp + '\u00b0';


      //future
      var i;
      for(i=1; i <6; i++){
        //future time
        let cTime = object.list[i].dt_txt;
        let ftid = 'time' + i;
        cwt(cTime,ftid);

        //future temperature
        let cTemp1 = object.list[i].main.temp; 
        cTemp1 = parseInt(cTemp1);
        let tempStr = 'temp' + i;
        let cTemp2 = document.getElementById(tempStr);
        cTemp2.textContent = cTemp1 + '\u00b0';

        //future weather
        let fcurrentWeather = object.list[i].weather[0].description;
        let fwid = 'weather' + i;
        cwpic(fcurrentWeather, fwid);
      }
      

  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  // Actually send request to server
  xhr.send();
};

// run this code to make request when this script file gets executed 
makeCorsRequest();

function cwt(TIME, ID){
  //console.log(TIME);
  let T = TIME.slice(11,13);
  T = parseInt(T) - 8 ;
  let cTime = document.getElementById(ID);
  if (T>=12){
    T -= 12;
    if(T==0){
      cTime.textContent = "12PM";
    }else{
      cTime.textContent = T + "PM";
    }
  }else if(T<0){
    T += 12;
    cTime.textContent = T + "PM";
  }else{
    cTime.textContent = T + "AM";
  }
}

function cwpic(CW, WID){
  let weather = document.getElementById(WID);

  switch(CW){
    case "clear sky":
      weather.src = "../weatherDesign/assets/clearsky.svg";
      break;
    case "few clouds":
      weather.src = "../weatherDesign/assets/fewclouds-day.svg";
      break;
    case "scattered clouds":
      weather.src = "../weatherDesign/assets/scatteredclouds.svg";
      break;
    case "broken clouds":
      weather.src = "../weatherDesign/assets/brokencloud.svg";
      break;
    case "shower rain":
      weather.src = "../weatherDesign/assets/showerrain.svg";
      break;
    case "rain":      
      weather.src = "../weatherDesign/assets/rain-day.svg";
      break;
    case "thunderstorm":      
      weather.src = "../weatherDesign/assets/thunderstorms.svg";
      break;
    case "snow":
      weather.src = "../weatherDesign/assets/snow.svg";
      break;
    case "mist":
      weather.src = "../weatherDesign/assets/mist.svg";
      break;
    default:
      weather.src = "../weatherDesign/assets/snow.svg";
      break;
  }
  
}

function newRequest(){
  let url = "http://api.openweathermap.org/data/2.5/forecast/hourly?q=Davis,CA,US&units=imperial&APPID=c66c3158bea434ed767bfba99ac7a2ba";
  let c = document.getElementById("city").value;
  //Check input if it is with state or country
  let n = c;
  var numOfComma =(n.split(',')).length-1;
  if(numOfComma==0){
    url = "http://api.openweathermap.org/data/2.5/forecast/hourly?q=" + c + ",CA,US&units=imperial&APPID=c66c3158bea434ed767bfba99ac7a2ba";
  }else if(numOfComma==1){
    url = "http://api.openweathermap.org/data/2.5/forecast/hourly?q=" + c + ",US&units=imperial&APPID=c66c3158bea434ed767bfba99ac7a2ba";
  }else if(numOfComma==2){
    url = "http://api.openweathermap.org/data/2.5/forecast/hourly?q=" + c + "&units=imperial&APPID=c66c3158bea434ed767bfba99ac7a2ba";
  }
  let xhr = createCORSRequest('GET', url);

  // checking if browser does CORS
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Load some functions into response handlers.
  xhr.onload = function() {
      let responseStr = xhr.responseText;  // get the JSON string 
      let object = JSON.parse(responseStr);  // turn it into an object
      console.log(JSON.stringify(object, undefined, 2));  // print it out as a string, nicely formatted

      //Add code here
      //current time
      let currentTime = object.list[0].dt_txt;
      let tid = 'currentTime0';
      cwt(currentTime,tid);

      //current weather
      let currentWeather = object.list[0].weather[0].description;
      let wid = 'currentWeather0';
      cwpic(currentWeather, wid);

      //current temp
      let currentTemp = object.list[0].main.temp;   
      currentTemp = parseInt(currentTemp);
      let cTemp = document.getElementById("currentTemperature");
      cTemp.textContent = currentTemp + '\u00b0';


      //future
      var i;
      for(i=1; i <6; i++){
        //future time
        let cTime = object.list[i].dt_txt;
        let ftid = 'time' + i;
        cwt(cTime,ftid);

        //future temperature
        let cTemp1 = object.list[i].main.temp; 
        cTemp1 = parseInt(cTemp1);
        let tempStr = 'temp' + i;
        let cTemp2 = document.getElementById(tempStr);
        cTemp2.textContent = cTemp1 + '\u00b0';

        //future weather
        let fcurrentWeather = object.list[i].weather[0].description;
        let fwid = 'weather' + i;
        cwpic(fcurrentWeather, fwid);
      };     
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  // Actually send request to server
  xhr.send();

}


//get images
let imageArray = []  // global variable to hold stack of images for animation 
let count = 0;          // global var

function addToArray(newImage) {
  if (count < 10) {
    newImage.id = "doppler_"+count;
    newImage.style.display = "none";
    imageArray.push(newImage);
    //console.log(imageArray[count]);
    count = count+1;
    if (count >= 10) {
      console.log("Got 10 doppler images");

      //radar animation
      let counter = 0;
      setInterval(function (){
        document.getElementById("radarAnimation").src = imageArray[counter].src;
        counter++;
        if (counter == 10){
          counter = 0;
        }
      }, 100);  

    }
  }
}

function tryToGetImage(dateObj) {
  let dateStr = dateObj.getUTCFullYear();
  dateStr += String(dateObj.getUTCMonth() + 1).padStart(2, '0'); //January is 0!
  dateStr += String(dateObj.getUTCDate()).padStart(2, '0');

  let timeStr = String(dateObj.getUTCHours()).padStart(2,'0')
  timeStr += String(dateObj.getUTCMinutes()).padStart(2,'0');

  let filename = "DAX_"+dateStr+"_"+timeStr+"_N0R.gif";
  let newImage = new Image();
  newImage.onload = function () {
    // console.log("got image "+filename);
    addToArray(newImage);
  }
  newImage.onerror = function() {
    // console.log("failed to load "+filename);
  }
  newImage.src = "http://radar.weather.gov/ridge/RadarImg/N0R/DAX/"+filename;

}

function getTenImages() {
  let dateObj = new Date();  // defaults to current date and time
  // if we try 150 images, and get one out of every 10, we should get enough
  for (let i = 0; i < 150; i++) {
    newImage = tryToGetImage(dateObj);
    dateObj.setMinutes( dateObj.getMinutes()-1 ); // back in time one minute
  }

}

getTenImages();


function slideFunction1(){
  let upper = document.getElementsByClassName("upper")[0];
  upper.classList.add("displaynone");
  let lower = document.getElementsByClassName("lower")[0];
  lower.classList.remove("displaynone");
  lower.classList.add("slideUp");
  document.getgetElementsByClassName("slideUp")[0].style.WebkitAnimationPlayState = "running";
}
function slideFunction2(){
  let lower = document.getElementsByClassName("lower")[0];
  lower.classList.remove("slideUp");
  lower.classList.add("displaynone");
  let upper = document.getElementsByClassName("upper")[0];
  upper.classList.remove("displaynone")
  upper.classList.add("slideDown");
  document.getgetElementsByClassName("slideUp")[0].style.WebkitAnimationPlayState = "running";
}
  



