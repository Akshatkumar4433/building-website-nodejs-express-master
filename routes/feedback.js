const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator')

//Here this is next for app.use in server.js file

const validations =  [
  check('name')
  .trim()
  .isLength({min:3})
  .escape() //no html and js embbed
  .withMessage('A name is required'),
  check('email')
  .trim()
  .isEmail()
  .normalizeEmail()
  .withMessage('A validate email address'),
  check('title')
  .trim()
  .isLength({min:3})
  .escape()
  .withMessage('A title is required'),
  check('message')
  .trim()
  .isLength({min:5})
  .escape()
  .withMessage('A message is required'),
];


module.exports = (params)=> {
  //params are coming from app.use
  let feedbackService = params.feedbackService;


router.get('/', async (request, response,next) =>{
  try {
    const feedback = await feedbackService.getList()
    const errors = request.session.feedback ? request.session.feedback.errors:false;
    const successMessage = request.session.feedback ? request.session.feedback.message:false;
    request.session.feedback = {};

    return response.render('layout', {
        pageTitle: 'Feedback',
        template:'feedback',
        feedback,
        errors, //using ejs they are then displayed
        successMessage,//using ejs they displayed
    });
  }
  catch(error) {
    return next(error)
  }
});

router.post('/', validations,
async (request, response) =>{
  try {
    //it validates based on validation array
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      //if there are errors
      //create object for that session (user, browser, phone)
      //store then as errors property
      //redirect to /feedback
      request.session.feedback = {
        errors: errors.array()
      };
      return response.redirect('/feedback');
    }

    const {name, email, title, message} = request.body;
    await feedbackService.addEntry(name, email, title, message)
    request.session.feedback = {
      message : 'Thank you for your feedback!',
    }

   return response.redirect('/feedback');

 } catch (e) { return next(err)}


});
  router.post('/api', validations, async (request, response, next) => {
   try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.json({errors:errors.array()})
      }
      const {name, email, title, message} = request.body;
      await feedbackService.addEntry(name, email, title, message)
      const feedback = await feedbackService.getList();
      return response.json({feedback});
   } catch (err) {
     return next(err)
   }
  });
 return router;
}
