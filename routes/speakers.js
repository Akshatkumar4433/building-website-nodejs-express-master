const express = require('express');
const router = express.Router();


//Here this is next for app.use in server.js file

module.exports = ()=> {
router.get('/', (request, response) =>{
  return response.send('Speakers list')
});

router.get('/:shortname', (request, response) =>{
  return response.send(`Detail page of ${request.params.shortname}`)
});

 return router;
}
