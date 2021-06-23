//console.log('Client side Java Script file is loading')



const weatherForecast=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')



weatherForecast.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    console.log(location)
    messageOne.textContent='Loading...' //Because we want this to appear - while we fetch the data.

    fetch('http://localhost:3000/weather?address='+encodeURI(location)).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error
            messageTwo.textContent=''
           return  console.log(data.error)
        }
        //else{
            messageOne.textContent=''
            messageTwo.textContent=data.forecast+' in '+data.location+' with temperature:'+data.temperature+' degrees.It feels like '+data.feelslike+' degrees'
        console.log(data.location)
        console.log(data.forecast)
        //}
        
    })
})


})




// fetch('http://localhost:3000/weather?address=Chandigarh,Punjab').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

//Goal: Fetch Weather.
//
//1.Setup a call to fetch weather for boston.
//2.Get the parse JSON response.
//      -if error property,print error.
//      -if no error property,print location and forecast
//3.Refresh the browser and test your work.

