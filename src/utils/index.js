exports.returnRes = (res, message, status, data) => {
  return res.status(200).send({
    message: message,
    success: status,
    data: data,
  });
};
