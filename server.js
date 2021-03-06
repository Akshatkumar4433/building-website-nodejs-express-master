const express = require('express');
const path = require('path');
const createError = require('http-errors')
const bodyParser = require('body-parser');

//This a function
//this returns a object
const app = express();
const routes = require('./routes');
const FeedbackService = require('./services/FeedbackService');
const SpeakerService = require('./services/SpeakerService');

const  feedbackService = new FeedbackService('./data/feedback.json');
const  speakersService = new SpeakerService('./data/speakers.json');

app.set('trust proxy', 1)
//trust the cookie
//ngxine


//This is the session manager
//It will store encryted client data
//on client machine
const cookieSession = require('cookie-session')


app.use(cookieSession({
  name:'session',
  keys: ['dakdsjflajsdkf', 'askjdflkasjfdlk'],
}))

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'))
//first line attachs ejs as view engine
//second line is where to find this view engine files
//or simply our template

app.use(express.static(path.join(__dirname, './static')))
//in ejs file is example where as express finds image links
//it knows where to look for
//we are using middleware static
//which looks for static files in directory
//and then sends to server

/*
//We are trying to simulate how to respond to request if promise function fail.

app.get('/throw', (request,response, next) => {
  setTimeout(() => {
  /*
    return next(new Error('something'));
  },500)
  */

     //return next(new Error('something'))

    /*
    this will just show error
    on /throw link
    while other pages will work

})
*/

//This is a local variable
app.locals.siteName = 'ROUX Meetups';
//It can be used by templates

//this middleware loads data in names
app.use(async (request, response, next) => {
   try {
     const names = await speakersService.getNames();
     //this is a aysnc statement to get names from database
     response.locals.speakerNames = names;
     //load them in local database
     //Now they are usable  by template

     return next();
     //next() is still a mystery
   }
   catch(err) {
     return next(err);
   }
})



const port = 3000;

//This is moved to routes folder to organise
//app better
/*
app.get('/', (request, response) =>{
  response.render('pages/index', {pageTitle: 'Welcome'})
  //Here express will look in views folder
  //as second agrument it accepts a variable to display

   /*
    response.sendFile(path.join(__dirname, './static/index.html'))
    //__dirname is global variable from node js
    //This prints current directory

})
*/
/*
app.get('/speakers', (request, response) =>{
    response.sendFile(path.join(__dirname, './static/speakers.html'))
})
*/

/*
app.use('/',routes());
app.use('/speakers',speakersRoutes());
*/

//So here routes() is next() middleware
app.use('/', routes({
    feedbackService,
    speakersService,
}));


//If we are here it means no route match

app.use((request, response,next) => {
    return next(createError(404,'File not found'))
})

app.use( (err, request, response,next) => {
  response.locals.message = err.message;
  console.error(err)
  //Errors have status
  //like 404 , page not found
  const status = err.status || 500;
  response.locals.status = status;
  response.status(status)
  //we will store the status.??
  response.render('error')
});


app.listen(port, ()=> {
  console.log(`I am listening at ${port}`)
})
