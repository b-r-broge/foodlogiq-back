const express = require('express');
const router = express.Router();

// Import Mongoose Models

const Applicant = require('../models/Applicant');

// Create a new response

// Expect content to come in JSON format,
// {
// "name": "<<applicant name>>",
// "coolProb": "<<answer to the coolest problem that you've worked on>>",
// "designDesc": "<<answer to the design ideas that went into solving that problem>>",
// "dreamEnv": "<<answer to what your dream environment looks like>>",
// }

router.post('/answer', function (req, res) {
  let newAnswer = new Applicant({
    name: req.body.name,
    coolProb: req.body.coolProb,
    designDesc: req.body.designDesc,
    dreamEnv: req.body.dreamEnv
  })
  newAnswer.save()
  .then(function(data) {
    return res.status(200).json({
      "success": true,
      "new": data.name
    })
  })
  .catch(function(err) {
    console.log('ERROR adding new response', err);
    res.json({
      "success": false,
      "error": err
    })
  })
})


// get all responses

router.get('/response', function (req, res) {
  Applicant.find({})
  .then(function(data) {
    let out = data.map((resp) => {
      return {
        name: resp.name,
        coolProb: resp.coolProb,
        designDesc: resp.designDesc,
        dreamEnv: resp.dreamEnv
      }
    })
    return res.json({
      "success": true,
      "responses": out
    })
  })
  .catch(function(err) {
    console.log('ERROR finding responses', err);
    res.json({
      "success": false,
      "error": err
    })
  })
})

module.exports = router;
