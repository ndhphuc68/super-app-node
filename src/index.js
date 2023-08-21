// importing the dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
// defining the Express app
const app = express();

app.use(fileUpload());
// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// enabling CORS for all requests
app.use(cors());

app.get("/image/:image", (req, res) => {
  const imagePath = `/upload/${req.params.image}`;
  res.sendFile(__dirname + imagePath);
});

// adding morgan to log HTTP requests
app.use(morgan("combined"));

const db = require("./model");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

require("./routers")(app);

// starting the server
app.listen(3001, () => {
  console.log("listening on port 3001");
});
