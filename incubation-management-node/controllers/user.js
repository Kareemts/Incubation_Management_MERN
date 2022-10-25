const scheema = require('../dbScheema/userScheema.js');
var bcrypt = require('bcrypt');

module.exports = {
  /**
   * user signup fuction
   *
   * @param {user signup data} data
   * @returns signup success
   */

  userRegistration: (data) => {
    return new Promise(async (resolve, reject) => {
      let userExi = await scheema.user_data.findOne({
        $or: [{ email: data.email }, { phone: data.phone }],
      });
      if (userExi) {
        console.log('User Exist');
        resolve({ userExi: true });
      } else {
        data.password = await bcrypt.hash(data.password, 10);
        scheema.user_data(data).save();
        console.log('user added');
        resolve({ userAdded: true });
      }
    });
  },
  /**
   * user login function
   *
   * @param {user login data} data
   * @returns userLogin true or fales
   */
  userLogin: (data) => {
    return new Promise(async (resolve, reject) => {
      let user = await scheema.user_data.findOne({ email: data.email });
      console.log('user', user);
      if (user) {
        bcrypt
          .compare(data.password, user.password)
          .then((result) => {
            if (result) {
              resolve({ userLogin: true, userDetails: user });
            } else {
              resolve({ userLogin: false });
              console.log('invalid password');
            }
          })
          .catch((err) => {
            console.log('err', err);
            resolve(err);
          });
      } else {
        resolve({ userLogin: false });
        console.log(' invalid  userName or password ');
      }
    });
  },

  /**
   * 
   * @param {form data} data 
   * @returns 
   */

  formSubmission: (data) => {
    data.viewApplication=false
    data.applicationStatus='Progressing'
    return new Promise((resolve, reject) => {
      scheema
        .application_data(data)
        .save()
        .then((result) => {
          resolve(result);
          console.log('result', result);
          reject(result);
        })
        .catch((err) => {
          console.log(err);
          resolve(err);
        });
    });
  },
};
