module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      username: String,
      firstName: String,
      lastName: String,
      phone: String,
      email: String,
      gender: String,
      password: String,
      role: String,
      status: String,
    },
    { timestamps: true },
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model("user", schema);
};
