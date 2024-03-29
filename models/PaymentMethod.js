const { model, Schema } = require("mongoose");
const PaymentMethodSchema = new Schema(
  {
    bankAccountNum: {
      type: String,
      unique: true,
      required: true,
    },
    bankRouting: {
      type: String,
      required: true,
    },
    bankType: {
      type: String,
      required: true,
    },
    bankType: {
        type: String,
        required: true,
      },
  },
  {
    timestamps: true,
  }
);
module.exports = model("PaymentMethod", userSchema);
