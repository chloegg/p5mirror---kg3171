var weather;
var api='https://api.openweathermap.org/data/2.5/forecast/daily?q=';
var input;
var apiKey='&appid=ad6e239ec0ac58d0a9836e942aac97eb';
var units='&cnt=16&units=metric';
var canvas;

let daytemp=[]
let tenki=""
let rain
let clouds
let clearweather
let snow

function preload(){
  tint(155, 176)
  rain=loadImage('rainy.jpg')
  clouds=loadImage('clouds.jpg')
  clearweather=loadImage('clear.jpg')
  snow=loadImage('snow.png')
                  
}
function setup() {
  canvas=createCanvas(360, 300);
  canvas.position(20,30);
  var button = select('#submit');
  button.mousePressed(weatherAsk);
  input = select('#city');
}

function loadWeatherpicture(){
  if(weather.list[0].weather[0].main=='Rain'){
  image(rain,0,20,420,380)
      
    }
    if(weather.list[0].weather[0].main=='Clouds'){
      image(clouds,0,20,420,380)}
    if(weather.list[0].weather[0].main=='Clear'){
     image(clearweather,0,20,450,380)}
if(weather.list[0].weather[0].main=='Snow'){
  image(snow,0,20,420,380)
      
   }
}
function weatherAsk() {
 
  var url = api + input.value() + apiKey + units;
  loadJSON(url, gotData);
  console.log(url);
}

function gotData(data) {
  weather = data;
  for(var i=0;i<weather.list.length;i++){

  var eventemp=weather.list[i].temp.eve;
    

  }
  

}

function draw() {
clear();

              
  if (weather) {
    loadWeatherpicture()
                
    for (var i=0; i<5; i++) {
    daytemp[i] = weather.list[i].temp.eve}
    var todayhumidity = weather.list[0].humidity;
    var tomorrowhumidity = weather.list[1].humidity;
 
  var mintemp=weather.list[0].temp.min;
  var maxtemp=weather.list[0].temp.max;
  var tenki=weather.list[0].main
// console.log(tenki)
    stroke(255,255,255);
   
    fill(70+mintemp,50,mintemp+150);
    ellipse(100, 160,mintemp*5, mintemp*5);

    fill(170+maxtemp,20,mintemp+30);
    ellipse(250, 160,maxtemp*5,maxtemp*5);
    stroke(255);
   
    fill(255);
    noStroke();
    textSize(35);
  //  text(weather.city.name,20, 70);
    //fill(255,255,255)
    //textSize(10)
  text('Hello ' + weather.city.name + '!',20,70);
    textSize(14);
 // text(tenki,0,230)
    fill(255);

    text("Today: minimum & maximum temperature",20, 100);

 text('Temperature Forcast for next 5 days:',20,230)
    for(i=0;i<5;i++){
 stroke(255,255,255);
     fill(150+daytemp[i]*4,30-daytemp[i] ,255-daytemp[i]*9);
    ellipse(80+i*50,260,daytemp[i]*2,daytemp[i]*2,130)
    }
    

}

}