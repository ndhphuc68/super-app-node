module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      title: String,
      content: String,
      type: String,
    },
    { timestamps: true },
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model("nef", schema);
};
