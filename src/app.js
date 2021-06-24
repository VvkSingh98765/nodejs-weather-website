const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('../utils/geocode')
const forecast=require('../utils/forecast')
const { response } = require('express')

const app=express()
const port=process.env.PORT||3000

//Define paths for express configs
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
console.log(publicDirectoryPath)
console.log(viewsPath)
console.log(partialsPath)


//set up handle bar engine and views location and partials.
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory at place.
app.use(express.static(publicDirectoryPath))

//routes 

//for home page.
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Vivek Singh'
    })
})


//for about page.
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Vivek Singh'
    })
})

//for help page.
app.get('/help',(req,res)=>{
    res.render('help',{
        message:'Please help yourself by visiting github repo at:',
        repo: 'https://github.com/VvkSingh98765/nodejs-weather-website',
        email: 'https://mail.google.com/mail/u/0/#inbox?compose=CllgCJlLWWnwcnvbQMqvBLZJNwhHJLgxrxhnthZkfXXVrvDRDSJWjZmBhMTQPrXBTVRWJlZTKLq',
        title:'Help',
        name:'Vivek Singh'
    })
    
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        res.send({
            error:'Please provide address'
        })
        return ;
    }
    const address=req.query.address
    //console.log(address)
    geocode(address,(error,{latitude,longitude,location}={})=>{

        if(error){
            res.send({
                error
            })
            return;
        }
        forecast(latitude,longitude,(error,{message,temperature,feelslike,humidity}={})=>{
            if(error){
                res.send({
                    error
                })
                return
            }

            res.send({
                location,
                forecast:message,
                temperature,
                feelslike,
                humidity
            })
        })

    })
})

app.get('/product',(req,res)=>{
    if(!req.query.search){
      res.send({
            error:'Please send search parameter'
        })
        return 
    }
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        error:'Help Article could not be found',
        name:'Vivek Singh',
        title:'Error'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        error:'Page Couldnt be found',
        title:'404',
        name:'Vivek Singh'
    })
})



app.listen(port,()=>{
    console.log('Server is up on port:'+port)
})