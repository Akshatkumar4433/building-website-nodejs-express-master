const express = require('express');
const speakersRoute = require('./speakers')
const feedbackRoute = require('./feedback')
const router = express.Router();


//Here this is next for app.use in server.js file

module.exports = ()=> {
router.get('/', (request, response) =>{
  response.render('pages/index', {pageTitle: 'Welcome'});
});
router.use('/speakers', speakersRoute());
router.use('/feedback', feedbackRoute());
 return router;
}
