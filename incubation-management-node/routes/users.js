var express = require('express');
var router = express.Router();
const cors = require('cors');
let user = require('../controllers/user.js');
const session = require('express-session');
const jwt = require('jsonwebtoken');

/* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.send('api testing');
// });

/**
 * user authentication
 */

const userAuth = (req, res, next) => {
  const token = req.body.data['x-access-token'];
  if (!token) {
    res.json({ authentication: false });
  } else {
    jwt.verify(token, 'jwtSecret', (err, decoded) => {
      if (err) {
        console.log('-----------------------------------');
        res.json({ authentication: false, message: 'Authentication failed' });
      } else {
        req.userId = decoded.id;
        console.log('successs');
        next();
      }
    });
  }
};

/**
 * user signup router
 */

router.post('/signup', async (req, res) => {
  user
    .userRegistration(req.body.inputs)
    .then((result) => {
      
      console.log('result', result);
      if (result.userAdded) {
        res.send(result);
      } else {
        res.send(result);
      }
    })
    .catch((err) => {
      console.log('err', err);
    });
});

/**
 * user login router
 */

router.post('/login', (req, res) => {
  user
    .userLogin(req.body.inputs)
    .then((result) => {
      console.log('result', result.userLogin);
      if (result.userLogin) {
        //login success
        console.log(result);
        const id = result._id;
        const token = jwt.sign({ id }, 'jwtSecret', {
          expiresIn: 60000,
        });
        console.log(result.userDetails);
        res.json({ userLogin: true, token: token, result: result.userDetails });
      } else {
        //login fialed
        res.send(result);
      }
    })
    .catch((err) => {
      console.log('err', err);
    });
});

/**
 * form submission
 */

router.post('/applicationFrom', userAuth, (req, res) => {
  console.log('++++++++++++++++++++++++++++++++++++');
  user
    .formSubmission(req.body.data.inputs)
    .then((result) => {
      res.json({ result: result, authentication: true });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
