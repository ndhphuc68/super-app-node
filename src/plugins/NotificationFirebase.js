var admin = require("firebase-admin");
var fcm = require("fcm-notification");
var serviceAccount = require("../supper-app-ca076-firebase-adminsdk-g2xt7-373b374d7f.json");

const certPath = admin.credential.cert(serviceAccount);
var FCM = new fcm(certPath);

exports.sendPushNotification = (fcm_token, title, body) => {
  try {
    let message = {
      android: {
        notification: {
          title: title,
          body: body,
        },
      },
      token:
        "dJ8Ug2OvTcO-P4QOAO2u3V:APA91bEJ98dMUL0eknq1koQSA3RRBUd7-wdoFSIF6ln_mNMVFBfWtLwIDlIhKr423NEFMVC6HzPWpqp9E0kke1C2F6ckZ0MAOBmH1vWn2JDCbOgfTBoDS1vC3GvOnuZZ6Ktq6uCYJjwT",
    };

    FCM.send(message, function (err, resp) {
      if (err) {
        throw err;
      } else {
        console.log("Successfully sent notification");
      }
    });
  } catch (err) {
    throw err;
  }
};
