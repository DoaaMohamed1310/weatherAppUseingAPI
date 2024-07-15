let inputSearch=document.querySelector(".inputSearch")
let btnSearch=document.querySelector(".btnSearch")
let card=document.querySelector(".cards")
let weatherList=[]
let day=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]    
let month= ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
async function getData(contary="cairo") 
{
    let req=await fetch( `http://api.weatherapi.com/v1/forecast.json?key=0f47f395390348ffbb7172003241207&q=${contary}&days=3`)
    let weather=await req.json()
    weatherList=weather
    displayData()
    forcastWeather()
}
getData()

btnSearch.addEventListener("click",function(){
    let inputRGX=/^[a-zA-Z0-9]{3,}$/
    if(inputRGX.test(inputSearch.value)){
        getData(inputSearch.value)
    }
})


function displayData(){
    let time=new Date(weatherList.forecast.forecastday[0].date)
    card.innerHTML=`<div class="boxOne ">
                    <div class="header-card p-2  d-flex justify-content-between text-light ">
                        <span>${day[time.getDay()]}</span>
                        <span>${time.getDate()}${month[time.getMonth()]}</span>
                    </div>
                    <div class="footer-card p-3">
                        <p class="cityName" >${weatherList.location.name}</p>
                        <p class="temp d-flex justify-content-center align-items-center my-4"><strong class="me-4 text-light">${weatherList.current.temp_c}<sup>o</sup>C</strong><img class="w-25" src="${weatherList.current.condition.icon}"></p>
                        <span class="text-info fs-5">${weatherList.current.condition.text}</span>
                    </div>
                </div>
                `
}

function forcastWeather(){
    let temp=""
    let displayDaysTemp=weatherList.forecast.forecastday
    for (let i = 1; i < displayDaysTemp.length; i++) {
        temp+=`<div class="box">
                    <div class="header-card p-2 text-center text-light ">
                        <span>${day[new Date(displayDaysTemp[i].date).getDay()]}</span>
                    </div>
                    <div class="footer-card p-5 text-center">
                        <img src="${displayDaysTemp[i].day.condition.icon}" alt="photo" class="mb-3">
                        <p class="temp text-light fs-5 mb-1">${displayDaysTemp[i].day.maxtemp_c}<sup>o</sup>C</p>
                        <div class=" min-temp fs-5 mb-3">${displayDaysTemp[i].day.mintemp_c}</div>
                        <span class="text-info fs-5">${displayDaysTemp[i].day.condition.text}</span>
                    </div>
                </div>
`      
    }
    card.innerHTML+=temp
}


