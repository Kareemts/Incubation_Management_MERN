var express = require('express');
const admin = require('../controllers/admin.js');
var router = express.Router();
let adminControllers = require('../controllers/admin.js');

/**
 * admin login
 */
let email = 'admin@gmail.com';
let password = '123';

router.post('/adminlogin', function (req, res, next) {
  if (req.body.inputs.email == email && req.body.inputs.password == password) {
    res.send({ logedin: true });
    console.log('success');
  } else {
    res.send({ logedin: false });
  }
});

/**
 * admin dasbord router for new application
 */

router.get('/dashbord', (req, res) => {
  adminControllers
    .newApplicationList()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

/**
 * router for new application list
 */
router.get('/viewMore', (req, res) => {
  adminControllers
    .viewaMore(req.query)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});
/**
 * router for pending applicatin list
 */
router.get('/pedingApplications', (req, res) => {
  adminControllers
    .pedingApplications()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

/**
 * router for approve applicatin
 */
router.get('/approveApplications', (req, res) => {
  adminControllers
    .approveApplication(req.query.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

/**
 * router for decline applicatin
 */
router.get('/declineApplications', (req, res) => {
  adminControllers
    .declineApplication(req.query.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

/**
 * router for sltote adding
 */

router.post('/addSlotes', (req, res) => {
  adminControllers
    .addSlotes(req.body.inputs)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

/**
 * router for sltote adding
 */

router.get('/bookSlotes', async (req, res) => {
  let slots = await adminControllers.bookSlotes();
  let approvedCompanies = await adminControllers.approvedCompanies();
  res.json({ slots, approvedCompanies });
});

/**
 * router for select a sltote
 */

router.post('/selectSlot', (req, res) => {
  adminControllers
    .selectSlot(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

/**
 * router for application tracking
 */

router.get('/recordTeacking', (req, res) => {
  adminControllers
    .recordTeacking()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
