const request=require('request')
const chalk=require('chalk')

const forecast=(latitude,longitude,callback)=>{
    url='http://api.weatherstack.com/current?access_key=95949c20314986adfba1d536e3de85d1&query='+encodeURI(latitude)+','+encodeURI(longitude)+'&units=m'
    console.log(url)
    request({url,json:true},(error,{body})=>{
        console.log(body)
        if(error){
            callback('Not connected to the internet',undefined)
        }else if(body.error){
            callback('unable to find the location')
        }else{
            message=body.current.weather_descriptions[0];
            console.log(message)
            temperature=body.current.temperature;
            feelslike=body.current.feelslike
            humidity=body.current.humidity
            callback(undefined,{
                message,
                temperature,
                feelslike,
                humidity
            })
        }
    })
}

module.exports=forecast