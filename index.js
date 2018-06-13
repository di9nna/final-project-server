var express= require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')
var axios = require('axios')

var server = express()

server.use(logger('dev'))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: false}))

server.set('view engine', 'ejs')
server.use(express.static('views'))
server.set('views', __dirname+'/views')

server.get('/', function(request, response){
    response.render('home.ejs')
})

server.post('/results', function(request, response){
    console.log(request.body)
    
    var bday = request.body.search // '2018-06-01'
    var bdayArray = bday.split("-") // ['2018', '06', '01']
    var month = Number(bdayArray[1])
    var day = Number(bdayArray[2])
    var sign = 'Pisces'
    
    // Aquarius (January 20 to February 18)
    if (month === 1 && day >= 20) {
        sign = 'Aquarius'
    }
    if (month === 2 && day <= 18) {
        sign = 'Aquarius'
    }
    //  Pisces February 19 – March 20
    if (month === 2 && day >= 19) {
        sign = 'Pisces'
    }

    if (month === 3 && day <= 20) {
        sign = 'Pisces'
    }
    
    // Aries (March 21-April 19)
    if (month === 3 && day >= 21) {
    sign = 'Aries'
    }
    if (month === 4 && day <= 19){
    sign = 'Aries'
    }
    
    // Taurus (April 20-May 20) 
    if (month === 4 && day >= 20){
        sign = 'Taurus'
    }
    if(month === 5 && day <= 20){
        sign = 'Taurus'
    }
    // Gemini (May 21-June 20)
    if (month === 5 && day >= 21){
        sign = 'Gemini'
    }
    if (month === 6 && day <= 20){
        sign = 'Gemini'
    }
    // Cancer (June 21-July 22)
    if (month === 6 && day >= 21){
        sign = 'Cancer'
    }
    if (month === 7 && day <= 22){
        sign = 'Cancer'
    }
    // Leo (July 23-August 22)
    if (month === 7 && day >=23){
        sign = 'Leo'
    }
    if (month === 8 && day <= 22){
        sign = 'Leo'
    }
    //Virgo (August 23-September 22)
    if (month === 8 && day >= 23){
        sign= 'Virgo'
    }
    if (month === 9 && day <= 22){
        sign = 'Virgo'
    }
    // Libra (September 23-October 22)
    if (month === 9 && day >= 23){
        sign = 'Libra'
    }
    if (month === 10 && day <= 22){
        sign = 'Libra'
    }
    // Sagittarius (November 22-December 21)
    if (month === 11 && day >= 22){
        sign = 'Sagittarius'
    }
    if (month === 12 && day <= 21){
        sign = 'Sagittarius'
    }
    // Capricorn (December 22-January 19)
    if (month === 12 && day >= 22){
        sign = 'Capricorn'
    }
    if (month === 1 && day <= 19){
        sign = 'Capricorn'
    }
    
   var url = "http://horoscope-api.herokuapp.com/horoscope/today/"+sign
   
   axios.get(url)
   .then( res => res.data )
   .then( data => {
       console.log(data)
       response.render('results.ejs', {data:data, sign: sign})
   })
   .catch(err => console.log(err))
    // response.render('home.ejs')
})
var port = process.env.PORT

server.listen(port, () => {
    console.log('Server running on port:'+port)
})