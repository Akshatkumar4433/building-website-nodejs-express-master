const express = require('express');
const speakersRoute = require('./speakers')
const feedbackRoute = require('./feedback')
const router = express.Router();


//Here this is next for app.use in server.js file

module.exports = (params) => {
router.get('/', (request, response) =>{


/*
  //since we already specified
  //'view engine and location'
  //express knows where to look
  response.render('pages/index', {pageTitle: 'Welcome'});
*/
  response.render('layout', {pageTitle: 'Welcome', template: 'index'})
});
//router has three middlewares
//on it
router.use('/speakers', speakersRoute(params));
router.use('/feedback', feedbackRoute(params));
 return router;
}


/*
if (!request.session.visitcount) {
  request.session.vistcount = 0;
}
request.session.visitcount += 1
This piece code test sessions
*/
