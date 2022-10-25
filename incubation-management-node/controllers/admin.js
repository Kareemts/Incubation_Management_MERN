const scheema = require('../dbScheema/userScheema.js');
const adminScheema = require('../dbScheema/adminScheema.js');

module.exports = {
  /**
   * for getting new application detail
   * @returns new application details
   */
  newApplicationList: () => {
    return new Promise((resolve, reject) => {
      scheema.application_data
        .find({ viewApplication: false })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          console.log(err);
          resolve(err);
        });
    });
  },
  /**
   *
   * @param {application list id} objId
   * @returns application list to matched id
   */
  viewaMore: (objId) => {
    return new Promise((resolve, reject) => {
      scheema.application_data
        .findOne({ _id: objId.id })
        .then((result) => {
          resolve(result);
          scheema.application_data
            .updateOne({ _id: objId.id }, { viewApplication: true })
            .then((result) => {})
            .catch((err) => {});
        })
        .catch((err) => {
          resolve(err);
        });
    });
  },

  /**
   *
   * @returns pendig appliction lists
   */
  pedingApplications: () => {
    return new Promise((resolve, reject) => {
      scheema.application_data
        .find({
          $nor: [
            { applicationStatus: 'Approved' },
            { applicationStatus: 'Decline' },
            { applicationStatus: 'Slote Allotted' },
            { viewApplication: false },
          ],
        })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          console.log(err);
          resolve(err);
        });
    });
  },

  /**
   *
   * @param {application document id} id
   * @returns pendig application list
   */

  approveApplication: (id) => {
    return new Promise((resolve, reject) => {
      scheema.application_data
        .updateOne({ _id: id }, { applicationStatus: 'Approved' })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {});
    });
  },

  /**
   *
   * @param {application document id} id
   * @returns pendig application list
   */

  declineApplication: (id) => {
    return new Promise((resolve, reject) => {
      scheema.application_data
        .updateOne({ _id: id }, { applicationStatus: 'Decline' })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {});
    });
  },

  /**
   *
   * @param {slote details} data
   * @returns result
   */

  addSlotes: (data) => {
    let qty = parseInt(data.quantity);
    return new Promise((resolve, reject) => {
      for (i = 1; i <= qty; i++) {
        sloteData = {
          sloteNumber: i,
          block: data.SloteName,
          company: '',
          available: true,
        };
        adminScheema
          .slot_data(sloteData)
          .save()
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            resolve(err);
          });
      }
    });
  },

  /**
   *
   * @returns booking slote  details
   */

  bookSlotes: () => {
    return new Promise((resolve, reject) => {
      adminScheema.slot_data
        .find()
        .then((result) => {
          resolve(result.sort());
        })
        .catch((err) => {
          resolve(err);
        });
    });
  },

  /**
   *
   * @returns application approved compnies details
   */

  approvedCompanies: () => {
    return new Promise((resolve, reject) => {
      scheema.application_data
        .find({ applicationStatus: 'Approved' })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          resolve(err);
        });
    });
  },

  /**
   *
   * @param {application id,slote data} data
   * @returns company details
   */

  selectSlot: (data) => {
    return new Promise((resolve, reject) => {
      scheema.application_data
        .findOne({
          _id: data.companyId,
        })
        .then((result) => {
          adminScheema.slot_data
            .updateOne(
              { _id: data.slotData._id },
              { company: result.companyName, available: false }
            )
            .then((result) => {
              scheema.application_data
                .updateOne(
                  { _id: data.companyId },
                  { applicationStatus: 'Slote Allotted' }
                )
                .then((result) => {
                  resolve(result);
                })
                .catch((err) => {});
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  },

  /**
   *
   * @returns application details
   */

  recordTeacking: () => {
    return new Promise((resolve, reject) => {
      scheema.application_data
        .find()
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          resolve(err);
        });
    });
  },
};
