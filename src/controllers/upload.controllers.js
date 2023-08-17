exports.uploadFile = (req, res) => {
  try {
    if (!req.files) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    const { files } = req.files;
    if (!files) return res.sendStatus(400);
    files.name = `${req.query.username}.${files.mimetype.split("/")[1]}`;

    files.mv("src/upload/" + files.name);
    res
      .status(200)
      .send({ success: true, data: files.name, message: "Success!" });
  } catch (error) {
    res.status(500).send({
      message: "ERRR1111",
      success: false,
    });
  }
};
