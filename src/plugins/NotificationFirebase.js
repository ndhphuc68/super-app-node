var admin = require("firebase-admin");
var { getMessaging } = require("firebase-admin/messaging");

var serviceAccount = require("./serverfirebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.sendNotification = async (token, data) => {
  const message = {
    notification: {
      title: "Notif",
      body: "ALo bố m tới chơi",
    },
    data: {
      message: "Message",
    },
    token: token,
  };
  getMessaging()
    .send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
};
