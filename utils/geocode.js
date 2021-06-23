const request=require('request')

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURI(address)+'.json?access_token=pk.eyJ1IjoidnZrc2luZ2giLCJhIjoiY2txM24wMjV2MGFjeDJvbWwyM3Z1dDYyYSJ9.Xh6etv9Dxe-E-GR9clqOng&limit=1'

    console.log(url)

    request({url,json:true},(error,{body}={})=>{
        console.log(body)
        if(error){
            callback('unable to connect to the internet')
        }
        else if (body.message || body.features.length==0){
            console.log('calling back from here')
            callback('unable to find the location. try another search')
        }
        else{
            const feature=body.features[0];
            longitude=feature.center[0],
            latitude=feature.center[1],
            location=feature.place_name

            callback(undefined,{
                longitude,
                latitude,
                location
            })
        }
    })
}

module.exports=geocode