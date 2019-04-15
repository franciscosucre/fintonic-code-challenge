const { model, Schema } = require("mongoose");

var UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      bcrypt: true,
      hideJSON: true
    }
  },
  { timestamps: true }
);

UserSchema.plugin(require("mongoose-bcrypt"));
UserSchema.plugin(require("mongoose-hidden")());

module.exports = model("User", UserSchema);
