const express = require('express');

const speakerRoute = require('./speakers');
const feedbackRoute = require('./feedback');

const router = express.Router();

module.exports = (params) => {
  const { speakersService } = params;
  // Route & Middleware
  router.get('/', async (req, res, next) => {
    try {
      const artwork = await speakersService.getAllArtwork();
      const topSpeakers = await speakersService.getList();

      //  Session Middleware
      // if (!req.session.visitcount) {
      //   req.session.visitcount = 0;
      // }
      // req.session.visitcount += 1;
      // console.log(`Number of visits: ${req.session.visitcount}`);
      return res.render('layout', {
        pageTitle: 'Welcome',
        template: 'index',
        topSpeakers,
        artwork,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.use('/speakers', speakerRoute(params));
  router.use('/feedback', feedbackRoute(params));
  return router;
};
