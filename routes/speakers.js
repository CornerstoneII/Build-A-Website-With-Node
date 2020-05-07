const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { speakersService } = params;
  // Route & Middleware
  router.get('/', async (req, res, next) => {
    try {
      const speakers = await speakersService.getList();
      const artwork = await speakersService.getAllArtwork();
      //  Session Middleware
      // if (!req.session.visitcount) {
      //   req.session.visitcount = 0;
      // }
      // req.session.visitcount += 1;
      // console.log(`Number of visits: ${req.session.visitcount}`);
      return res.render('layout', {
        pageTitle: 'Speakers',
        template: 'speakers',
        speakers,
        artwork,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.get('/:shortname', async (req, res, next) => {
    try {
      const speaker = await speakersService.getSpeaker(req.params.shortname);
      const artwork = await speakersService.getArtworkForSpeaker(req.params.shortname);
      // console.log(speaker);
      // return res.send(`Detailed page of ${req.params.shortname}`);
      return res.render('layout', {
        pageTitle: 'Speakers',
        template: 'speakers-detail',
        speaker,
        artwork,
      });
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
