const db = require("../model");
const Nef = db.nef;
const nefService = require("../services/NEF.service");
const { status } = require("../const/status");
const { returnRes } = require("../utils");

exports.createNef = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    const data = new Nef({
      title: req.body.title,
      content: req.body.content,
      type: req.body.type,
    });

    const value = await nefService.createNef(data);
    if (value) {
      returnRes(res, "success", true, value);
    } else {
      returnRes(res, "false", false, null);
    }
  } catch (e) {
    returnRes(res, "false", false, null);
  }
};

exports.getListNef = async (req, res) => {
  const nef = await nefService.getListNef();
  if (nef) {
    res.status(200).send({ success: true, data: nef, message: "Success!" });
  } else {
    nef.status(200).send({ success: false, data: [], message: "Success!" });
  }
};
