const express = require('express');
const router = express.Router();


//Here this is next for app.use in server.js file

module.exports = (params)=> {
  //params are coming from app.use
  let feedbackService = params.feedbackService;
router.get('/', async (request, response) =>{
   const feedback = await feedbackService.getList();
  return response.send(feedback)
});

router.post('/', (request, response) =>{
  return response.send(`feedback form posted`)
});

 return router;
}
