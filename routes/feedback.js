const express = require('express');
const router = express.Router();


//Here this is next for app.use in server.js file

module.exports = ()=> {
router.get('/', (request, response) =>{
  return response.send('feedback page')
});

router.post('/', (request, response) =>{
  return response.send(`feedback form posted`)
});

 return router;
}
