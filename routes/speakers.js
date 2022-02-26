const express = require('express');
const router = express.Router();


//Here this is next for app.use in server.js file

module.exports = (params)=> {

const speakersService = params.speakersService;

router.get('/', async (request, response,next) =>{
  try {
  const speakers = await speakersService.getList();
  response.render('layout', {pageTitle: 'Speakers', template:'speakers',speakers})
  }
  catch(error) {
  }
  return next(error);
});



router.get('/:shortname', async (request, response,next) => {
  try {
  const speaker = await speakersService.getSpeaker(request.params.shortname)
  const speakerArtWork = await speakersService.getArtworkForSpeaker(request.params.shortname)
  response.render('layout', {pageTitle: 'Speakers', template:'speakers-details',speaker,speakerArtWork})
  }
  catch(error) {
    return next(error)
  }
});

 return router;
};
