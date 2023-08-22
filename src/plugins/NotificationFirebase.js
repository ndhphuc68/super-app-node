var admin = require("firebase-admin");
var { getMessaging } = require("firebase-admin/messaging");

var serviceAccount = require("./serverfirebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.sendNotification = async () => {
  const message = {
    notification: {
      title: "Notif",
      body: "ALo bố m tới chơi",
    },
    data: {
      message: "Message",
    },
    token:
      "de2EwCAlRb2n3Orvlf6EmZ:APA91bFO4AF6k8MDetgS6cu-ONkRftQz6z_AKjPPwzP0R8nvWL8fwoImgDvBsT6ZtiI9JWkz_ZIRilM08xcSsRGvJpK1gIa5cfWxXaNFrCmxKdCKlEoVsoVOS8TItv7Rj7JGdJD5JrCJ",
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
