const express = require('express');
const Contact = require('../controllers/Contact');
const ContactMessages = require('../controllers/Contact').contactMessages;
const Message = require('../controllers/Message');

const router = express.Router();

router.all('/contacts/:id?', Contact);
router.all('/contacts/:id?/messages?', Contact);
router.all('/messages/:id?/', Message);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ message: 'Welcome to the SMS API' });
});

module.exports = router;
