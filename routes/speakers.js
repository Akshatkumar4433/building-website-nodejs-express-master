const express = require('express');
const router = express.Router();


//Here this is next for app.use in server.js file

module.exports = (params)=> {

const speakersService = params.speakersService;

router.get('/', async (request, response) =>{
  const speakers = await speakersService.getList();
  return response.json(speakers)
});

router.get('/:shortname', (request, response) =>{
  return response.send(`Detail page of ${request.params.shortname}`)
});

 return router;
}
