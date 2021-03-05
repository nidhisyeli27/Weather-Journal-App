const set=document.getElementById('set');
const generate= document.getElementById('generate');
console.log(zip);
let d = new Date();
let newDate = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();
// Personal API Key for OpenWeatherMap API
const apiKey="&units=metric&appid=6fd1cc1330d75d2ce823e73cdea8234e";
const baseURL="http://api.openweathermap.org/data/2.5/weather?zip=";
// Event listener to add function to existing HTML DOM element
generate.addEventListener('click', weather );
// Function called by event listener
function weather(e){
    const zip=document.getElementById('zip').value;
    const feelings= document.getElementById('feelings').value;
    e.preventDefault();
    getWeather(baseURL,zip,apiKey)
    .then(function(data){
        const temp=data.main.temp;
        const desc= data.weather[0].description;
        const city=data.name;
        const icon=data.weather[0].icon;
        const feeling=feelings;
       //add data to post req
       postData('/add',{temp,desc,city,icon,feeling})
    })
    .then(function(){
        updateUI();
    })
    .catch(function(error){
           console.log("error"+error);
           alert("the zip code is invalid");
    });
    set.reset();
}

// Function to GET Web API Data
const getWeather = async (baseURL,zip,apiKey) =>{ 
    const response = await fetch(baseURL+zip+apiKey)
    try {
    // Transform into JSON
    const allData = await response.json();
    console.log(allData)
    return allData;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  } 

// Function to POST data 
const postData = async ( url , data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log(`error: ${error}`);
    }
};

// Function to GET Project Data 
const updateUI = async() =>{
    const request = await fetch('/retrieve');
    try{
        const data = await request.json();
        console.log(data);
        document.getElementById('section2').style.display='block';
        document.querySelector('.city').innerHTML=data.city;
        document.querySelector('.date').innerHTML=newDate;
        document.querySelector('.temp').innerHTML=`${Math.floor(data.temp)}°C`;
        document.querySelector('.desc').innerHTML=data.desc;
        document.querySelector('.icon').src= `https://openweathermap.org/img/wn/${data.icon}@2x.png`;        
        document.querySelector('.feeling').innerHTML=`I feel:"${data.feeling}"`;
    } 
    catch(error) {
        console.log("error", error);
    }
}

