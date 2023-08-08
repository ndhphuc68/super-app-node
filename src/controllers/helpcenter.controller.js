const db = require("../model");
const { returnRes } = require("../utils");
const HelpCenter = db.helpCenter;

exports.createHelpCenter = async (req, res) => {
  try {
    if (!req.params.id) {
      res
        .status(400)
        .send({ success: false, message: "Content can not be empty!" });
    }

    let helpCenter = new HelpCenter({
      username: String,
      question: String,
      status: String,
      answer: String,
      respondent: String,
    });
  } catch (e) {
    returnRes(res, "false", false, null);
  }
};
